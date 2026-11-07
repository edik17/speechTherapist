import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src'),
        ],
      },
    },
  },
  build: {
    outDir: 'dist/my-logopedia/browser',
    emptyOutDir: true,
  },
  server: {
    port: 4200,
    allowedHosts: true,
  },
});
