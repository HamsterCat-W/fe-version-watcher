import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { publishVersion } from '@lymtic/version-watcher-utils/dist/index.cjs'

export default defineConfig({
  plugins: [vue(), publishVersion({})]
})
