import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This branch is deployed at the Cloudflare Worker domain root.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
