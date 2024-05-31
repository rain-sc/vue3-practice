import nprogress from 'nprogress'
import router from './index'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    }
    else {
      next()
    }
  }
  else {
    if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next('/login')
      nprogress.done()
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
