import nprogress from 'nprogress'
import router, { asyncRoutes } from './index'
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
          const menus = userStore.userProfile.roles.menus
          const filterRoutes = asyncRoutes.filter(item => menus.includes(item.name))
          filterRoutes.forEach((route) => {
            router.addRoute(route)
          })
          userStore.defautlRoutes.push(...filterRoutes)
          next({ ...to, replace: true })
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
