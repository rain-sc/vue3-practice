import { Layout } from '..'

export const permissionRouter = {
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
}
