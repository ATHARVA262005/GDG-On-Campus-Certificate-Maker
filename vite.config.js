import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs() // Handles CommonJS modules
  ],
  build: {
    rollupOptions: {
      external: ['pdfmake'], // Exclude pdfmake from the build
      output: {
        globals: {
          pdfmake: 'pdfMake' // Ensure pdfMake is globally available
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Optional: Adjust chunk size warning limit
  },
  optimizeDeps: {
    include: ['pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts']
  }
});
