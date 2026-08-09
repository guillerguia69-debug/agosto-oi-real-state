const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf-8');

// 1. Add bg-warm-light
css = css.replace(
  '--bg-gray: #F9FAFB;',
  '--bg-gray: #F9FAFB;\n  --bg-warm-light: #F9F5F0;\n  --font-serif: \'Playfair Display\', serif;'
);

css += `\n
.bg-warm-light {
  background-color: var(--bg-warm-light);
  color: var(--text-dark);
}
.serif-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: 1.5rem;
  color: var(--text-dark);
  text-align: center;
  border: none;
  padding: 0;
}
.quote-author {
  font-weight: 700;
  color: var(--text-gray-500);
  font-size: 0.95rem;
}
`;

// Also update testimonial card for light bg
css = css.replace(
  '.testimonial-card {\n  padding: 2.5rem;\n  border-radius: 4px;\n  border: 1px dashed rgba(255,255,255,0.1);\n}',
  '.testimonial-card {\n  padding: 2.5rem;\n  border-radius: 4px;\n  background-color: #ffffff;\n  border: 1px solid #E5E7EB;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);\n}'
);
// Testimonial text colors
css = css.replace(
  '.quote-text {\n  font-size: 1rem;\n  font-style: normal;\n  margin-bottom: 1.5rem;\n  color: var(--text-light);\n}',
  '.quote-text {\n  font-size: 1rem;\n  font-style: normal;\n  margin-bottom: 1.5rem;\n  color: var(--text-dark);\n}'
);
css = css.replace(
  '.quote-author {\n  font-weight: 700;\n  color: var(--text-light-gray);\n  font-size: 0.95rem;\n}',
  '.quote-author {\n  font-weight: 700;\n  color: var(--text-gray-500);\n  font-size: 0.95rem;\n}'
);

fs.writeFileSync('css/style.css', css);
