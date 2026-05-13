import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  base: '/Voyna-Demo/',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  server: { port: 5173 },
  build: { outDir: 'dist', sourcemap: true }
});
