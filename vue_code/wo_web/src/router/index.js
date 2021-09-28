import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  getUserByToken
} from '@/api/users';
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import( /* webpackChunkName: "about" */ '../views/home/Home.vue')
  ,
  children: [{
    path: "/createWo",
    component: () => import( /* webpackChunkName: "about" */ '../views/woEdit/createWo.vue')
  },
  {
    path: "/woQuery",
    component: () => import( /* webpackChunkName: "about" */ '../views/woEdit/woQuery.vue')
  },
  ]
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
  } else if (localStorage.getItem("token")) {
    getUserByToken().then(res => {
      sessionStorage.setItem('me', JSON.stringify(res.data))
      next()
    }).catch(err => {
      console.log(err);
      router.push({
        path: '/login'
      })
    })
  } else if (!(sessionStorage.getItem("me") && localStorage.getItem("token"))) {
    router.push({
      path: '/login'
    })
  }
  else {
    next()
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router