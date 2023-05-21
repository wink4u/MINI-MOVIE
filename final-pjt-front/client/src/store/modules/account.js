import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'
const API_URL = 'http://127.0.0.1:8000'

const accounts = {
    plugins: [
        createPersistedState()
    ],
    state: {
        userData: {},
        token: null,
        isLoggedIn: false,
        currentUser: ''
    },
    getters: {
        currentUser(state) {
            return state.currentUser
        }
    },
    mutations: {
        LOGIN(state, userData) {
            state.userData = userData
            state.isLoggedIn = true
        },
        LOGOUT(state) {
            state.token = null
            state.isLoggedIn = false
            state.currentUser = ''
            sessionStorage.removeItem('key')
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('userId')
            router.push({name: 'home'})
        },
        SAVE_TOKEN(state, token) {
            state.token = token
            console.log(state.token)
            sessionStorage.setItem('key', token)
            router.push({ name: 'home' })
        },
        CURRENTUSER(state, userData) {
          state.currentUser = userData
        }
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
                    context.commit('SAVE_TOKEN', res.data.key)
                    sessionStorage.setItem('username', username)
                    context.dispatch('CurrentUser')
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        logout(context) {
            context.commit('LOGOUT')
        },
        CurrentUser({ state, commit , dispatch }) {
            if (state.isLoggedIn) {
              axios({
                url: `${API_URL}/accounts/userinfo/`,
                method: 'get',
                headers: {
                  'Authorization': `Token ${sessionStorage.getItem('key')}`
                },
              })
                .then(res => {
                  const userData = {
                    id: res.data.id,
                    username: res.data.username,
                  };
                  commit('CURRENTUSER', userData)
                  sessionStorage.setItem('userId', userData.id)
                })
                .catch(err => {
                  if (err.response.status === 401) {
                    dispatch('removeToken');
                    router.push('/login');
                  }
                });
            } else {
              alert('로그인이 필요한 서비스입니다');
              router.push('/login');
            }
          },
    },

}
export default accounts