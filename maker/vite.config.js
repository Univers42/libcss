import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import {
  readdirSync, readFileSync, writeFileSync,
  unlinkSync, existsSync, mkdirSync, statSync,
} from 'node:fs';

// ── Vite plugin: REST API for conf/{componentType}/*.json ──
//
// Nested, polymorphic API — one sub-folder per component type.
//
//   GET    /api/conf                → [{ type }]  (list component types)
//   GET    /api/conf/:type          → [{ name, data }]  (list variants)
//   GET    /api/conf/:type/:slug    → { … }
//   PUT    /api/conf/:type/:slug    → write / update
//   DELETE /api/conf/:type/:slug    → delete
//
// The useJsonConf hook from libcss works unchanged —
// just pass `/api/conf/button` as the apiBase.

function jsonConfPlugin(confDir) {
  return {
    name: 'vite-plugin-json-conf',
    configureServer(server) {
      const root = resolve(confDir);
      if (!existsSync(root)) mkdirSync(root, { recursive: true });

      server.middlewares.use('/api/conf', (req, res, next) => {
        const parts = decodeURIComponent(
          (req.url || '').replace(/^\//, '').split('?')[0],
        )
          .split('/')
          .filter(Boolean);

        const type = parts[0]; // e.g. "button"
        const slug = parts[1]; // e.g. "primary"

        res.setHeader('Content-Type', 'application/json');

        // ── LIST component types ──
        if (req.method === 'GET' && !type) {
          const types = readdirSync(root).filter((f) => {
            try { return statSync(resolve(root, f)).isDirectory(); } catch { return false; }
          }).sort();
          return res.end(JSON.stringify(types.map((t) => ({ type: t }))));
        }

        const typeDir = resolve(root, type);

        // ── LIST variants for a type ──
        if (req.method === 'GET' && type && !slug) {
          if (!existsSync(typeDir)) mkdirSync(typeDir, { recursive: true });
          const files = readdirSync(typeDir).filter((f) => f.endsWith('.json')).sort();
          const entries = files
            .map((f) => {
              try {
                return {
                  name: f.replace('.json', ''),
                  data: JSON.parse(readFileSync(resolve(typeDir, f), 'utf-8')),
                };
              } catch { return null; }
            })
            .filter(Boolean);
          return res.end(JSON.stringify(entries));
        }

        // ── READ ONE variant ──
        if (req.method === 'GET' && type && slug) {
          const file = resolve(typeDir, `${slug}.json`);
          if (!existsSync(file)) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Not found' }));
          }
          return res.end(readFileSync(file, 'utf-8'));
        }

        // ── WRITE / UPDATE ──
        if (req.method === 'PUT' && type && slug) {
          if (!existsSync(typeDir)) mkdirSync(typeDir, { recursive: true });
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            writeFileSync(resolve(typeDir, `${slug}.json`), body, 'utf-8');
            res.end(JSON.stringify({ ok: true }));
          });
          return;
        }

        // ── DELETE ──
        if (req.method === 'DELETE' && type && slug) {
          const file = resolve(typeDir, `${slug}.json`);
          if (existsSync(file)) unlinkSync(file);
          return res.end(JSON.stringify({ ok: true }));
        }

        next();
      });
    },
  };
}

// ── Vite config ──────────────────────────────────────

export default defineConfig({
  plugins: [react(), jsonConfPlugin('./conf')],
  resolve: {
    alias: {
      '@libcss/components': resolve(__dirname, '../libcss/components'),
      '@libcss/common': resolve(__dirname, '../libcss/common'),
      '@libcss/core': resolve(__dirname, '../libcss/core'),
      '@libcss/hooks': resolve(__dirname, '../libcss/hooks'),
      '@libcss/layout': resolve(__dirname, '../libcss/components/layout'),
    },
  },
  server: {
    port: 4200,
    open: true,
  },
});
