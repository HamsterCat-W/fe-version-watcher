### 安装

```bash
npm i @lymtic/version-watcher
```

### 插件引入

在 vite.config.ts 引入

```ts
import { publishVersion } from '@lymtic/version-watcher/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    publishVersion({
      domId: 'lymtic-version-watcher' // 可选参数，可以不传
    })
  ]
})
```

插件需要配合组件使用，在传递 domId 时，需要保持一致

### 样式引入

```ts
// main.ts
import '@lymtic/version-watcher/style.css'
```

### 组件引入

在根组件 App.vue 引入组件

```vue
<script setup lang="ts">
import { FeVersionWatcher } from '@lymtic/version-watcher'
</script>

<template>
  <div>
    <FeVersionWatcher></FeVersionWatcher>
  </div>
</template>
```

FeVersionWatcher 组件接收 props

props 都是可选属性，不传递时使用默认属性

```ts
type expirationType = '1d' | '30min'

interface PropsType {
  modelDomId?: string // 渲染的弹窗的id
  desc?: string // 弹窗内容
  expiration?: expirationType // 缓存时间，默认一天只显示一次
  showModal?: boolean //是否显示弹出案，false时直接触发刷新，不显示弹窗
  domId?: string // 页面上存储的版本号元素的id ,需要与 @lymtic/version-watcher-utils 这个库配合使用，也可以都不传递，使用默认值
}
```
