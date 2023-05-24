// import axios from 'axios'
// import router from '@/router'
import createPersistedState from 'vuex-persistedstate'

// const token = sessionStorage.getItem('key')

// const API_URL = 'http://127.0.0.1:8000'

const games = {
    plugins: [
        createPersistedState()
    ],
    state: {
        randomList: [],
        randomPick: null,
        randomvalue: [],
    },
    getters: {
        randomList(state){
            return state.randomList
        },
        randomPick(state) {
            return state.randomvalue
        }
    },
    mutations: {
        GETDANDOMMOVIES(state, randomList){
            state.randomList = randomList
        },
        RANDOMPICK(state, randomPick){
            state.randomvalue = randomPick
        }
    },
    actions: {
        getRandomMovies({getters, commit}) {
            const movieList = getters.movieList
            const randomList = []
            while (randomList.length < 16) {
                const randomIndex = Math.floor(Math.random() * movieList.length);
                const randomMovie = movieList[randomIndex];
                
                // 이미 선택된 영화는 중복 선택하지 않습니다.
                if (!randomList.includes(randomMovie)) {
                    randomList.push(randomMovie);
                }
            }
            commit('GETDANDOMMOVIES', randomList)
        },

        winnergenre({ getters, commit }, data) {
            const genre_ids = data[0]
            const randomMovie = []
            const randompick = getters.movieList.filter((movie) => {
                return movie.genre_ids.includes(genre_ids);
            });
            console.log(randompick)
            while (randomMovie.length != 4){
                const randomIndex = Math.floor(Math.random() * randompick.length)
                if (randomMovie.indexOf(randomIndex) < 0 ){
                    randomMovie.push(randompick[randomIndex])
                }

            }
            console.log('sss')
            console.log(randomMovie);
            commit('RANDOMPICK', randomMovie);
        }
    },
}
export default games
