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
        currentUser: '',
        eachUser: ''
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
            router.push({name: 'login'})
        },
        SAVE_TOKEN(state, token) {
            state.token = token
            console.log(state.token)
            sessionStorage.setItem('key', token)
            router.push({ name: 'home' })
        },
        CURRENTUSER(state, userData) {
          state.currentUser = userData
        },
        GETUSERPROFILE(state, userData) {
          state.eachUser = userData
          console.log(state.eachUser)
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
                    alert('로그인이 완료되었습니다.')
                    context.commit('SAVE_TOKEN', res.data.key)
                    sessionStorage.setItem('username', username)
                    context.dispatch('CurrentUser')
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        logout(context) {
          axios({
              method: 'post',
              url: `${API_URL}/auth/logout/`,
              headers: {
                'Authorization': `Token ${sessionStorage.getItem('key')}`
              },
              })
              .then(() => {
                context.commit('LOGOUT')
                alert('로그아웃 완료되었습니다.')
              })
              .catch((err) => {
                  console.log(err.response)
              })
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
        
          updateProfile(context,  data) {
            const userdata = {
              sex: data.sex,
              region: data.region,
              email: data.email,
              username: data.username
            } 
            const user_id = data.user_id        
            axios({
              url: `${API_URL}/accounts/profile/${user_id}/`,
              method: 'put',
              data: userdata,
              headers: {
                'Authorization': `Token ${sessionStorage.getItem('key')}`
              },
            })
            .then(res => {
              console.log(res.data)
              context.commit('GETUSERPROFILE', res.data)
              console.log(res.data.id)
              router.push({ name: 'UserProfile', params: { user_id : res.data.id } })
            })
            .catch(err => {
              console.error(err)
            })
          
          },
          getuserProfile(context, user_id) {
            axios({
              url: `${API_URL}/accounts/profile/${user_id}/`,
              method: 'get',
              headers: {
                'Authorization': `Token ${sessionStorage.getItem('key')}`
              },
            })
            .then(res => {
              console.log(res.data)
              console.log('12345')
              context.commit('GETUSERPROFILE', res.data)

            })
            .catch(err => {
              console.error(err)
            })
          }
    },

}
export default accounts