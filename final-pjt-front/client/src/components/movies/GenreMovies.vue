<template>
    <div>
        <div v-for="(movie, index) in genremovies" :key="index">
            <!-- {{ movie.title }} -->
            <MovieCard :movie="movie"/>
        </div>
        <!-- <div>{{ genre }}</div>
        <div>{{ genremovies }}</div> -->
        <!-- <div>{{ movieList }}</div> -->
    </div>
</template>

<script>
import MovieCard from '@/components/movies/MovieCard.vue'
export default {
    name: 'GenreMovies',
    props : {
        genre: Number
    },
    components:{
        MovieCard
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
    created(){
        // this.$store.dispatch('getDataMovies')
    }

}
</script>

<style>

</style>