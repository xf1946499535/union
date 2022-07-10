import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE as string),
  routes
})
router.beforeEach(function (to, from, next) {
  if (to.meta.requireLogin && !sessionStorage.getItem("myid")) {
    router.push('/login')
  }
  next()
})
// 注册路由守卫


export default router
