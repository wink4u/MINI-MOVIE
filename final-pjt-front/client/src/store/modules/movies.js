import axios from 'axios'
// import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

const movies = {
    namespaced : true,
    state: {
        userData: {},
        token: null,
        movieList: [],
    },
    getters: {
    },
    mutations: {
        GETDATAMOVIES(state, data) {
            data.forEach((movie) => {
                state.movieLst.push(movie)
            })
        },

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
        }
    }
}
export default movies