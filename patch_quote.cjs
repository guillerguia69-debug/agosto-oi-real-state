const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
  '  </section>\n  <section class="bg-warm-light" style="padding-bottom: 3rem;">\n    <div class="container">\n      <div class="pull-quote" style="margin: 0 auto; max-width: 600px;">\n        "El riesgo no es cambiar. El riesgo es no hacerlo."\n      </div>\n    </div>\n  </section>',
  '      <div class="pull-quote" style="margin: 6rem auto 0 auto; max-width: 600px;">\n        "El riesgo no es cambiar. El riesgo es no hacerlo."\n      </div>\n    </div>\n  </section>'
);

fs.writeFileSync('index.html', html);
