import Layout from '@/layout/index.vue'

export const departmentRouter = {
  path: '/department',
  name: 'department',
  component: Layout,
  children: [{
    path: '',
    name: 'department',
    component: () => import('@/views/department/index.vue'),
    meta: {
      title: '部門',
      icon: 'tree',
    },
  }],
}
