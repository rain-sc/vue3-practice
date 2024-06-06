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
import 'animate.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(store).use(router).use(ElementPlus)

app.mount('#app')
