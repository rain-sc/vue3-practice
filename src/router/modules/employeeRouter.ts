import Layout from '@/layout/index.vue'

export const employeeRouter = {
  path: '/employee',
  component: Layout,
  name: 'employee',
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee/index.vue'),
    meta: {
      title: '員工',
      icon: 'people',
    },
  }],
}
