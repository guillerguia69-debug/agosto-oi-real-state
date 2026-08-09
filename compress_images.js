import sharp from 'sharp';

async function compressAll() {
  await sharp('public/images/logosin fondo.webp')
    .resize(256)
    .webp({ quality: 80 })
    .toFile('public/images/logo-opt.webp');

  await sharp('public/images/calendario-Nexo-CRM (1).webp')
    .resize(800)
    .webp({ quality: 60 })
    .toFile('public/images/calendario-opt.webp');

  await sharp('public/images/Propiedades- (1).webp')
    .resize(800)
    .webp({ quality: 60 })
    .toFile('public/images/propiedades-opt.webp');

  await sharp('public/images/interfaz-Nexo-CRM (1).webp')
    .resize(800)
    .webp({ quality: 60 })
    .toFile('public/images/interfaz-opt.webp');
    
  console.log("Done compression");
}

compressAll();
