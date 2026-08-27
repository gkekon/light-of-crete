# Light of Crete Project Log

This file is a working log of local project changes and decisions. It is not a deployment record.

## Project history

- Created the Light of Crete Vite + React + Tailwind landing page for private photoshoots in Crete.
- Separated the main website content into data/config structures so it can later be replaced by a CMS such as Sanity.
- Built the homepage sections for hero, intro, photoshoot categories, photo + video, locations, gallery, packages, about, contact form, footer, and floating WhatsApp CTA.
- Optimized and selected local image assets for hero, cards, gallery, category cards, and the about/profile area.
- Refined the header into a minimal premium glass-style brand navigation without a camera icon.
- Created and iterated on the Light of Crete logo treatment, keeping the approved typography and later testing a more refined sun mark.
- Updated category labels and imagery, including Solo Traveler Photoshoots, Couple Photoshoots, Family Photoshoots, and Groups & Experiences.
- Updated the about text and profile image for Konstantinos.
- Prepared the booking/contact form for Netlify Forms and tested that form submissions work.
- Added mobile refinements, including more compact expandable content areas where needed.
- Prepared SEO/GEO metadata for the production domain `https://lightofcrete.com/`.
- Created guidance documents for Google Business Profile and Instagram setup, plus local PDF/export support when requested.
- Established a working rule that no online deploy, push, or Netlify/GitHub changes happen unless Konstantinos explicitly asks.

## 2026-07-14

- Added a local Google reviews trust section directly before the booking/contact form.
- Implemented the reviews content as separated data in `src/data/siteContent.js`.
- Used a static fallback structure because no Google Places API or Google Business Profile API credentials are available in the project.
- Intentionally did not fabricate fake reviews. The section is ready to display only verified `rating === 5` reviews once real Google review text is added or a server-side endpoint is connected.
- Added accessible carousel controls with previous/next buttons, `aria-live`, star labels, and pause behavior on hover/focus.
- Added `PROJECT_LOG.md` and `MEMORY.md` as local working documentation.

## 2026-07-15

- Added four manually provided real 5-star Google reviews to the local reviews data array.
- Kept each review marked with `rating: 5` so the homepage carousel continues to display only 5-star Google Business Profile reviews.
- Preserved the reviewer profile URLs in the data for future source/reference use.
- Refined the reviews carousel cards to be more compact, with smaller typography, balanced card spacing, and a Read more / Show less control for long reviews.

## 2026-07-16

- Started preparing a second gallery page at `/gallery`.
- Chose the public page title `Pictures from Photoshoots in Crete` and kept the simple URL/name `Gallery`.
- Added a `See more pictures` CTA under the homepage masonry gallery.
- Added `galleryPageContent` in `src/data/siteContent.js` so the page can later be expanded or connected to a CMS.
- Built the gallery page as a cinematic hero plus premium masonry grid using existing optimized local images.

## 2026-07-18

- Added the Beatrice Cristian 5-star Google review to the local reviews array.
- Kept the review text premium and clean by not displaying the separate Google note/tag `Εξαιρετική τιμή`.

## 2026-08-27

- Fixed a conversion-tracking regression: commit `335e456` (Add Google reviews carousel, 16 Jul) rewrote `src/App.jsx` and removed every `trackLead` / `trackContactClick` call, leaving `src/utils/tracking.js` orphaned and tree-shaken out of the bundle. The live site had fired no GA4 custom events since the 18 Jul deploy.
- Consequence: `whatsapp_click` and `contact_form_submit` — both imported into Google Ads as primary conversions — recorded 0 for 30 days, so Smart Bidding starved the Search campaign (~EUR 3/day of a EUR 10 budget, 52% impression share lost to rank).
- Re-wired tracking as a single delegated click listener (`initLinkTracking` in `src/utils/tracking.js`, called from `src/main.jsx`) so a future `App.jsx` refactor cannot silently remove it again.
- Added the GA4 tag to `public/success.html` and fire `contact_form_submit` + `generate_lead` there, since the Netlify form redirects to that page only on success.
- Verified in GA4 Realtime that `whatsapp_click` and `contact_form_submit` register as key events again.

## Notes

- Do not deploy, push, or change Netlify/GitHub settings unless Konstantinos explicitly asks.
- Do not expose Google API keys in frontend code.
- Future live review integration should use a server-side endpoint/function that fetches reviews, filters `rating === 5`, and returns only the safe display fields.
