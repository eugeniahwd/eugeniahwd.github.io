import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages:
// - Repo named "<username>.github.io"  -> base: '/'
// - Any other repo name, e.g. "portfolio" -> base: '/portfolio/'
export default defineConfig({
  plugins: [react()],
  base: '/',
});
