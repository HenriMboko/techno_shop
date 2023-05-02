import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/products": "http://localhost:4000/",
      "/api/products/:id": "http://localhost:4000/",
      "/api/users": "http://localhost:4000/"
    }
  }
})
