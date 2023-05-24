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
        eachUser: '',
        followstate: '',
        userId: null,
        username: null
    },
    getters: {
        currentUser(state) {return state.currentUser},
        followState(state) {return state.followstate},
        userData(state) {return state.userData},
        token(state) {return state.token},
        isLoggedIn(state) {return state.isLoggedIn},
        userId(state) {return state.userId},
        username(state) {return state.username},
        eachUser(state) {return state.eachUser}
        
    },
    mutations: {
        SAVENOW(state) {
          state.isLoggedIn = sessionStorage.getItem('key') ? true : false
          state.token = sessionStorage.getItem('key') ? sessionStorage.getItem('key') : null
          state.userId = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : null
          state.username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : null
          console.log(state.token)
        },
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
        },
        FOLLOW(state, followstate){
          state.followstate = followstate
        }
    },
    actions: {
        savenow(context){
          context.commit('SAVENOW')
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
                    alert('로그인이 완료되었습니다.')
                    context.commit('SAVE_TOKEN', res.data.key)
                    sessionStorage.setItem('username', username)
                    context.dispatch('CurrentUser')
                })
                .catch((err) => {
                    console.log(err)
                    alert('아이디 or 패스워드 확인 바랍니다')
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
              username: data.username,
              imgId: data.imgId,
            } 
            const user_id = data.user_id        
            axios({
              url: `${API_URL}/accounts/profile/${user_id}/my/`,
              method: 'put',
              data: userdata,
              headers: {
                'Authorization': `Token ${sessionStorage.getItem('key')}`
              },
            })
            .then(res => {
              console.log(res.data)
              context.dispatch('getuserProfile', res.data.id)
            })
            .catch(err => {
              console.error(err)
            })
          
          },
          getuserProfile(context, user_id) {
            // if (router.UserProfile === 'UserProfile' && router.UserProfile.params.user_id === user_id) {
            //   console.warn('Avoided redundant navigation to current location:', router.UserProfile.path);
            //   return; 
            // }
            axios({
              url: `${API_URL}/accounts/profile/${user_id}/`,
              method: 'get',
              // headers: {
              //   'Authorization': `Token ${sessionStorage.getItem('key')}`
              // },
            })
            .then(res => {
              console.log(res.data)
              console.log('12345')
              context.commit('GETUSERPROFILE', res.data)
              router.push({ name: 'UserProfile', params: { user_id : user_id } })

            })
            .catch(err => {
              console.error(err)
            })
          },

        follow(context, each_id){
          console.log(each_id)
          axios({
            url: `${API_URL}/accounts/follow/${each_id}/`,
            method: 'post',
            headers: {
              'Authorization': `Token ${sessionStorage.getItem('key')}`
            },
          })
          .then((res) => {
            console.log(res)
            context.commit('FOLLOW', res)
          })
          .catch((err)=>{
            console.log(err)
          })
        },
        findfollow(context, each_id){
          axios({
            url: `${API_URL}/accounts/follow/${each_id}/get`,
            method: 'get',
            // headers: {
            //   'Authorization': `Token ${sessionStorage.getItem('key')}`
            // },
          })
          .then((res) => {
            console.log(res)
            context.commit('FOLLOW', res)
          })
        }

    },

}
export default accounts