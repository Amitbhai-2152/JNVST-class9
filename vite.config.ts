import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project under /JNVST-class9/.
// Cloudflare Pages serves the app from the domain root, so its build can
// override VITE_BASE_PATH without changing the main production configuration.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/JNVST-class9/',
  plugins: [react()],
});
