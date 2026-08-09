import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Replace the current setTimeout wrapping with a better interaction-based wrapping
html = html.replace(/<script>setTimeout\(function\(\)\{\(function\(w,d,s,l,i\)\{w\[l\]=w\[l\]\|\|\[\];w\[l\]\.push\(\{[\s\S]*?\}, 3000\);<\/script>/, `
    <script>
      let gtmLoaded = false;
      function loadGTM() {
        if(gtmLoaded) return; gtmLoaded = true;
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','%VITE_GTM_ID%');
      }
      setTimeout(loadGTM, 6000);
      ['scroll','mousemove','touchstart','click'].forEach(e => window.addEventListener(e, loadGTM, {once: true}));
    </script>
`);

html = html.replace(/<script>setTimeout\(function\(\)\{!function\(f,b,e,v,n,t,s\)[\s\S]*?\}, 3000\);<\/script>/, `
    <script>
      let fbLoaded = false;
      function loadFBPixel() {
        if(fbLoaded) return; fbLoaded = true;
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1381004290747633');
        fbq('track', 'PageView');
      }
      setTimeout(loadFBPixel, 6000);
      ['scroll','mousemove','touchstart','click'].forEach(e => window.addEventListener(e, loadFBPixel, {once: true}));
    </script>
`);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Replaced");
