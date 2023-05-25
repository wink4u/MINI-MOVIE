import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'
const API_URL = 'http://127.0.0.1:8000'

const board = {
  plugins: [
    createPersistedState()
],
    state: {
      freeBoard:[],
      Comments: [],
      allComments : []
    },
    getters: {
    },

    mutations: {
      GETBOARD(state, data) {
        state.freeBoard = data
        },
      SET_COMMENTS(state ,data){
        state.Comments = data
      },
      ALL_COMMENTS(state, data) {
        state.allComments = data
        console.log(state.allComments)
      }
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
        .then((res) => {
          console.log(res)
          router.push('/board')
        })
        .catch((err) => {
          console.log(err)
        })
      },
      createComment(context, data) {
        const board_id = data.board_id
        const content = data.content
        console.log(content)
        const token = sessionStorage.getItem('key')
        axios({
          method: 'post',
          url: `${API_URL}/movies/${board_id}/comment/`,
          headers: {
            Authorization : `Token ${token}`
          },
          data: {'content' : content},
    
        })
        .then((res) => {
          context.dispatch('GetComments', board_id)
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      GetComments(context, board_id) {
        const token = sessionStorage.getItem('key')
        axios({
          url: `${API_URL}/movies/${board_id}/comment/`,
          method: 'get',
          headers: `Token ${token}`
        })
        .then((res) => { 
          context.dispatch('allComments')
          context.commit('SET_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
      },

      deleteComment(context, data) {
        const token = sessionStorage.getItem('key')
        const board_id = data.board_id
        const id = data.id
        
  
        axios({
          url: `${API_URL}/movies/board/${board_id}/${id}`,
          method: 'delete',
          data: {board_pk: board_id, id: id},
          headers: {'Authorization': `Token ${token}`},
        })
        .then(()=> {
          // context.dispatch('allComments')
          context.dispatch('GetComments', board_id)
        })
      },
      allComments(context){
        axios({
          url: `${API_URL}/movies/comments/`,
          method: 'get',
        })
        .then((res) => context.commit('ALL_COMMENTS', res.data))
      },

      deleteBoard(context, real_id) {

        const token = sessionStorage.getItem('key')
        axios({
          method: 'delete',
          url: `${API_URL}/movies/board/${real_id}/`,
          headers: {'Authorization': `Token ${token}`},
        })
        .then(()=>{
          router.push({name: 'board'})
        })
      }
    },

}
export default board