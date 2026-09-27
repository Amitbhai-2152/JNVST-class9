import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project under /JNVST-class9/.
// Cloudflare Pages exposes CF_PAGES automatically, so its build uses / as root.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.CF_PAGES ? '/' : '/JNVST-class9/'),
  plugins: [react()],
});
