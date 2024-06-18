import Layout from '@/layout/index.vue'

export const salaryRouter = {
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
}
