import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import '@lymtic/version-watcher-components/dist/index.css'

const routes = [
  {
    path: '/',
    component: () => import('./App.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
  // history:
})

import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
