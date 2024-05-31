import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import 'normalize.css/normalize.css'
import store from './store'
import '@/router/permission'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus)

app.mount('#app')
