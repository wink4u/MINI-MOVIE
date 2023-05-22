<template>
    <div class="container">
        <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-5 gy-3">
            <!-- <p>movie.title</p> -->
        </div>
        <carousel-3d :perspective="2000" :space="200" 
        :autoplay="true" :autoplay-timeout="3000" 
        :height="500" :animation="slide">
            <slide :index="index" v-for="(movie, index) in MovieList" :key="movie.id">
                <slide-card :movie="movie"></slide-card>
            </slide>
        </carousel-3d>
    </div>
</template>

<script>

import { mapState } from 'vuex'
// import MovieCard from '@/components/movies/MovieCard'
import { Carousel3d, Slide } from 'vue-carousel-3d'
import SlideCard from '@/components/movies/SlideCard'
export default {
    name: 'NormalView',
    components: {
        // MovieCard,
        Carousel3d,
        Slide,
        SlideCard,
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({ MovieList: state => state.movies.movieList })
    },
    created(){
        this.$store.dispatch('getDataMovies')
    }

}
</script>

<style>

</style>