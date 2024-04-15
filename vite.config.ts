import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // Ensure assets are loaded relative to index.html
  build: {
    // Additional build configurations
    outDir: 'dist', // Confirm or adjust the output directory
    // Ensure paths are resolved correctly in both dev and prod environments
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'index.html') {
            return 'index.html';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  }
});
