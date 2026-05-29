# Light of Crete

Production-ready Vite + React + Tailwind landing page for private photoshoots in Crete.

## Install

```bash
npm install
```

If your local npm cache has permissions issues, use:

```bash
npm install --cache .npm-cache
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Netlify Deployment Notes

- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml` is already included.
- The contact form is prepared for Netlify Forms with the form name `photoshoot-request`.
- After the first Netlify deploy, enable form email notifications in the Netlify dashboard and send them to `gkekon@gmail.com`.
- The current target is a temporary Netlify URL. Later, connect the custom domain `photoshoots.gkonstantinos.com` in Netlify DNS/domain settings.

## Change WhatsApp Number

Update the WhatsApp values in:

```text
src/config/site.js
```

The current number is `306976519440`.

## Change Page Content

Most editable landing page content is separated from the React components:

```text
src/data/siteContent.js
```

This file contains CMS-shaped objects and arrays for:

- navigation items
- hero slides
- photoshoot categories
- Photo + Video feature cards
- locations
- gallery items
- packages
- about, contact and footer copy

When connecting Sanity or another headless CMS later, replace these exports with query results or map CMS responses into the same shape.
List items include stable `id` values so they can map cleanly to CMS `_id`, `_key` or slug fields.

## Change Email / Form Settings

The static form is defined in:

```text
index.html
src/config/site.js
public/success.html
```

The React form name and success path are in `src/config/site.js`. The static hidden Netlify form in `index.html` must keep the same form name so Netlify can detect it. Netlify email routing is configured in the Netlify dashboard, not in the code.

## Replace Images

Optimized images live in:

```text
public/images
```

The image optimization script is:

```text
scripts/optimize-images.mjs
```

To replace the image set, place source images in `source-images/photoshoots pics`, update the source/destination list in `scripts/optimize-images.mjs`, then run:

```bash
npm run optimize:images
```
