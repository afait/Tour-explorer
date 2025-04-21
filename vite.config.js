import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.allorigins.win',
        changeOrigin: true,
        rewrite: (path) => `/raw?url=https://course-api.com${path.replace(/^\/api/, '')}`,
      },
    },
  },
// Update the proxy to use AllOrigins
server: {
  proxy: {
    '/api': {
      target: 'https://api.allorigins.win',
      changeOrigin: true,
      rewrite: (path) => `/raw?url=https://course-api.com${path.replace(/^\/api/, '')}`,
    },
  }},
});

// filepath: c:\Users\annaf\Documents\Tour-explorer\src\config.js
// Proxied endpoint
export const API_URL = "https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project";

