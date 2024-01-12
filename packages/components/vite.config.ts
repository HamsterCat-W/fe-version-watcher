import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true
    })
    // dts({
    //   outDir: 'lib',
    //   rollupTypes: true
    // })
  ],
  build: {
    target: 'modules',
    outDir: 'dist',
    //   压缩
    minify: false,
    //css分离
    // cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      input: ['src/index.ts']
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs']
    }
  }
})
