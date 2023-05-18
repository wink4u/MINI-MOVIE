<template>
    <div>

    </div>
</template>

<script>
export default {
    name: 'NormalView',
    // data() {
    //     return {
    //         movieLi = [],
    //         genre_ids : [],
    //         overview : '',
    //         poster_path: '',
    //         release_data: '',
    //         title: '',
    //         vote_average: '',
    //     }
    // },
    methods: {

    },
    created() {
        this.$store.dispatch('postMovies')
    }
}
</script>

<style>

</style>