<template>
    <div class="">
        <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-5 gy-3">
            <MovieCard v-for="movie in MovieList"
            :key="movie.id"
            :movie="movie"></MovieCard>
            <p>movie.title</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieCard from '@/components/movies/MovieCard'
export default {
    name: 'NormalView',
    components: {
        MovieCard,
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