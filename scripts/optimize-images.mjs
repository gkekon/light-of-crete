import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('source-images/photoshoots pics');
const outputDir = path.resolve('public/images');

const images = [
  ['micah-sammie-chaffin-3qKpnFMcNdM-unsplash.jpg', 'hero-couples.webp', 2600],
  ['8.png', 'hero-romance.webp', 2600],
  ['6.png', 'hero-families.webp', 2600],
  ['venus-major-Nf6vjOK4nRk-unsplash.jpg', 'hero-portraits.webp', 2600],
  ['7.png', 'category-family.webp', 1600],
  ['jonatas-domingos-7W5EzP8MfcE-unsplash.jpg', 'category-couple.webp', 1600],
  ['venus-major-DvJ8yeZPr5k-unsplash.jpg', 'category-solo.webp', 1600],
  ['cat.jpg', 'category-groups.webp', 1600],
  ['about-konstantinos-profile.png', 'about-konstantinos-profile.webp', 1600],
  ['1.jpg', 'gallery-family-mother.webp', 1400],
  ['2.jpg', 'gallery-editorial-redhair.webp', 1400],
  ['4.jpg', 'gallery-solo-water.webp', 1400],
  ['6.jpg', 'gallery-beach-walk.webp', 1400],
  ['7.jpg', 'gallery-event-portrait.webp', 1400],
  ['9.jpg', 'gallery-maternity-soft.webp', 1400],
  ['10.jpg', 'gallery-maternity-shadow.webp', 1400],
  ['11.jpg', 'gallery-water-portrait.webp', 1400],
  ['12.jpg', 'gallery-boudoir-light.webp', 1400],
  ['1.png', 'gallery-water-overhead.webp', 1600],
  ['danie-franco-23s0q7NCJKM-unsplash.jpg', 'gallery-couple-blackwhite.webp', 1600],
  ['9.png', 'gallery-family-water-play.webp', 1600],
  ['4.png', 'gallery-couple-sunset-walk.webp', 1600],
  ['6.png', 'gallery-family-beach-run.webp', 1600],
  ['8.jpg', 'gallery-editorial-blackwhite-dress.webp', 1400],
  ['13.png', 'gallery-swimwear-clouds.webp', 1600],
  ['16.png', 'gallery-couple-wide-shore.webp', 1600],
  ['1 αντίγραφο.png', 'gallery-couple-orange-smoke.webp', 1600],
  ['15.png', 'gallery-couple-lagoon-smile.webp', 1600],
  ['5.jpg', 'gallery-solo-hat-closeup.webp', 1400],
  ['2 αντίγραφο.png', 'gallery-couple-kiss-water.webp', 1600],
  ['14.png', 'gallery-couple-wood-bridge.webp', 1600],
  ['17.png', 'gallery-couple-garden.webp', 1600],
  ['allef-vinicius-0dXvugMScIY-unsplash.jpg', 'gallery-couple-golden-close.webp', 1400],
];

await fs.mkdir(outputDir, { recursive: true });

for (const [inputName, outputName, width] of images) {
  const inputPath = path.join(sourceDir, inputName);
  const outputPath = path.join(outputDir, outputName);
  await sharp(inputPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);
  const stat = await fs.stat(outputPath);
  console.log(`${outputName} ${(stat.size / 1024).toFixed(0)} KB`);
}
