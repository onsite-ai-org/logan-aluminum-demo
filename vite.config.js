import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path: https://<user>.github.io/<repo>/
export default defineConfig({
  base: '/logan-aluminum-demo/',
  plugins: [react()],
})
