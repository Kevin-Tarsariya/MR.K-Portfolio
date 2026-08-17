import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MR.K-Portfolio/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-icons']
  }
})