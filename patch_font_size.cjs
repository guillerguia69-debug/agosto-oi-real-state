const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/text-6xl lg:text-7xl/g, 'text-5xl md:text-5xl lg:text-6xl');
html = html.replace(/text-6xl lg:text-7xl/g, 'text-5xl md:text-5xl lg:text-6xl'); // Just in case

fs.writeFileSync('index.html', html);
