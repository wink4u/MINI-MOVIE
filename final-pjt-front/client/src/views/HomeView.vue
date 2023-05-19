<template>
  <div>
    <h1>홈</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    getDataMovies() {
      this.$store.dispatch('movies/getDataMovies');
    }
  },
  created() {
    this.getDataMovies();
    console.log(1)
  }
};
</script>

<style>

</style>