<template>
  <div class="container">
    <div class="home d-flex align-items-center justify-content-center">
      <div class="content d-flex justify-content-around">
        <div class="round-tema">
          <router-link to="/normal">일반</router-link> 
        </div>
        <div class="round-tema">
          <router-link to="/concept">특성</router-link>
        </div>
      </div>     
    </div>
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
    this.$store.dispatch('savenow')
    this.getDataMovies();
  },

};
</script>

<style scoped>
  .home {
    height: 500px;
  }

  .round-tema {
    width : 150px;
    height: 150px;
    border-radius : 100%;
    border : 1px solid black;
    display : flex;
    align-items : center;
    justify-content: center;
  }
  .content {
    width : 100%;
  }
</style>