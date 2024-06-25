import Layout from '@/layout/index.vue'

export const socialRouter = {
  path: '/social',
  component: Layout,
  name: 'social',
  children: [{
    path: '',
    name: 'social',
    component: () => import('@/views/social/index.vue'),
    meta: {
      title: '社保',
      icon: 'table',
    },
  }],
}
