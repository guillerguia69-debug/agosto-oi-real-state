import fs from 'fs';

async function replaceIcons() {
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Find all data-lucide attributes
  const regex = /<i\s+data-lucide="([^"]+)"(?:\s+class="([^"]*)")?><\/i>/g;
  let match;
  
  const cache = {};
  
  // We need to do it carefully to replace all matches properly
  const replacements = [];
  
  while ((match = regex.exec(html)) !== null) {
    const fullMatch = match[0];
    const iconName = match[1];
    const className = match[2] || '';
    
    if (!cache[iconName]) {
      console.log(`Fetching ${iconName}...`);
      const res = await fetch(`https://unpkg.com/lucide-static@latest/icons/${iconName}.svg`);
      if (res.ok) {
        cache[iconName] = await res.text();
      } else {
        console.error(`Failed to fetch ${iconName}`);
      }
    }
    
    if (cache[iconName]) {
      let svg = cache[iconName];
      if (className) {
        // SVG has `<svg xmlns=... class="lucide lucide-icon-name" ...>`
        // Let's replace `class="lucide lucide-icon-name"` with our class or append it
        svg = svg.replace(/class="([^"]*)"/, `class="$1 ${className}"`);
      }
      replacements.push({
        fullMatch,
        svg
      });
    }
  }
  
  for (const { fullMatch, svg } of replacements) {
    html = html.replace(fullMatch, svg);
  }
  
  // Remove CDN script and initialize call
  html = html.replace(/<script src="https:\/\/unpkg\.com\/lucide@latest"><\/script>\s*/g, '');
  html = html.replace(/\s*\/\/\s*Inicializar iconos\s*lucide\.createIcons\(\);\s*/g, '');
  html = html.replace(/<!-- Lucide Icons -->\s*/g, '');
  
  fs.writeFileSync('index.html', html, 'utf8');
  console.log("Done replacing icons and removing Lucide script.");
}

replaceIcons();
