import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'

const token = sessionStorage.getItem('key')

const API_URL = 'http://127.0.0.1:8000'

const movies = {
    plugins: [
        createPersistedState()
    ],
    state: {
        userData: {},
        token: null,
        movieList: [],
        eachComments : [],
        allMovieComments : [],
        movieLike: {
            like_movie_users: [],
        },
        movie: [],
        conceptMovieList: [],
        videoId : null,
        likemovie: [],
    },
    getters: {
        likemovie(state) {
            const sortedMovies = state.likemovie.sort((a, b) => b.vote_average - a.vote_average);
            const slicedMovies = sortedMovies.slice(0, 12);
            return slicedMovies;
          },
        movieList(state) {
            return state.movieList
        }
    },
    mutations: {
        GETDATAMOVIES(state, data) {
            state.movieList = data
            console.log(state.movieList)
        },
        GETDETAILMOVIE(state, data){
            state.movie = data
            // console.log(state.movie)
        },
        GETCOMMENTS(state, data) {
            state.eachComments = data
        },
        LIKE_MOVIE(state, like_data) {
    
            state.movieLike= like_data
            console.log(state.movieLike)
            console.log('1234')
        },
        ALL_COMMENTS(state, data) {
            state.allMovieComments = data
        },
        GETVIDEO(state, data){
            state.videoId = data
        },
        GETLIKEMOVIES(state, data) {
            state.likemovie = data
        }

    },
    actions: {
        getDataMovies(context) {
            axios({
                method: 'get',
                url: `${API_URL}/movies/`,
            })
            .then((res) => {
                // console.log(res.data)
                context.commit('GETDATAMOVIES', res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        // getdetailMovie(context, movie_id){
        //     axios({
        //         method: 'get',
        //         url: `${API_URL}/movies/${movie_id}/`
        //     })
        //     .then((res) => {
        //         // console.log(res.data)
        //         context.commit('GETDETAILMOVIE', res.data)
        //     })
        // },


        GetCommentsMovie(context, movie_pk){
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
            .then(() => {
                context.dispatch('GetCommentsMovie', movie_id)
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
                context.dispatch('GetCommentsMovie', movie_id)
                context.dispatch('GetComments', movie_id)
            })
          },
        allComments(context){
            axios({
                url: `${API_URL}/movies/comments/`,
                method: 'get',
            })
            .then((res) => context.commit('ALL_COMMENTS', res.data))
            },
    
        likeMovie(context, movieId) {
            const token = sessionStorage.getItem('key')
            axios({
                url: `${API_URL}/movies/${movieId}/like/`,
                method: 'post',
                headers: {'Authorization': `Token ${token}`},
            })
            .then(res => {
            context.commit("LIKE_MOVIE", res.data)
            context.dispatch('getDataMovies')


            })
            .catch(err => {
            console.error(err)
            })
        },

        GetVideo(context, movietitle) {
            // 'AIzaSyAt7zqRKJCkQDfB9wsteGM5cd9m8VNxDqY' 내꺼
            // AIzaSyCzX11JfosePWWHawgosV6vD__dpCWaOMs 태형이형
            const apiKey = 'AIzaSyCzX11JfosePWWHawgosV6vD__dpCWaOMs';
            const query = `${movietitle} 예고편`;
            const total_query = query

            axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                key: apiKey,
                q: total_query,
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                },
            })
            .then(response => {
                context.commit('GETVIDEO', response.data.items[0].id.videoId)
            })
            .catch(error => {
                console.error('Error searching videos:', error);
            });
        },
        // search(context, searchData){
        //     console.log(searchData)
        //     console.log(this.getters.movieList)
        //     this.state.movieList.map((movie) => {
            
        //         if (searchData in movie.title || searchData in movie.overview) {
        //             return movie
        //         }
        //     })
        // }
        search(context, searchData) {
            const filteredMovies = this.getters.movieList.filter((movie) => {
                // console.log(searchData.trim().toLowerCase())
                // console.log(movie.title.toLowerCase())
            return  movie.title.toLowerCase().includes(searchData.trim().toLowerCase()) || 
                    movie.overview.toLowerCase().includes(searchData.trim().toLowerCase())
            });
            // console.log(filteredMovies);
            router.push({ name: 'search', params: { filteredMovies: filteredMovies, 'search':searchData } })
        },
        
        getlikemovies(context, user_id) {
            const token = sessionStorage.getItem('key')
            axios({
                url: `${API_URL}/movies/like/${user_id}`,
                method: 'get',
                headers: {'Authorization': `Token ${token}`},
            })
            .then((res) => {
                console.log('좋아요')
                console.log(res.data)
                context.commit('GETLIKEMOVIES', res.data)
            })
        }

    }
}
export default movies