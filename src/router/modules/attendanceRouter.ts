import { Layout } from '..'

export const attendanceRouter = {
  path: '/attendance',
  component: Layout,
  children: [{
    path: '',
    name: 'attendance',
    component: () => import('@/views/attendance/index.vue'),
    meta: {
      title: 'Attendance',
      icon: 'excel',
    },
  }],
}