import sharp from 'sharp';
sharp('public/images/hero-fondo.jpg.webp')
  .resize({ width: 1024 })
  .webp({ quality: 35, effort: 6 })
  .toFile('public/images/hero-fondo-compressed.webp')
  .then(info => {
    console.log("Compression success:", info);
  });
