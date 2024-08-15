import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    // for CORS proxy
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/api', // target api
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //     secure: false
    //   }
    // }
  },
  
})
