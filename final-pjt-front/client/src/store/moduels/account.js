import axios from 'axios'
import router from '@/router'

const API_URL = 'http://127.0.0.1:8000'

const accounts = {
    state: {
        userData: {},
        token: null,
        movieList: [],
        freeBoard: [],
    },
    getters: {
        boards: state => state.boards,
        userData: state => state.userData,
        token: state => state.token,
        movieList: state => state.movieList,
        freeBoard: state => state.freeBoard
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