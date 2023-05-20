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
        // currentUser: {},
    },
    getters: {
        // currentUser_id(state) {
        //     return state.currentUser.id
        // }
    },
    mutations: {
        LOGIN(state, userData) {
            state.userData = userData
            state.isLoggedIn = true
        },
        LOGOUT(state) {
            state.token = null
            state.isLoggedIn = false
            sessionStorage.removeItem('key')
            router.push({name: 'home'})
        },
        SAVE_TOKEN(state, token) {
            state.token = token
            console.log(state.token)
            sessionStorage.setItem('key', token)
            router.push({ name: 'home' })
        },
        // SET_CURRENT_USER (state, user) { 
        //     state.currentUser = user 
        //     console.log(state.currentUser.id)
        // },
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
                    console.log(res.data)
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
        CurrentUser({ state, dispatch }) {
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
                  console.log(userData)
                  sessionStorage.setItem('userId', userData.id)
                //   commit('SET_CURRENT_USER' , userData);
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