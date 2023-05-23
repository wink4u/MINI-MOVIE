<template>
  <div>
    <carousel :pagination-enabled="false" :per-page="perPage" :autoplay="true"
              :loop = "true">
      <slide v-for="(movie, index) in genremovies" :key="index">
        <MovieCard :movie="movie"/>
      </slide>
    </carousel>

  </div>
  
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import MovieCard from '@/components/movies/MovieCard.vue'
export default {
    name: 'GenreMovies',
    props : {
        genre: Number
    },
    data() {
      return {
        perPage : null,
        lgpage : 5,
        smpage : 3,
        xsmpage : 2,
      }
    },
    components:{
        MovieCard,
        Carousel,
        Slide,
    },  
    computed: {
        movieList(){
            return this.$store.getters.movieList
        },
        genremovies(){
            return this.movieList.filter((movie) => {
                return movie.genre_ids.some(id => id === this.genre)
            })
        }
    },
    mounted() {
      window.addEventListener('resize', this.setView)
      this.setView()
    },
    methods: {
      setView() {
        if (window.innerWidth >= 992){
          this.perPage = this.lgpage
        } else if (window.innerWidth >= 576) {
          this.perPage = this.smpage
        } else {
          this.perPage = this.xsmpage
        }
      }
    },  
    created(){
        // this.$store.dispatch('getDataMovies')
    }

}
</script>

<style>

</style>