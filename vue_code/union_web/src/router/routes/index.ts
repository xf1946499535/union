import { RouteRecordRaw } from 'vue-router'
import Home from '../../pages/home/index.vue'
import About from '../../pages/about/index.vue'
import Dynamic from '../../pages/dynamic/index.vue'
import Homeroutes from "./homepage"

const NotFind = () => import('../../pages/404/index.vue')
const Index = () => import('../../pages/index/index.vue')
const Axios = () => import('../../pages/axios/index.vue')
const Element = () => import('../../pages/element/index.vue')


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    children: Homeroutes
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFind },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '@/views/login/login.vue'),
  },
]

export default routes
