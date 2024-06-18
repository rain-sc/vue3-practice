import { Layout } from '..'

export const departmentRouter = {
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
}
