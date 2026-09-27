import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages ではリポジトリ名のサブパス(/task-board/)で配信される
  base: '/task-board/',
  plugins: [react()],
})
