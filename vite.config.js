import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs() // Ensures Vite can handle CommonJS modules
  ],
  optimizeDeps: {
    include: ['@react-pdf/renderer', 'pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts']
  },
  build: {
    rollupOptions: {
      external: ['pdfmake'], // Treats pdfmake as an external module to avoid conflicts
    },
    chunkSizeWarningLimit: 1000, // Increases the default chunk size warning limit (optional)
  },
});
