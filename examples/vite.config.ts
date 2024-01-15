import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { publishVersion } from '@lymtic/version-watcher/vite'

export default defineConfig({
  plugins: [
    vue(),
    publishVersion({
      domId: 'infoeyes-online-version'
    })
  ]
})
