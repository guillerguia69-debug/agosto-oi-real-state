import sharp from 'sharp';

async function compressHero() {
  await sharp('public/images/hero-fondo.webp')
    .resize({ width: 800 })
    .webp({ quality: 40, effort: 6 })
    .toFile('public/images/hero-fondo-mobile.webp');
  console.log("Done");
}

compressHero();
