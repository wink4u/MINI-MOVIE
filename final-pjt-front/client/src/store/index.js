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
  },
  getters: {
  },
  mutations: {
    LOGIN(state, userData){
      state.userData = userData
      console.log(state.userData)
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      console.log(state.token)
      router.push({name: 'articles'})
    },
  },
  actions: {
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
