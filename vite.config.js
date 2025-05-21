import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Make sure your base path is set correctly if deploying to a subdirectory
  base: '/',
})
