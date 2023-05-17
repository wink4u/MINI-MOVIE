import Vue from 'vue'
import VueRouter from 'vue-router'
import NormalView from '@/views/NormalView'
import ConceptView from '@/views/ConceptView'
import HomeView from '@/views/HomeView'
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
    path: '/home',
    name: 'home',
    component: HomeView
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
