const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const bypass = `  <script>
    // Bypass for environment fetch interception errors
    try {
      if (typeof window !== 'undefined' && window.fetch) {
        const origFetch = window.fetch;
        Object.defineProperty(window, 'fetch', {
          get: () => origFetch,
          set: (v) => {},
          configurable: true
        });
      }
    } catch(e) {}
  </script>`;

if (!html.includes('Bypass for environment fetch interception errors')) {
  html = html.replace('<head>', '<head>\n' + bypass);
  fs.writeFileSync('index.html', html);
}
