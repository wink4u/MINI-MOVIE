import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'
const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    userData: {},
    token: null,
    movieList: [],
  },
  getters: {
  },
  mutations: {
    GETMOVIES(state, data){
      data.forEach((movie) => {
        state.movieList.push(movie)
      }) 
    },
    LOGIN(state, userData){
      state.userData = userData
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      console.log(state.token)
      router.push({name: 'home'})
    },
  },
  actions: {
    getMovies(context, index) {
        axios({
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${index}&api_key=16e600d87afb33a4184a23b641d8b0c0`
        })
        .then((res) => {
          console.log(res.data.results)
          context.commit('GETMOVIES', res.data.results)
    })
  },
    login(context, payload) {
      context.commit('LOGIN', payload)
      const username = payload.username
      const password = payload.password
      axios({
        method: 'post',
        url: `${API_URL}/auth/login/`,
        data: {
          username, password
        }
      })
      .then((res) => {
        console.log(res.data.access)
        context.commit('SAVE_TOKEN', res.data.access)
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  modules: {
  }
})
