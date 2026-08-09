import sharp from 'sharp';
sharp('public/images/hero-fondo.jpg.webp').metadata().then(console.log);
