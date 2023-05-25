<template>
  <div>
    <video v-if="showScreen" ref="introVideo" @ended="onvideoEnded"  muted autoplay>
      <source src="@/assets/Intro.mp4" type="video/mp4">
    </video>
    <div v-else>
      <div class="row">
        <div class="col-lg-4 d-none d-lg-block" style="margin-top : 250px;">
          <img class="home-mini-left" src="@/assets/MINI/panti-minion.png" alt="">
        </div>
        <div class="col-lg-4">
          <carousel-3d :perspective="2000" :space="200" 
            :autoplay="true" :autoplay-timeout="3000" 
            :height="500" :animation="slide">
              <slide :index="index" v-for="(movie, index) in MovieList" :key="movie.id">
                  <slide-card :movie="movie"></slide-card>
              </slide>
          </carousel-3d>
        </div>
        <div class="col-lg-4 d-none d-lg-block" style="margin-top : 250px;">
          <img class="home-mini-right" src="@/assets/MINI/run-minion.png" alt="">
        </div>
      </div>
      <div class="blank"></div>
      <div class="into-back">
        <div class="d-flex justify-content-around">
          <div class="image-container">
            <img class="mini-run moving-image" src="@/assets/MINI/minions-dance.gif" alt="">
          </div> 
          <div class="d-flex align-items-center justify-content-center">
            <router-link to="/normal" class="btn btn-primary" aria-current="page">입장하기!</router-link>
          </div>
        </div>
      </div>
      <div class="temp1"></div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { Carousel3d, Slide } from 'vue-carousel-3d'
import SlideCard from '@/components/movies/SlideCard'

export default {
  name: 'HomeView',
  data() {
    return {
      showScreen : true
    }
  },
  components: {
    Carousel3d,
    Slide,
    SlideCard
  },
  methods: {
    onvideoEnded() {
      this.showScreen = false
      sessionStorage.setItem('showScreen', true)
    },
  },
  computed: {
    ...mapState({ MovieList : state => state.movies.movieList}),

  },
  created() {
    if (sessionStorage.getItem('showScreen')) {
      this.showScreen = false
    }
    this.$store.dispatch('savenow')
    if (!this.$store.state.movieList){
      this.$store.dispatch('getDataMovies')
    }
  },
  mounted() {
    this.$refs.introVideo.play()
  }

};
</script>

<style scoped>
  .home {
    height: 855px;
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

  .disappear {
    display : none;
  }

  video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.into-back {
  background-color : white;
}
.blank {
  height: 60px;
}
.mini-run {
  height : 150px;
  margin-right : 200px;
}

.image-container {
  overflow: hidden; /* 이미지가 넘칠 경우 가리기 위해 overflow 속성 설정 */
}

.moving-image {
  animation: moveLeftRight 3s ease-in-out infinite alternate; /* 애니메이션 속성 설정 */
}

@keyframes moveLeftRight {
  0% {
    transform: translateX(0); /* 초기 위치 */
  }
  50% {
    transform: translateX(200px); /* 우측으로 이동할 거리 */
  }
  100% {
    transform: translateX(100); /* 원래 위치로 되돌아옴 */
  }
}
.temp1 {
  height: 100px;
  background-color : rgb(255, 217, 102);
}

.home-mini-left {
  width : 350px;
}
.home-mini-right {
  width : 450px;
  
}
</style>