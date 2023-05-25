<template>
<div class="container">
  <div v-for="(movie, index) in paginatedMovies" :key="index">
    <div class="row mb-3 mt-5">
      <div class="col-md-3">
        <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" class="img-fluid">
      </div>
      <div class="col-md-9">
        <h5 class="mb-0">{{ movie.title }}</h5><br>
        <p class="mb-1">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
  <div v-if="paginatedMovies.length === 0" style="margin-top: 300px;">
    <h2>죄송합니다 찾으시는 영화 정보가 없습니다!!</h2>

  </div>

  <div class="d-flex justify-content-center" v-if="paginatedMovies.length !== 0">
    <b-pagination v-model="currentPage" :total-rows="filteredMovies.length" :per-page="10" size="lg" variant="info"></b-pagination>
  </div>

</div>
</template>

<script>
export default {
    name : 'SearchView',
    props: {
        filteredMovies: Object,
    },
    data() {
      return {
        currentPage : 1,
        cnt : 0,
      }
    },
    computed : {
      paginatedMovies() {
        const startIndex = (this.currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        return Object.values(this.filteredMovies).slice(startIndex, endIndex);
      },     
    },
    methods : {
      // click_title() {
      //   this.$router.push({name : 'detail',  , params: { 'id' : this.movie.id, 'title' : this.movie.title,
      //                                                   'overview' : this.movie.overview, 'release_date' : this.movie.release_date, 'vote_average' : this.movie.vote_average } })
      // }
    }
}
</script>

<style>
.imgsize{
    height: 150px;
}
</style>