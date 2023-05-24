<template>
    <div class="container">
        <div>
            <h3>스릴러</h3>
            <div id="slider"></div>
            <GenreMovies :genre="53"/>
        </div>
        <div>
            <h3>액션</h3>
            <GenreMovies :genre="28"/> 
        </div>
        <div>
            <h3>코미디</h3>
            <GenreMovies :genre="35"/> 
        </div>
        <div>
            <h3>SF</h3>
            <GenreMovies :genre="878"/> 
        </div>
        <div>
            <h3>애니메이션</h3>
            <GenreMovies :genre="16"/> 
        </div>
        <div>
            <h3>로맨스</h3>
            <GenreMovies :genre="10749"/> 
        </div>
        
    </div>
</template>

<script>

import { mapState } from 'vuex'
import noUiSlider from 'nouislider'
// import wNumb from 'wnumb'

import GenreMovies from '@/components/movies/GenreMovies'
export default {
    name: 'NormalView',
    components: {
        GenreMovies
    },
    data() {
        return {
          value: [20, 40]
        }
    },
    computed: {
        ...mapState({ MovieList: state => state.movies.movieList })
    },
    // created(){
    //     this.$store.dispatch('getDataMovies')
    // },
    mounted() {
      var slider = document.getElementById('slider');

      noUiSlider.create(slider, {
          start: [20, 80],
          connect: true,
          range: {
              'min': 0,
              'max': 100
          }
    });
    }

  }

</script>

<style>

</style>