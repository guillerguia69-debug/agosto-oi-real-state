import sharp from 'sharp';
async function test() {
  console.log(await sharp('public/images/hero-fondo.webp').metadata());
}
test();
