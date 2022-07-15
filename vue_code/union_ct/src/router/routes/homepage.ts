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
  },
  {
    path: '/affairs',
    name: 'affairs',
    redirect: '/analysis',
    component: () => import('@/views/affairs/index.vue'),
    meta: {
      title: '行政管理',
      code: '2',
      requireLogin: true
    },
    children: [
      {
        path: '/accountapply',
        name: 'accountapply',
        component: () => import('@/views/affairs/accountapply.vue'),
        meta: {
          title: '注册审批',
          code: '2-1',
          requireLogin: true
        },
      }, {
        path: '/accountct',
        name: 'accountct',
        component: () => import('@/views/affairs/accountct.vue'),
        meta: {
          title: '账号管理',
          code: '2-2',
          requireLogin: true
        },
      }
    ]
  }
]
export default routes
