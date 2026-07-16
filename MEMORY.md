# Light of Crete Memory

## Brand

- Brand name: Light of Crete
- Subtitle: Photoshoots in Crete
- Website: https://lightofcrete.com
- Email: lightofcrete@gmail.com
- WhatsApp: +30 697 651 9440
- Tone: premium, natural, artistic, cinematic, warm, trustworthy, Mediterranean, elegant

## Site Direction

- Keep the existing design unchanged unless Konstantinos explicitly approves the change.
- Warm off-white, charcoal, muted gold, soft sand, and deep olive remain the core palette.
- The site should feel premium, minimal, rounded, Apple-like, artistic, and Mediterranean.
- Content should stay separated in data/config files where possible to support a future CMS such as Sanity.
- Current design direction includes rounded image cards, soft spacing, elegant glass header, cinematic hero imagery, warm Mediterranean light, and minimal premium typography.

## Current Site Structure

- The site is a Vite + React + Tailwind project.
- Main page composition lives in `src/App.jsx`.
- Core editable content lives in `src/data/siteContent.js`.
- Global styling lives mostly in `src/styles.css`.
- Production domain metadata should point to `https://lightofcrete.com/`.
- Contact form submissions are prepared for Netlify Forms.
- WhatsApp contact uses `+30 697 651 9440`.
- Business email is `lightofcrete@gmail.com`.

## Workflow Rules

- Never deploy, push, connect Netlify, or change online settings unless explicitly requested.
- Prefer local-only previews and local files first.
- Ask before visible design/layout changes.
- Avoid fake reviews, fake business claims, fake addresses, or misleading Google/SEO content.
- Do not add fake Google reviews. Use only real client reviews from the verified Google Business Profile.
- Keep API keys and private credentials out of frontend code.

## Current Google Reviews Setup

- Reviews section is placed above the booking/contact form.
- Data lives in `src/data/siteContent.js` under `googleReviewsSection`.
- Current review array includes four manually provided real 5-star Google reviews.
- Review cards should stay compact. Long reviews use Read more / Show less instead of stretching the whole section.
- Later integration should happen through a safe server-side/API function, not by placing API keys in frontend code.

## Approved/Important Content

- Brand: Light of Crete
- Subtitle: Photoshoots in Crete
- Main offer: Private photoshoots and cinematic photo/video experiences in Crete
- Audiences: tourists, couples, families, solo travelers, maternity clients, groups, proposals, honeymoons, boat trips, villa parties, private experiences
- Primary domain: https://lightofcrete.com/
- Social direction: premium, natural, elegant, cinematic, warm, trustworthy, Mediterranean
