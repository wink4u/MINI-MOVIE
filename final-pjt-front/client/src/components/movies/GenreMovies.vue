<template>
  <div>
    <div v-if="genre!=0">
      <carousel :pagination-enabled="false" :per-page="perPage" :autoplay="true"
                :loop = "true">
        <slide v-for="(movie, index) in genremovies" :key="index">
          <MovieCard :movie="movie"/>
        </slide>
      </carousel>
    </div>
    <div v-if="genre===0" class="row">
      <div v-for="(movie, index) in paginatedMovies" :key="index" class="col-3">
        <MovieCard :movie="movie"/>
      </div>
      <div class="d-flex justify-content-center" v-if="paginatedMovies.length !== 0">
        <b-pagination v-model="currentPage" :total-rows="movieList.length" :per-page="12" size="lg" variant="info"></b-pagination>
      </div>
    </div>

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
        currentPage : 1,
        cnt : 0,
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
        },
        paginatedMovies() {
        const startIndex = (this.currentPage - 1) * 12;
        const endIndex = startIndex + 12;
        return Object.values(this.movieList).slice(startIndex, endIndex);
      }, 
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