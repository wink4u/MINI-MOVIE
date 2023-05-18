import Vue from 'vue'
import VueRouter from 'vue-router'
import NormalView from '@/views/NormalView'
import ConceptView from '@/views/ConceptView'
import LoginView from '@/views/LoginView'
import SignupView from '@/views/SignupView'
import HomeView from '@/views/HomeView'
import FreeBoard from '@/views/FreeBoard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/normal',
    name: 'normal',
    component: NormalView
  },
  {
    path: '/concept',
    name: 'concept',
    component: ConceptView
  },

  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/board',
    name: 'board',
    component: FreeBoard
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
