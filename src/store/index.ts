import { createPinia } from 'pinia'

const store = createPinia()

export * from './modules/user'
export * from './modules/app'

export default store
