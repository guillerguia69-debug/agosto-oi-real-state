import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Wrap GTM in setTimeout
html = html.replace(/<script>\(function\(w,d,s,l,i\)/g, "<script>\nsetTimeout(function(){\n(function(w,d,s,l,i)");
html = html.replace(/\)\(window,document,'script','dataLayer','%VITE_GTM_ID%'\);<\/script>/g, ")(window,document,'script','dataLayer','%VITE_GTM_ID%');\n}, 3000);\n</script>");

// Wrap FB Pixel in setTimeout
html = html.replace(/<script>\s*!function\(f,b,e,v,n,t,s\)/g, "<script>\nsetTimeout(function(){\n!function(f,b,e,v,n,t,s)");
html = html.replace(/fbq\('track', 'PageView'\);\s*<\/script>/g, "fbq('track', 'PageView');\n}, 3000);\n</script>");

fs.writeFileSync('index.html', html, 'utf8');
console.log("Done");
