<template>
    <div class="container">
        <br>
        <img class="welcom-img" src="@/assets/MINI/welcom.png" alt="">
        <h1 class="detail-title">MINIBOX</h1>
        <hr>
        <carousel :per-page="perPage">
            <slide v-for="(genre, index) in genre_data" :key="index">
                <button type="button" :style="getColor(index)" class="btn" @click="click_button(index, genre)">{{ genre }}</button>
            </slide>
        </carousel>
        <div v-for="genre in select_genre" :key="genre">
            <h3>- {{ genre[1] }} -</h3>
            <GenreMovies :genre="parseInt(genre[0])"/>
            <hr>
        </div>      
    </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'


import GenreMovies from '@/components/movies/GenreMovies'
export default {
    name: 'NormalView',
    components: {
        GenreMovies,
        Carousel,
        Slide,
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
            },
            perPage : 10,
            clickedIndex : null,
            select_genre : [],
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
        },

        handleResize() {
          if (window.innerWidth < 768) {
            this.perPage = 4
          } else if (window.innerWidth < 1200) {
            this.perPage = 8
          } else {
            this.perPage = 10
          }
        },
        getColor(index){
          return index === this.clickedIndex ? 'background-color: #00ff00' : 'background-color: #ff0000'
        },
        click_button(index, genre) {
          let flag = true

          for(let i = 0; i < this.select_genre.length; i++){
            if (this.select_genre[i][0] === index){
              console.log(this.select_genre[i][0])
              this.select_genre.splice(i, 1)
              this.clickedIndex = null
              flag = false
              break
            }
          }  
          if (flag === true)
          {
            this.select_genre.push([index, genre])
            this.clickedIndex = index  
          }   
          console.log(this.select_genre)
        }
    },
    mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
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