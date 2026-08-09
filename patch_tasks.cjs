const fs = require('fs');

// Update CSS
let css = fs.readFileSync('css/style.css', 'utf-8');

// 1. Pull quotes left border
css = css.replace(
  '  padding: 1.5rem 0 1.5rem 1.5rem;\n  border-left: 2px dashed var(--accent-red);',
  '  padding: 0 0 0 1.5rem;\n  border-left: 1px solid var(--accent-red);'
);

// 2. Luis quote font style
css = css.replace(
  '.serif-quote {\n  font-family: var(--font-serif);\n  font-style: italic;',
  '.serif-quote {\n  font-family: var(--font-serif);\n  font-style: normal;'
);

// 3. Navbar button and mentalidad text
if (!css.includes('.header .btn-primary')) {
  css += `
.header .btn-primary {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}
@media (min-width: 768px) {
  .header .btn-primary {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
.mentalidad-text {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  line-height: 1.4;
  color: var(--text-dark);
  font-weight: 600;
  margin: 0 auto;
}
`;
}
fs.writeFileSync('css/style.css', css);

// Update HTML
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
  '<p class="hero-subtitle mx-auto text-dark" style="margin-bottom: 0; font-weight: 500;">No necesitas experiencia inmobiliaria. Necesitas mentalidad empresarial.</p>',
  '<p class="mentalidad-text">No necesitas experiencia inmobiliaria. Necesitas mentalidad empresarial.</p>'
);

fs.writeFileSync('index.html', html);
