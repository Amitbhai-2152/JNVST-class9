import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use relative production asset URLs so the app works reliably when GitHub Pages
// serves the project under /JNVST-class9/ (and also when viewed from an exported build).
export default defineConfig({
  base: '/JNVST-class9/',
  plugins: [react()],
});
