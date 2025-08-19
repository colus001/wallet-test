import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_NODE_ENV': JSON.stringify(
      process.env.VITE_NODE_ENV || 'development'
    ),
  },
});
