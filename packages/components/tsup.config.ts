import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/plugin/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: false,
  outDir: './vite-plugin',
  splitting: false,
  external: ['cheerio']
})
