import axios from 'axios'
// import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

const movies = {
    namespaced : true,
    state: {
        movieLst : [],
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
        // getMovies(context, index) {
        //     axios({
        //         method: 'GET',
        //         url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${index}&api_key=16e600d87afb33a4184a23b641d8b0c0`
        //     })
        //         .then((res) => {
        //             res.data.results.forEach((movie) => {
        //                 const data = {
        //                     // 'genre_ids' : movie.genre_ids,
        //                     'overview': movie.overview,
        //                     'poster_path': movie.poster_path,
        //                     'release_date': movie.release_date,
        //                     'title': movie.title,
        //                     'vote_average': movie.vote_average
        //                 }
        //                 console.log(data)
        //                 axios({
        //                     method: 'post',
        //                     url: `${API_URL}/movies/save/`,
        //                     data: data
        //                 })
        //                     .then(() => {
        //                         // console.log(this.state.movieList)
        //                     })
        //             })
        //             context.commit('GETMOVIES', res.data.results)
        //             console.log(this.state.movieList)
        //         })
        // },


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
        ,
        
    }
}
export default movies