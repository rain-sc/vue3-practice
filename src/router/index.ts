import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { departmentRouter } from './modules/departmentRouter'
import { roleRouter } from './modules/roleRouter'
import { employeeRouter } from './modules/employeeRouter'
import { permissionRouter } from './modules/permissionRouter'
import { attendanceRouter } from './modules/attendanceRouter'
import { approvalRouter } from './modules/approvalRouter'
import { salaryRouter } from './modules/salaryRouter'
import { socialRouter } from './modules/socialRouter'

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
          title: 'Dashboard',
          icon: 'dashboard',
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

export const asyncRoutes = [
  departmentRouter,
  roleRouter,
  employeeRouter,
  permissionRouter,
  attendanceRouter,
  approvalRouter,
  salaryRouter,
  socialRouter,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
