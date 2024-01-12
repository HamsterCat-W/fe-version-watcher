import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue()
    // dts({
    //   tsconfigPath: '../../tsconfig.json'
    // }),
    // dts({
    //   outDir: 'lib',
    //   tsconfigPath: '../../tsconfig.json'
    // })
  ],
  build: {
    target: 'modules',
    outDir: 'dist',
    //   压缩
    minify: false,
    //css分离
    cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          // preserveModules: true,
          //配置打包根目录
          // preserveModulesRoot: 'src',
          dir: 'dist'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          //让打包目录和我们目录对应
          // preserveModules: true,
          //配置打包根目录
          // preserveModulesRoot: 'src',
          dir: 'lib'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs']
    }
  }
})
