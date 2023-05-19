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
    },
    getters: {

    },
    mutations: {
        LOGIN(state, userData) {
            state.userData = userData
        },
        LOGOUT(state) {
            state.token = null
            sessionStorage.removeItem('key')
        },
        SAVE_TOKEN(state, token) {
            state.token = token
            console.log(state.token)
            sessionStorage.setItem('key', token)
            router.push({ name: 'home' })
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
                    context.commit('SAVE_TOKEN', res.data.key)
                    sessionStorage.setItem('username', username)
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        logout(context) {
            context.commit('LOGOUT')
        },
    },

}
export default accounts