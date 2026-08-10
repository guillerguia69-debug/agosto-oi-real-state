import fs from 'fs';
let html = fs.readFileSync('index.html', 'utf8');

// The original URLs may have had different spaces or encodings.
// Let's remove the width/height to test if it's the issue, or fix the space encoding.
html = html.replace(/<img src="images\/calendario-Nexo-CRM%20\(1\)\.webp"/g, '<img src="images/calendario-Nexo-CRM%20(1).webp"');
html = html.replace(/<img src="images\/Propiedades-%20\(1\)\.webp"/g, '<img src="images/Propiedades-%20(1).webp"');
html = html.replace(/<img src="images\/interfaz-Nexo-CRM%20\(1\)\.webp"/g, '<img src="images/interfaz-Nexo-CRM%20(1).webp"');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Done");
