const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf-8');

css = css.replace(
  '  font-size: 0.625rem;\n  font-weight: 900;\n  letter-spacing: -0.05em;\n  text-transform: uppercase;',
  '  font-size: 0.85rem;\n  font-weight: 700;\n  letter-spacing: normal;'
);

fs.writeFileSync('css/style.css', css);
