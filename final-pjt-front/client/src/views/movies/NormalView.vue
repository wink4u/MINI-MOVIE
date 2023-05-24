<template>
    <div class="container">
        <br>
        <img class="welcom-img" src="@/assets/MINI/welcom.png" alt="">
        <h1 class="detail-title">MINIBOX</h1>
        <hr>
        <div v-for="genre in randomGenres" :key="genre">
            <h3>- {{ genre[1] }} -</h3>
            <GenreMovies :genre="parseInt(genre[0])"/>
            <hr>
        </div>      
    </div>
</template>

<script>

import { mapState } from 'vuex'


import GenreMovies from '@/components/movies/GenreMovies'
export default {
    name: 'NormalView',
    components: {
        GenreMovies
    },
    data() {
        return {
            genre_data : {
                12: '모험',
                14 : '판타지',
                16 : '애니메이션',
                18 : '드라마',
                27 : '공포',
                28 : '액션',
                35 : '코미디',
                36 : '역사',
                37 : '서부',
                53 : '스릴러',
                80 : '범죄',
                99 : '다큐멘터리',
                878 : 'SF',
                9648 : '미스터리',
                10402 : '음악',
                10749 : '로맨스',
                10751 : '가족',
                10752 : '전쟁',
                10770 : 'TV영화',
            }
        }
    },
    computed: {
        ...mapState({ MovieList: state => state.movies.movieList }),
        randomGenres() {
            const genres = Object.entries(this.genre_data)
            const shuffledGenres = this.shuffleArray(genres)
            return shuffledGenres.slice(0,4)
        }
    },
    methods: {
        shuffleArray(array) {
            let currentIndex = array.length
            let temporaryValue, randomIndex

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    },
    created(){
        this.$store.dispatch('getDataMovies')
    },

}

</script>

<style>
.welcom-img {
    width : 350px;
}

.detail-title {
    color:white;
    margin : 0;
}
</style>