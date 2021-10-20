import Vue from 'vue'
import VueRouter from 'vue-router'

import {
  getUserByToken
} from '@/api/users';
import { getCookie } from "@/utils/sso";

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import( /* webpackChunkName: "about" */ '../views/home/Home.vue'),
},
{
  path: '/login',
  name: 'login',
  component: () => import( /* webpackChunkName: "about" */ '../views/login/index.vue')
}
]
sessionStorage.getItem('me')
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // ...
  if (to.path == "/login") {
    next()
  } else if (getCookie("token")) {
    if (!sessionStorage.getItem('me')) {
      getUserByToken().then(res=>{
        sessionStorage.setItem('me',JSON.stringify(res.data.data))
        next()
      }).catch(err=>{
        router.push({
          path: '/login'
        })
      })
    }
    else{
      next()
    }
    
  } else {
    router.push({
      path: '/login'
    })
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router