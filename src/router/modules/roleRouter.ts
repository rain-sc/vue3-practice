import Layout from '@/layout/index.vue'

export const roleRouter = {
  path: '/role',
  component: Layout,
  name: 'role',
  children: [{
    path: '',
    name: 'role',
    component: () => import('@/views/role/index.vue'),
    meta: {
      title: '角色',
      icon: 'setting',
    },
  }],
}
