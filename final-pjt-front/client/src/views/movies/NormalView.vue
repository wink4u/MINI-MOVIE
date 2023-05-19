<template>
    <div class="">
        <div class="row row-cols-4 row-cols-md-5 gy-3">
            <MovieCard v-for="movie in movieList"
            :key="movie.id"
            :movie="movie"></MovieCard>
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
        ...mapState(['movieList'])
    }
}
</script>

<style>

</style>