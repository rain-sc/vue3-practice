import nprogress from 'nprogress'
import router from './index'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { useUserStoreHook } from '@/store/modules/user'

const whiteList = ['/login', '/404']
const userStore = useUserStoreHook()
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    }
    else {
      const userIn = userStore.userProfile.userId
      if (userIn) {
        next()
      }
      else {
        try {
          await userStore.getUserProfile()
          next()
        }
        catch (error) {
          await userStore.resetToken()
          next(`/login?redirect=${to.path}`)
          console.error(error)
        }
      }
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
