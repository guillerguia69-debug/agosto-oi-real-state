const fs = require('fs');

// Update CSS
let css = fs.readFileSync('css/style.css', 'utf-8');
css = css.replace(
  '  text-transform: uppercase;\n  letter-spacing: 0.1em;\n',
  '  letter-spacing: normal;\n'
);
// Make font a bit bigger if uppercase is removed, optional but good for readability
css = css.replace(
  '.desktop-nav {\n  display: none;\n  gap: 2rem;\n  font-weight: 600;\n  font-size: 0.75rem;',
  '.desktop-nav {\n  display: none;\n  gap: 2rem;\n  font-weight: 600;\n  font-size: 0.9rem;'
);
fs.writeFileSync('css/style.css', css);

// Update HTML
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(
  'Cartera de propiedades, tecnología propia y acompañamiento real desde el primer día. Un modelo que funciona desde 2008, pensado para quienes quieren dedicarse a tiempo completo a construir su propio negocio.',
  'Cartera de propiedades, tecnología propia y acompañamiento real desde el primer día — incluyendo más de 800 propietarios nuevos cada mes. Un modelo que funciona desde 2008, pensado para quienes quieren dedicarse a tiempo completo a construir su propio negocio.'
);
fs.writeFileSync('index.html', html);
