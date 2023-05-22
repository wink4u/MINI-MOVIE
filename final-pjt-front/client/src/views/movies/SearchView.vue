<template>
<div class="container">
  <div v-for="(movie, index) in filteredMovies" :key="index" class="row mb-3 mt-5">
    <div class="col-md-3">
      <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" class="img-fluid">
    </div>
    <div class="col-md-9">
      <h5 class="mb-0">{{ movie.title }}</h5><br>
      <p class="mb-1">{{ movie.overview }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name : 'SearchView',
    props: {
        filteredMovies: Object
    }

}
</script>

<style>
.imgsize{
    height: 150px;
}
</style>