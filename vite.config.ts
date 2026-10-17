import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://v6.vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // es2022 keeps the bundle modern but still runs everywhere Google's crawler sees.
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          // three.js + R3F is by far the largest dependency; isolating it keeps the
          // marketing-only pages from downloading WebGL code.
          if (id.includes('three')) return 'three';
          if (id.includes('react-router') || id.includes('react-dom')) return 'router';
          return undefined;
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  // The site is served as static files; base '/' matches the domain root deployment.
  base: '/',
  appType: 'spa',
});
