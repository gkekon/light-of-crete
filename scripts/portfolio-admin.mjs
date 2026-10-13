// Portfolio admin.  npm run portfolio  →  http://127.0.0.1:4600
//
// Local-only tool for the /gallery page: add photos, drag them into order,
// pick the layout style and the cover image, preview, publish.
// Everything is stored in src/data/portfolio.json; photos are converted to
// WebP into public/images/portfolio. Nothing here is deployed with the site.

import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import sharp from 'sharp';
import { createServer as createViteServer } from 'vite';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, 'src/data/portfolio.json');
const PUBLIC = path.join(ROOT, 'public');
const PHOTOS = path.join(PUBLIC, 'images/portfolio');
const PAGE = path.join(import.meta.dirname, 'portfolio-admin.html');

const PORT = 4600;
const PREVIEW_PORT = 4601;
const STYLES = ['editorial', 'masonry', 'justified'];
const PHOTO_WIDTH = 1600;
const PHOTO_QUALITY = 82;
// The site proxies /clients to this project. Pushing the site before that
// project answers under /clients would break every client gallery link.
const CLIENT_GALLERY_CHECK = 'https://light-of-crete-gallery-demo.netlify.app/clients/';

const sendJson = (res, body, status = 200) => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function run(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd: ROOT });
    let out = '';
    child.stdout.on('data', (data) => (out += data));
    child.stderr.on('data', (data) => (out += data));
    child.on('error', (error) => resolve({ code: 1, out: String(error.message) }));
    child.on('close', (code) => resolve({ code, out: out.trim() }));
  });
}

const readPortfolio = async () => JSON.parse(await fs.readFile(DATA, 'utf8'));

function cleanPortfolio(input) {
  const items = (Array.isArray(input.items) ? input.items : []).map((item) => ({
    id: String(item.id),
    src: String(item.src),
    alt: String(item.alt || '').trim() || 'A photoshoot moment in Crete by Light of Crete.',
    label: String(item.label || '').trim(),
    width: Number(item.width) || 0,
    height: Number(item.height) || 0,
    large: Boolean(item.large),
  }));
  if (new Set(items.map((item) => item.id)).size !== items.length) {
    throw new Error('Δύο φωτογραφίες έχουν το ίδιο id.');
  }
  if (items.some((item) => !item.src.startsWith('/images/'))) {
    throw new Error('Μη έγκυρη διαδρομή φωτογραφίας.');
  }
  const heroImage = items.some((item) => item.src === input.heroImage)
    ? input.heroImage
    : items[0]?.src || '';
  return {
    style: STYLES.includes(input.style) ? input.style : 'editorial',
    heroImage,
    items,
  };
}

function slugFor(name) {
  const stem =
    path
      .parse(name)
      .name.normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'photo';
  return `${stem}-${randomBytes(3).toString('hex')}`;
}

async function gitState() {
  const status = await run('git', ['status', '--porcelain', '--', 'src/data/portfolio.json', 'public/images/portfolio']);
  const ahead = await run('git', ['rev-list', '--count', '@{u}..HEAD']);
  return {
    unsaved: status.out ? status.out.split('\n').length : 0,
    unpushedCommits: Number(ahead.out) || 0,
  };
}

const routes = {
  'GET /api/portfolio': async () => ({ portfolio: await readPortfolio(), styles: STYLES, git: await gitState() }),

  'PUT /api/portfolio': async (req) => {
    const portfolio = cleanPortfolio(JSON.parse((await readBody(req)).toString('utf8')));
    await fs.writeFile(DATA, `${JSON.stringify(portfolio, null, 2)}\n`);
    return { portfolio, git: await gitState() };
  },

  // One photo per request, raw bytes in the body.
  'POST /api/upload': async (req, url) => {
    const name = url.searchParams.get('name') || 'photo.jpg';
    const body = await readBody(req);
    if (!body.length) throw new Error('Άδειο αρχείο.');

    await fs.mkdir(PHOTOS, { recursive: true });
    const id = slugFor(name);
    const info = await sharp(body)
      .rotate()
      .resize({ width: PHOTO_WIDTH, height: PHOTO_WIDTH, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: PHOTO_QUALITY, effort: 5 })
      .toFile(path.join(PHOTOS, `${id}.webp`));

    return {
      item: {
        id,
        src: `/images/portfolio/${id}.webp`,
        alt: '',
        label: '',
        width: info.width,
        height: info.height,
        large: false,
      },
    };
  },

  'POST /api/publish': async () => {
    const check = await fetch(CLIENT_GALLERY_CHECK).catch(() => null);
    if (!check?.ok) {
      throw new Error(
        'Το client gallery δεν απαντά ακόμη στο /clients. Κάνε πρώτα deploy εκείνο το project — αλλιώς το push θα έσπαγε τα links των πελατών.'
      );
    }

    await run('git', ['add', '--', 'src/data/portfolio.json', 'public/images/portfolio']);
    const staged = await run('git', ['diff', '--cached', '--quiet']);
    if (staged.code !== 0) {
      const commit = await run('git', ['commit', '-m', 'Update portfolio']);
      if (commit.code !== 0) throw new Error(commit.out);
    }

    const push = await run('git', ['push']);
    if (push.code !== 0) throw new Error(push.out);
    return { ok: true, git: await gitState() };
  },
};

// A foreign site open in the browser must not be able to edit or publish.
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return req.method === 'GET';
  return origin === `http://127.0.0.1:${PORT}` || origin === `http://localhost:${PORT}`;
}

const vite = await createViteServer({
  root: ROOT,
  server: { port: PREVIEW_PORT, strictPort: true, host: '127.0.0.1' },
  logLevel: 'warn',
});
await vite.listen();

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
  try {
    if (url.pathname.startsWith('/api/')) {
      const route = routes[`${req.method} ${url.pathname}`];
      if (!route) return sendJson(res, { error: 'Not found' }, 404);
      if (!sameOrigin(req)) return sendJson(res, { error: 'Forbidden' }, 403);
      try {
        return sendJson(res, await route(req, url));
      } catch (error) {
        return sendJson(res, { error: String(error.message || error) }, 400);
      }
    }

    if (url.pathname.startsWith('/images/')) {
      const file = path.join(PUBLIC, path.normalize(decodeURIComponent(url.pathname)));
      if (!file.startsWith(PUBLIC)) throw new Error('Forbidden');
      res.writeHead(200, { 'Content-Type': 'image/webp', 'Cache-Control': 'max-age=3600' });
      return res.end(await fs.readFile(file));
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end((await fs.readFile(PAGE, 'utf8')).replace('__PREVIEW_PORT__', String(PREVIEW_PORT)));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Portfolio admin: http://127.0.0.1:${PORT}\n`);
  if (!process.env.NO_OPEN) spawn('open', [`http://127.0.0.1:${PORT}`], { detached: true }).unref();
});
