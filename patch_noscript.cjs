const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const noscript = `<noscript>
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1381004290747633&ev=PageView&noscript=1"
      />
    </noscript>`;

html = html.replace(noscript, '');
html = html.replace('<body class="font-sans text-gray-800">', `<body class="font-sans text-gray-800">\n${noscript}`);

fs.writeFileSync('index.html', html);
