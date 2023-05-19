import axios from 'axios'
// import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

const board = {
    state: {

    },
    getters: {

    },

    mutations: {
      GETBOARD(state, data) {
          state.freeBoard = data
        },
        GETDATAMOVIES(state, data) {
          console.log(data)
          state.movieList = data
        }
    },
    actions: {
      getBoard(context) {
        axios({
          method: 'get',
          url: `${API_URL}/comment`,
        })
        .then((res) => {
          context.commit('GETBOARD', res.data)
        })
      },
    },

}
export default board