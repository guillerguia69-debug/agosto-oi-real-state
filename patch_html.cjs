const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Quitar el espacio de video
html = html.replace(
  /<div class="video-container">[\s\S]*?<\/div>/,
  ''
);

// 2. Add preconnect for Playfair Display and add to typography
html = html.replace(
  'family=Inter:wght@400;500;700&family=Montserrat:ital,wght@0,800;0,900;1,800&display=swap',
  'family=Inter:wght@400;500;700&family=Montserrat:ital,wght@0,800;0,900;1,800&family=Playfair+Display:ital@1&display=swap'
);

// 3. Add phrase after hero
html = html.replace(
  '  <!-- SECCIÓN 4 — Mecanismo -->',
  `  <section class="bg-light text-center" style="padding: 4rem 1rem 0 1rem;">
    <div class="container">
      <p class="hero-subtitle mx-auto text-dark" style="margin-bottom: 0; font-weight: 500;">No necesitas experiencia inmobiliaria. Necesitas mentalidad empresarial.</p>
    </div>
  </section>
  <!-- SECCIÓN 4 — Mecanismo -->`
);

// 4. Reduce uppercase
html = html.replace(
  '<a href="#mecanismo">SISTEMA</a>', // Actually let's just do targeted replace for exact matches we expect
  '<a href="#mecanismo">Sistema</a>'
);
// Replace in nav
html = html.replace(
  /<nav class="desktop-nav">([\s\S]*?)<\/nav>/g,
  (match, inner) => {
    return `<nav class="desktop-nav">${inner.replace(/SISTEMA/i, 'Sistema').replace(/EL MODELO/i, 'El modelo').replace(/TECNOLOG[ÍI]A/i, 'Tecnología')}</nav>`;
  }
);
html = html.replace(
  '<div class="eyebrow">EL MODELO TRADICIONAL</div>',
  '<div class="eyebrow" style="text-transform: none; letter-spacing: normal; font-weight: 700; color: var(--accent-red);">El modelo tradicional</div>'
);
html = html.replace(
  '<div class="eyebrow">PRESENCIA EN MEDIOS NACIONALES Y SECTORIALES</div>',
  '<div class="eyebrow" style="text-transform: none; letter-spacing: normal; font-weight: 700;">Presencia en medios nacionales y sectoriales</div>'
);

// 5. Increase spacing in "Los números detrás del sistema"
html = html.replace(
  '<div class="stats-grid mt-12">',
  '<div class="stats-grid mt-16">' // Increase top margin
);
html = html.replace(
  '<div class="testimonials-grid mt-12">',
  '<div class="testimonials-grid mt-24">' // Increase top margin
);
// In CSS we already changed stats-grid gap to 3rem and testimonials-grid gap to 1.5rem. We can do it inline or replace in CSS.
// Let's replace the grid class or add style
html = html.replace(
  '<div class="testimonials-grid mt-24">',
  '<div class="testimonials-grid mt-24" style="gap: 3rem;">'
);

// 6. Change background of testimonials and technology
html = html.replace(
  '<section class="social-proof bg-dark">',
  '<section class="social-proof bg-warm-light">'
);
// For the h2 inside it to be dark
html = html.replace(
  '<h2 class="section-title text-center">Los números detrás del <span class="text-red">sistema.</span></h2>',
  '<h2 class="section-title text-center text-dark">Los números detrás del <span class="text-red">sistema.</span></h2>'
);

html = html.replace(
  '<section class="producto bg-light" id="tecnologia">',
  '<section class="producto bg-warm-light" id="tecnologia">'
);

// 7. Add Luis quote
html = html.replace(
  /<\/div>\s*<\/div>\s*<\/section>\s*<!-- SECCIÓN 8 — Cierre -->/,
  `      </div>
      <div class="pull-quote serif-quote" style="margin-top: 5rem; margin-bottom: 2rem; max-width: 700px; line-height: 1.5;">
        "Quien controla los datos, controla las oportunidades. Y quien controla las oportunidades, lidera el mercado."
        <div class="quote-author" style="margin-top: 1rem; font-family: var(--font-body); font-style: normal; font-weight: 700; color: var(--text-gray-500);">— Luis, Director de Tecnología</div>
      </div>
    </div>
  </section>
  <!-- SECCIÓN 8 — Cierre -->`
);

// 8. Add "El riesgo no es cambiar..." quote
html = html.replace(
  '  <!-- SECCIÓN 8 — Cierre -->',
  `  <section class="bg-warm-light pb-12">
    <div class="container">
      <div class="pull-quote" style="margin: 0 auto; max-width: 600px;">
        "El riesgo no es cambiar. El riesgo es no hacerlo."
      </div>
    </div>
  </section>
  <!-- SECCIÓN 8 — Cierre -->`
);

fs.writeFileSync('index.html', html);
