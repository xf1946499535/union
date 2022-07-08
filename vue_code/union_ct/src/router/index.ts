import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE as string),
  routes
})
router.beforeEach(function (to, from, next) {
  console.log(sessionStorage.getItem("myid"));
  if (to.meta.requireLogin && !sessionStorage.getItem("myid")) {
    console.log('请登录');
    router.push('/login')
  }
  next()
})
// 注册路由守卫


export default router
