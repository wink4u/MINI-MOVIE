<template>
  <div class="card">
    <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" class="img-fluid image" alt="...">
    <div class="middle">
      <div class="text-block">
        <button class="heart-button" @click="toggleHeart()" :class="{'liked' : userLike}"></button>
        <h3>{{movie.vote_average}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  data() {
    return {
      userLike : false
    }
  },
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    toggleHeart() {
      this.userLike = !this.userLike
}
  }
}
</script>

<style scoped>
.card {
  height: 500px;
}
.card:hover .image {
  opacity: 0.2;
}
.card:hover .middle {
  opacity: 2;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  
}
.text-block {
  color: #000;
  padding-left: 30px;
  padding-right: 20px;
  bottom: 20px;
  right: 20px;
  width: 500px;
  
}
.image {
  opacity: 1;
  transition: .5s ease;
  backface-visibility: hidden;
  height: 500px;
  object-fit: cover;
}
.heart-button {
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  background-image: url('../assets/empty-heart.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.heart-button.liked {
  background-image: url('../assets/filled-heart.png');
}

</style>