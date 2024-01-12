### 使用

### 安装

```bash
npm i @lymtic/version-watcher-components
```

### 样式引入

```ts
// main.ts

import '@lymtic/version-watcher-components/dist/index.css'
```

### 组件引入

在根组件 App.vue 引入组件

```vue
<script setup lang="ts">
import { FeVersionWatcher } from '@lymtic/version-watcher-components'
</script>

<template>
  <div>
  <FeVersionWatcher></FeVersionWatcher>
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
