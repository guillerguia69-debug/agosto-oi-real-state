import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Plugin que incrusta el CSS generado por el build dentro de un <style> en el
 * HTML final. Elimina la petición de red del CSS (render-blocking) y mejora el
 * FCP sin alterar el diseño (CLS = 0). En desarrollo no hace nada (apply: build).
 */
function inlineCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const cssFiles: Array<[string, any]> = [];
      const htmlFiles: Array<any> = [];

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'asset') continue;
        if (fileName.endsWith('.css')) cssFiles.push([fileName, chunk]);
        if (fileName.endsWith('.html')) htmlFiles.push(chunk);
      }

      if (cssFiles.length === 0 || htmlFiles.length === 0) return;

      for (const [fileName, cssAsset] of cssFiles) {
        const css = String(cssAsset.source);
        const cssName = fileName.split('/').pop();
        const styleTag = `<style>${css}</style>`;

        for (const htmlAsset of htmlFiles) {
          const html = String(htmlAsset.source);
          // Vite reescribe el <link> del CSS al asset con hash (p. ej. /assets/main-xxxx.css)
          const linkRegex = new RegExp(
            `<link[^>]*rel="stylesheet"[^>]*href="[^"]*${escapeRegExp(cssName)}"[^>]*>`
          );
          if (linkRegex.test(html)) {
            htmlAsset.source = html.replace(linkRegex, styleTag);
          }
        }

        // Eliminar el .css externo: ya no existe solicitud de red para el CSS.
        delete bundle[fileName];
      }
    },
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [tailwindcss(), inlineCssPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          gracias: path.resolve(__dirname, 'gracias.html')
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: 'all',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
