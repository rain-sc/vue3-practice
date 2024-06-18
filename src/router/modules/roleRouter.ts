import Layout from '@/layout/index.vue'

export const roleRouter = {
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
}
