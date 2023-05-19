import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import router from '../router'
import accounts from '@/store/modules/account'
import board from '@/store/modules/board'
import movies from '@/store/modules/movies'

// const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    userData: {},
    token: null,
    movieList: [],
    freeBoard: [],
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    accounts: accounts, board:board, movies:movies
  }
})
