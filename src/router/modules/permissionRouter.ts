import Layout from '@/layout/index.vue'

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
