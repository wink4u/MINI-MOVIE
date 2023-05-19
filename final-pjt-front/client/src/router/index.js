import Vue from 'vue'
import VueRouter from 'vue-router'
import NormalView from '@/views/movies/NormalView'
import ConceptView from '@/views/movies/ConceptView'
import LoginView from '@/views/accounts/LoginView'
import SignupView from '@/views/accounts/SignupView'
import HomeView from '@/views/HomeView'
import FreeBoard from '@/views/boards/FreeBoard'
import createBoard from '@/views/boards/createBoard'
import DetailView from '@/views/movies/DetailView'
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
  {
    path: '/board/create',
    name: 'boardcreate',
    component: createBoard
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView,
    props: true
  }
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
