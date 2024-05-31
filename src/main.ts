import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import 'normalize.css/normalize.css'
import store from './store'
import '@/router/permission'
import '@/assets/styles/index.scss'
import 'uno.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue))

  app.use(store).use(router).use(ElementPlus).component(key, component)

app.mount('#app')
