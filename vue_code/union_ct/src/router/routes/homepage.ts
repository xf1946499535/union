import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/analysis',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页',
      code: '1',
      requireLogin: true
    },
    children: [
      {
        path: '/analysis',
        name: 'analysis',
        component: () => import('@/views/dashboard/analysis.vue'),
        meta: {
          title: '分析页',
          code: '1-1',
          requireLogin: true
        },
      },
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/dashboard/workbench.vue'),
        meta: {
          title: '工作台',
          code: '1-2',
          requireLogin: true
        },
      }
    ]
  }
]
export default routes
