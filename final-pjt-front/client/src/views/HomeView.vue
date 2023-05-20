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
      this.$store.dispatch('getDataMovies');
    }
  },
  created() {
    this.getDataMovies();
  }
};
</script>

<style>

</style>