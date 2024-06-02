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
  {
    path: '/department',
    component: Layout,
    children: [{
      path: '',
      name: 'department',
      component: () => import('@/views/department/index.vue'),
      meta: {
        title: 'department',
        icon: 'tree',
      },
    }],
  },
  {
    path: '/role',
    component: Layout,
    children: [{
      path: '',
      name: 'role',
      component: () => import('@/views/role/index.vue'),
      meta: {
        title: 'role',
        icon: 'tree',
      },
    }],
  },
  {
    path: '/employee',
    component: Layout,
    children: [{
      path: '',
      name: 'employee',
      component: () => import('@/views/employee/index.vue'),
      meta: {
        title: 'employee',
        icon: 'tree',
      },
    }],
  },
  {
    path: '/permission',
    component: Layout,
    children: [{
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/index.vue'),
      meta: {
        title: 'permission',
        icon: 'lock',
      },
    }],
  },
  {
    path: '/attendance',
    component: Layout,
    children: [{
      path: '',
      name: 'attendance',
      component: () => import('@/views/attendance/index.vue'),
      meta: {
        title: 'attendance',
        icon: 'excel',
      },
    }],
  },
  {
    path: '/approval',
    component: Layout,
    children: [{
      path: '',
      name: 'approval',
      component: () => import('@/views/approval/index.vue'),
      meta: {
        title: 'approval',
        icon: 'tree-table',
      },
    }],
  },
  {
    path: '/salary',
    component: Layout,
    children: [{
      path: '',
      name: 'salary',
      component: () => import('@/views/salary/index.vue'),
      meta: {
        title: 'salary',
        icon: 'money',
      },
    }],
  },
  {
    path: '/social',
    component: Layout,
    children: [{
      path: '',
      name: 'social',
      component: () => import('@/views/social/index.vue'),
      meta: {
        title: 'social',
        icon: 'table',
      },
    }],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
