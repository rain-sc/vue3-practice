import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

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
  {
    path: '/department',
    component: Layout,
    children: [{
      path: '',
      name: 'department',
      component: () => import('@/views/department/index.vue'),
      meta: {
        title: 'Department',
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
        title: 'Role',
        icon: 'setting',
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
        title: 'Employee',
        icon: 'people',
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
        title: 'Permission',
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
        title: 'Attendance',
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
        title: 'Approval',
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
        title: 'Salary',
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
        title: 'Social',
        icon: 'table',
      },
    }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
