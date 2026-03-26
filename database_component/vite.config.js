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
//   GET    /api/conf                → [{ type }]
//   GET    /api/conf/:type          → [{ name, data }]
//   GET    /api/conf/:type/:slug    → { … }
//   PUT    /api/conf/:type/:slug    → write / update
//   DELETE /api/conf/:type/:slug    → delete

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

        const type = parts[0];
        const slug = parts[1];

        res.setHeader('Content-Type', 'application/json');

        // LIST component types
        if (req.method === 'GET' && !type) {
          const types = readdirSync(root).filter((f) => {
            try { return statSync(resolve(root, f)).isDirectory(); } catch { return false; }
          }).sort();
          return res.end(JSON.stringify(types.map((t) => ({ type: t }))));
        }

        const typeDir = resolve(root, type);

        // LIST variants for a type
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

        // READ ONE variant
        if (req.method === 'GET' && type && slug) {
          const file = resolve(typeDir, `${slug}.json`);
          if (!existsSync(file)) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Not found' }));
          }
          return res.end(readFileSync(file, 'utf-8'));
        }

        // WRITE / UPDATE
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

        // DELETE
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

// ── Vite plugin: Database mockup persistence ──
//
// Reads / writes the actual JSON mockup files so edits survive reloads.
//   GET  /api/database/:key  → read  mockup file
//   PUT  /api/database/:key  → write mockup file

function databasePersistPlugin(mockupsDir) {
  return {
    name: 'vite-plugin-database-persist',
    configureServer(server) {
      const root = resolve(mockupsDir);

      server.middlewares.use('/api/database', (req, res, next) => {
        const key = decodeURIComponent(
          (req.url || '').replace(/^\//, '').split('?')[0],
        );

        if (!key) return next();

        const file = resolve(root, `${key}.json`);
        res.setHeader('Content-Type', 'application/json');

        // READ
        if (req.method === 'GET') {
          if (!existsSync(file)) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Not found' }));
          }
          return res.end(readFileSync(file, 'utf-8'));
        }

        // WRITE (full source: { schema, records, views })
        if (req.method === 'PUT') {
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            try {
              // Validate JSON before writing
              JSON.parse(body);
              writeFileSync(file, body, 'utf-8');
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// ── Vite config ──────────────────────────────────────

export default defineConfig({
  plugins: [
    react(),
    jsonConfPlugin('./conf'),
    databasePersistPlugin(resolve(__dirname, '../libcss/common/mockups')),
  ],
  resolve: {
    alias: {
      '@libcss/components': resolve(__dirname, '../libcss/components'),
      '@libcss/common':     resolve(__dirname, '../libcss/common'),
      '@libcss/core':       resolve(__dirname, '../libcss/core'),
      '@libcss/hooks':      resolve(__dirname, '../libcss/hooks'),
      '@libcss/layout':     resolve(__dirname, '../libcss/components/layout'),
      // D3 deps used by chart lib — resolve to this project's node_modules
      'd3-interpolate': resolve(__dirname, 'node_modules/d3-interpolate'),
      'd3-scale':       resolve(__dirname, 'node_modules/d3-scale'),
      'd3-shape':       resolve(__dirname, 'node_modules/d3-shape'),
      'd3-array':       resolve(__dirname, 'node_modules/d3-array'),
      'd3-color':       resolve(__dirname, 'node_modules/d3-color'),
      'd3-format':      resolve(__dirname, 'node_modules/d3-format'),
      'd3-time':        resolve(__dirname, 'node_modules/d3-time'),
      'd3-time-format': resolve(__dirname, 'node_modules/d3-time-format'),
      'd3-path':        resolve(__dirname, 'node_modules/d3-path'),
      'd3-axis':        resolve(__dirname, 'node_modules/d3-axis'),
      'd3-selection':   resolve(__dirname, 'node_modules/d3-selection'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
