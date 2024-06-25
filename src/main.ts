import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import countTo from 'vue3-count-to'
import VCalendar from 'v-calendar'
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
import { setupDirective } from '@/directive'
import 'v-calendar/style.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(store).use(router).use(ElementPlus).use(countTo).use(VCalendar)
setupDirective(app)

app.mount('#app')
