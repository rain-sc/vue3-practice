import { Layout } from '..'

export const approvalRouter = {
  path: '/approval',
  component: Layout,
  children: [{
    path: '',
    name: 'approval',
    component: () => import('@/views/approval/index.vue'),
    meta: {
      title: 'Approval',
      icon: 'tree-table',
    },
  }],
}
