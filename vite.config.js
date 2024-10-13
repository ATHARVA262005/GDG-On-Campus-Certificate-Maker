import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs()
  ],
  build: {
    rollupOptions: {
      external: ['pdfmake'], // Exclude pdfmake from the build
      output: {
        globals: {
          pdfmake: 'pdfMake'
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['pdfmake','pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts']
  },
});
