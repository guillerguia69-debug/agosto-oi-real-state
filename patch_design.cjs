const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Fix the +100.000 issue (adjust padding and size)
html = html.replace(
  '<div class="px-8 md:px-16 py-8 md:py-0 text-center w-full md:w-1/3">',
  '<div class="px-4 md:px-8 py-8 md:py-0 text-center w-full md:w-1/3">'
);
html = html.replace(
  '<div class="px-8 md:px-16 py-8 md:py-0 text-center w-full md:w-1/3">',
  '<div class="px-4 md:px-8 py-8 md:py-0 text-center w-full md:w-1/3">'
);
html = html.replace(
  '<div class="px-8 md:px-16 py-8 md:py-0 text-center w-full md:w-1/3">',
  '<div class="px-4 md:px-8 py-8 md:py-0 text-center w-full md:w-1/3">'
);

// We need to do it precisely for all 3 occurrences.
// Actually, let's use a regex
html = html.replace(/px-8 md:px-16 py-8 md:py-0/g, 'px-4 md:px-8 py-8 md:py-0');

// Reduce font size for the large numbers so they don't crash
html = html.replace(/text-6xl md:text-7xl/g, 'text-6xl lg:text-7xl');

// 2. Update images
html = html.replace(
  'src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" class="w-full rounded-md mb-6 shadow-sm"',
  'src="images/calendario-Nexo-CRM%20(1).webp" class="w-full rounded-md mb-6 shadow-sm object-cover aspect-video"'
);

html = html.replace(
  'src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" class="w-full rounded-md mb-6 shadow-sm"',
  'src="images/Propiedades-%20(1).webp" class="w-full rounded-md mb-6 shadow-sm object-cover aspect-video"'
);

html = html.replace(
  'src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" class="w-full rounded-md mb-6 shadow-sm"',
  'src="images/interfaz-Nexo-CRM%20(1).webp" class="w-full rounded-md mb-6 shadow-sm object-cover aspect-video"'
);

// 3. Hero background Barcelona with dark shadow
html = html.replace(
  /background-image: linear-gradient\([^)]+\), url\([^)]+\);/,
  "background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop');"
);


fs.writeFileSync('index.html', html);
