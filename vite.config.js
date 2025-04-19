// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    extensions: ['.js'],
  },
  //병합 문제가 발생해서 이거 추가했어요
  build: {
    rollupOptions: {
      // Externalizing 'codemirror' or removing it based on your needs
      external: [], // If you don't need 'codemirror' to be externalized, leave it empty
    },
  },
});
