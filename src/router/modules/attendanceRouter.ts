import Layout from '@/layout/index.vue'

export const attendanceRouter = {
  path: '/attendance',
  name: 'attendance',
  component: Layout,
  children: [{
    path: '',
    name: 'attendance',
    component: () => import('@/views/attendance/index.vue'),
    meta: {
      title: '考勤',
      icon: 'excel',
    },
  }],
}
