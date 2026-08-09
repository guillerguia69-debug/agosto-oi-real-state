import sharp from 'sharp';
async function run() {
  console.log(await sharp('public/images/logosin fondo.webp').metadata());
  console.log(await sharp('public/images/calendario-Nexo-CRM (1).webp').metadata());
  console.log(await sharp('public/images/Propiedades- (1).webp').metadata());
  console.log(await sharp('public/images/interfaz-Nexo-CRM (1).webp').metadata());
}
run();
