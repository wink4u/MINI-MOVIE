import axios from 'axios'
// import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

const board = {
    state: {
      freeBoard:[]
    },
    getters: {
    },

    mutations: {
      GETBOARD(state, data) {
          state.freeBoard = data
        },
    },
    actions: {
      getBoard(context) {
        axios({
          method: 'get',
          url: `${API_URL}/movies/board`,
        })
        .then((res) => {
          context.commit('GETBOARD', res.data)
        })
      },
      createB(context, data) {
        const token = sessionStorage.getItem('key')
        // console.log(data)
        console.log(token)
        axios({
          method: 'post',
          url: `${API_URL}/movies/board/create/`,
          headers: {
            Authorization : `Token ${token}`
          },
          data: data
        })
        .then(() => {
          this.getBoard()
          console.log(this.state.freeBoard)
        })
        .catch(() => {
          console.log('1234654')
        })
      }
    },

}
export default board