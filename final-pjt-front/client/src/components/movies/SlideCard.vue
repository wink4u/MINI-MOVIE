<template>
  <div>
    <div class="card">
        <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" class="img-fluid image" alt="...">
    </div>
  </div>
</template>

<script>

export default {
    name : 'SlideCard',
    props: {
      movie: {
        type: Object,
      }
    },
}
</script>

<style scoped>
.card {
  height: 300px;
}
</style>