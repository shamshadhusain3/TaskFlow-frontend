import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy:{
    //   '/api':  'http://localhost:8080',
        
      
    // },
    host: '0.0.0.0',
    port: '3000'
  },
  // build: {
  //   rollupOptions: {
  //     external: ['react-toastify','react-toastify/dist/ReactToastify.css'],  // Explicitly make react-toastify external
  //   },
  // },
   
  plugins: [react()],
})
