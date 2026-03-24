import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@libcss/studio': resolve(__dirname, '../src/studio'),
      '@libcss/components': resolve(__dirname, '../src/components'),
      '@libcss/common': resolve(__dirname, '../src/common'),
      '@libcss/core': resolve(__dirname, '../src/core'),
      '@libcss/hooks': resolve(__dirname, '../src/hooks'),
      '@libcss/parser': resolve(__dirname, '../src/parser'),
      '@libcss/layout': resolve(__dirname, '../src/components/layout'),
    },
    // Ensure d3 sub-modules referenced from ../src/ resolve to studio's node_modules
    dedupe: [
      'd3', 'd3-scale', 'd3-shape', 'd3-array', 'd3-axis', 'd3-selection',
      'd3-interpolate', 'd3-color', 'd3-path', 'd3-format', 'd3-time-format',
    ],
  },
  optimizeDeps: {
    include: [
      'd3-scale', 'd3-shape', 'd3-array', 'd3-axis', 'd3-selection',
      'd3-interpolate', 'd3-color',
    ],
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    commonjsOptions: {
      include: [/d3/, /node_modules/],
    },
  },
});
