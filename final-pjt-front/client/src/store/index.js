import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
// import createPersistedState from 'vuex-persistedstate'
const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState(),
  // ],
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
    LOGOUT(state){
      state.token = null
      sessionStorage.removeItem('key')
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      sessionStorage.setItem('key', token)
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
          res.data.results.forEach((movie) => {
            const data = {
              'genre_ids' : movie.genre_ids,
              'overview' : movie.overview,
              'poster_path' : movie.poster_path,
              'release_date' : movie.release_date,
              'title' : movie.title,
              'vote_average' : movie.vote_average
            }
            console.log(data)
            axios({
              method: 'post',
              url: `${API_URL}/movies/save/`,
              data: data
            })
            .then(() => {
              // console.log(this.state.movieList)
            })
          })
          context.commit('GETMOVIES', res.data.results)
          console.log(this.state.movieList)
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
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    logout(context) {
      context.commit('LOGOUT')
    },
  },
  modules: {
  }
})
