import Layout from '@/layout/index.vue'

export const approvalRouter = {
  path: '/approval',
  component: Layout,
  name: 'approval',
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
