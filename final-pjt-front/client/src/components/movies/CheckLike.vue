<template>
  <div>
    <div>
      <div class="card">
        <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" class="img-fluid image" alt="..." id="imgsize">
        <div class="middle">
          <div class="text-block">
            <h3 class="image_title_text font_regular" style="font-size: 30px;">평점 : {{movie.vote_average}}</h3>
            <div class="button-margin"></div>
            <div class="button-wrapper">
              <router-link class="custom-button" :to="{ name: 'detail' , params: { 'id' : this.movie.id, 'title' : this.movie.title,
                                                        'overview' : this.movie.overview, 'release_date' : this.movie.release_date, 'vote_average' : this.movie.vote_average }}">
                <h5>상세 보기</h5> 
              </router-link>
            </div>
            <!-- <div class="btn btn-primary" @click="movie_datil(movie.pk)">영화 상세보기</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckLike',
  data() {
    return {
      maxLength : 11,
      userLike: false,
    }
  },
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    getdetailmovie() {
      this.$store.dispatch('getdetailMovie', this.movie.id)
    }
  },
  }
</script>

<style scoped>
/* .card {
  height: 300px;
  width: 300px;
} */

.card:hover .image {
  opacity: 0.2;
}
.card:hover .middle {
  opacity: 1;
}

/* .button-margin {
  height : 100px;
} */


.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.text-block {
  color: #000;
  padding-left: 30px;
  padding-right: 20px;
  bottom: 20px;
  right: 20px;
  font-size: 10px;
  width : 250px;
}
.image {
  opacity: 1;
  transition: .5s ease;
  backface-visibility: hidden;
  height: 300px;
  width: 300px;
  object-fit: cover;
}
.movie_detail {
  height : 60px;
}

.image_title{
  font-size : 25px;
  display : flex;
  align-items : center;
  justify-content : center;

}

.image_title_text {
  font-family: 'Hahmlet', serif;
}
.font_regular {
  font-weight: 400;
}

.font_middle {
  font-weight:500;
}

.heart-button {
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  background-image: url('@/assets/empty-heart.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.heart-button.liked {
  background-image: url('@/assets/filled-heart.png');
}

.button-wrapper {
  background-color: transparent;
  border: none;
  display: inline-block;
}

.custom-button {
  background-color: transparent;
  border: none;
  color: black;
  padding: 0;
  position: relative;
  text-decoration: none;
  font-size : 25px;
}
</style>