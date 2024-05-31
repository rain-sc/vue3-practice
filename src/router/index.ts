import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'homepage',
          affix: true,
          keepAlive: true,
          alwaysShow: false,
        },
      },
      {
        path: '401',
        component: () => import('@/views/error-page/401/index.vue'),
        meta: { hidden: true },
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404/index.vue'),
        meta: { hidden: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
