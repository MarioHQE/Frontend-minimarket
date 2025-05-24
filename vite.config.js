import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/producto': {
        target: 'http://localhost:3600',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
