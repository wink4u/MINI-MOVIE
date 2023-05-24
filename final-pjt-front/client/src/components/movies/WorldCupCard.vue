<template>
    <div>
      <div>
        <div class="card">
          <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" class="img-fluid image" alt="..." id="imgsize">
          <div class="middle">
            <div class="text-block">
              <button class="heart-button" @click="changeLike()" v-if="isLoggedIn" :class="{'liked' : userLike}"></button>
              <p v-if="!isLoggedIn">로그인해봐요</p>
              <h3 class="image_title_text font_regular">평점 : {{movie.vote_average}}</h3>
              <div class="button-margin"></div>
              <div class="button-wrapper">
                <router-link class="custom-button" :to="{ name: 'detail' , params: { 'id' : this.movie.id, 'title' : this.movie.title,
                                                          'overview' : this.movie.overview, 'release_date' : this.movie.release_date, 'vote_average' : this.movie.vote_average }}">
                  상세 보기 
                </router-link>
              </div>
              <!-- <div class="btn btn-primary" @click="movie_datil(movie.pk)">영화 상세보기</div> -->
            </div>
          </div>
        </div>
        <div class="image_title font_regular">
          <p class="image_title_text" v-if="movie.title.length <= maxLength ">{{ movie.title }}</p> 
          <p class="image_title_text" v-else> {{ movie.title.slice(0, maxLength) }}..</p> 
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'WorldCupCard',
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
      like_movie() {
        if (this.currentUser.id in this.movie.like_movie_users){
          this.userLike = true
        } else {
          this.userLike = false
        }
      },
      changeLike(){
      
        this.userLike = !this.userLike
        this.$store.dispatch('likeMovie', this.movie.id)
        
      },
        // this.userLike = !this.userLike
      getdetailmovie() {
        this.$store.dispatch('getdetailMovie', this.movie.id)
      }
    },
    created() {
      this.like_movie()
    },
    computed: {
      isLoggedIn(){
        return this.$store.getters.isLoggedIn
      },
      currentUser() {
        return this.$store.getters.currentUser
      }
      }
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
    height: 500px;
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
    font-weight: 500;
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