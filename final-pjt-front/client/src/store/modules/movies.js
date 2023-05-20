import axios from 'axios'
// import router from '../router'
const token = sessionStorage.getItem('key')

const API_URL = 'http://127.0.0.1:8000'

const movies = {
    state: {
        userData: {},
        token: null,
        movieList: [],
        eachComments : [],
        allMovieComments : []
    },
    getters: {
    },
    mutations: {
        GETDATAMOVIES(state, data) {
            data.forEach((movie) => {
                state.movieList.push(movie)
            })
        },
        GETCOMMENTS(state, data) {
            state.eachComments = data
        }

    },
    actions: {
        getDataMovies(context) {
            axios({
                method: 'get',
                url: `${API_URL}/movies/`,
            })
            .then((res) => {
                console.log(res.data)
                context.commit('GETDATAMOVIES', res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        GetComments(context, movie_pk){
            axios({
                url: `${API_URL}/movies/${movie_pk}/movieComment/`,
                method: 'get',
                headers: `Token ${token}`
            })
            .then((res) => context.commit('GETCOMMENTS', res.data))
            .catch(err => console.error(err.response))
        },

        createMcomment(context, data) {
            const movie_id = data.movie_id
            const content = data.content
            const token = sessionStorage.getItem('key')
            axios({
              method: 'post',
              url: `${API_URL}/movies/${movie_id}/movieComment/`,
              headers: {
                Authorization : `Token ${token}`
              },
              data: {'content' : content},
            })
            .then((res) => {
              console.log(res)
              context.dispatch('GetComments', movie_id)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        deleteMcomment(context, data){
            const token = sessionStorage.getItem('key')
            const movie_id = data.movie_id
            const id = data.id
            axios({
              url: `${API_URL}/movies/${movie_id}/${id}`,
              method: 'delete',
              headers: {'Authorization': `Token ${token}`},
            })
            .then(()=> {
              context.dispatch('GetComments', movie_id)
            })
          },
        allComments(context){
        axios({
            url: `${API_URL}/movies/comments/`,
            method: 'get',
        })
        .then((res) => context.commit('ALL_COMMENTS', res.data))
    }
        

    }
}
export default movies