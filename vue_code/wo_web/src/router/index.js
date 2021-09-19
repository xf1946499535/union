import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import axios from 'axios'
import {
  getUserByToken
} from '@/api/users';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: "/createWo",
      component: () => import( /* webpackChunkName: "about" */ '../views/home/createWo.vue')

    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '../views/login/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  if (to.path == "/login") {
    next()
  } else if (!(sessionStorage.getItem("me") && localStorage.getItem("token"))) {
    router.push({
      path: '/login'
    })
  } else {
    next()
  }
})
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router