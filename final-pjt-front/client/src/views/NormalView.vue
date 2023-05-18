<template>
    <div>
        <div v-for="(movie, index) in movieList" :key="index">
            {{ movie.title || null }}
            {{ movie.overview || null }}
            {{ movie.vote_average || null }}
            {{ movie.poster_path || null }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'NormalView',
    data() {
        return {
        }
    },
    methods: {
        movieList() {
            return this.$store.state.movieList
        }
    },
    // created() {
    //     this.$store.dispatch('postMovies')
    // }
}
</script>

<style>

</style>