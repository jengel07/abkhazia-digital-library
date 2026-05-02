import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Добавлено для работы локальных путей
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
