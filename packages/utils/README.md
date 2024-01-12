### 使用

### 安装

```bash
npm i @lymtic/version-watcher-utils
```

### 插件引入

在 vite.config.ts 引入

```ts
import { publishVersion } from '@lymtic/version-watcher-utils'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    publishVersion({
      domId: 'lymtic-version-watcher' // 可选参数，可以不传
    })
  ]
})
```

插件需要配合组件库： @lymtic/version-watcher-utils 使用，在传递 domId 时，需要保持一致
