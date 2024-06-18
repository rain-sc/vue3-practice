import Layout from '@/layout/index.vue'

export const employeeRouter = {
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
}
