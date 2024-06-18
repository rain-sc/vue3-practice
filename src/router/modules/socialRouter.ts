import Layout from '@/layout/index.vue'

export const socialRouter = {
  path: '/social',
  component: Layout,
  children: [{
    path: '',
    name: 'social',
    component: () => import('@/views/social/index.vue'),
    meta: {
      title: 'Social',
      icon: 'table',
    },
  }],
}
