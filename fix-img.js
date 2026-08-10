import fs from 'fs';
const files = [
  'calendario-Nexo-CRM (1).webp',
  'interfaz-Nexo-CRM (1).webp',
  'Propiedades- (1).webp'
];

for (const file of files) {
  let buf = fs.readFileSync('public/images/' + file);
  console.log(`File ${file} size: ${buf.length}`);
  console.log(`File ${file} hex: ${buf.slice(0, 16).toString('hex')}`);
}
