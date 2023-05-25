import Vue from 'vue'
import VueRouter from 'vue-router'
import NormalView from '@/views/movies/NormalView'
import LoginView from '@/views/accounts/LoginView'
import SignupView from '@/views/accounts/SignupView'
// import HomeView from '@/views/HomeView'
import FreeBoard from '@/views/boards/FreeBoard'
import createBoard from '@/views/boards/createBoard'
import DetailView from '@/views/movies/DetailView'
import BoardDetail from '@/views/boards/BoardDetail'
import ProfileView from '@/views/accounts/ProfileView'
import UserProfile from '@/views/accounts/UserProfile'
import SearchView from '@/views/movies/SearchView'
import worldCup from '@/views/games/worldCup'
// import RspGame from '@/views/games/RspGame'
import NotFound from '@/views/accounts/NotFound'
Vue.use(VueRouter)

const routes = [
  {
    path: '/normal',
    name: 'normal',
    component: NormalView
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
    component: () => import('@/views/HomeView.vue')
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
  },
  {
    path: '/board/:board_id',
    name: 'BoardDetail',
    component: BoardDetail,
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/profile/:user_id',
    name: 'UserProfile',
    component: UserProfile,
    props: true
  },
  {
    path: '/search/:search',
    name: 'search',
    component: SearchView,
    props: true
  },
  {
    path: '/games/worldCup',
    name: 'worldCup',
    component: worldCup
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect:'/404'
  }
  // {
  //   path: '/games/rsp',
  //   name: 'RspGame',
  //   component: RspGame
  // },

]
  
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
