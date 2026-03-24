import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/styles': path.resolve(__dirname, './src/app/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Podríamos inyectar aquí los abstracts si quisiéramos que estén disponibles siempre
        // additionalData: `@import "@/app/styles/abstracts/index";`
      },
    },
  },
});
