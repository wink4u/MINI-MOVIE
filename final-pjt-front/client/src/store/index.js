import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import router from '../router'
import accounts from '@/store/modules/account'
import board from '@/store/modules/board'
import movies from '@/store/modules/movies'
import games from '@/store/modules/games'
import createPersistedState from 'vuex-persistedstate'

// const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
],
  state: {
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    accounts: accounts, board:board, movies:movies, games:games,
  }
})
