import Layout from '@/layout/index.vue'

export const permissionRouter = {
  path: '/permission',
  component: Layout,
  name: 'permission',
  children: [{
    path: '',
    name: 'permission',
    component: () => import('@/views/permission/index.vue'),
    meta: {
      title: '權限',
      icon: 'lock',
    },
  }],
}
