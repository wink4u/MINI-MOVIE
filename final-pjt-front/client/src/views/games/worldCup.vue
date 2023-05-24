<template>
  <div>
    <br>
    <p class="worldcupt-title">영화 월드컵</p>
    <div v-if="winner">
      <h3>우승자</h3>
      <b-button v-b-modal.modal-center><img :src="getMoviePosterPath(winner.poster_path)" alt="Winner" class="btn p-0" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></b-button>
      <!-- <button type="button" class="btn btn-primary" >
        Launch static backdrop modal
      </button> -->
      <p>{{ winner.title }}</p>
    </div>
    <div v-else>
      <div v-if="round === 1">
        <h3>Round 1</h3>           
        <div class="row">
          <div class="col-md-5">
            <div v-for="(movie, index) in randomList" :key="movie.id" class="image-transition" @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2">
              <p v-if="index === cnt*2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div v-for="(movie, index) in randomList" :key="movie.id" class="image-transition" @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2+1">
              <p v-if="index === cnt*2+1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="round === 2">
        <h3>Round 2</h3>
        <div class="row">
          <div class="col-md-5">
            <div v-for="(movie, index) in movie8" :key="movie.id"  class="image-transition" @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2">
              <p v-if="index === cnt*2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div v-for="(movie, index) in movie8" :key="movie.id" class="image-transition" @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2+1">
              <p v-if="index === cnt*2+1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="round === 3">
        <h3>Round 3</h3>
        <div class="row">
          <div class="col-md-5">
            <div v-for="(movie, index) in movie4" :key="movie.id" class="image-transition"  @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2">
              <p v-if="index === cnt*2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div v-for="(movie, index) in movie4" :key="movie.id" class="image-transition"  @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2+1">
              <p v-if="index === cnt*2+1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="round === 4">
        <h3>Final Round</h3>
        <div class="row">
          <div class="col-md-5">
            <div v-for="(movie, index) in movie2" :key="movie.id" class="image-transition" @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2">
              <p v-if="index === cnt*2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div v-for="(movie, index) in movie2" :key="movie.id" class="image-transition" @click="selectMovie(movie)">
              <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2+1">
              <p v-if="index === cnt*2+1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
<!-- 
    <div class="modal fade modal-fade-centered" id="staticBackdrop" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div> -->
  </div>

  
</template>

<script>
export default {
  name: 'worldCup',
  data() {
    return {
      round: 1,
      movie8: [],
      movie4: [],
      movie2: [],
      winner: null,
      cnt : 0,
    }
  },
  computed: {
    randomList() {
      return this.$store.getters.randomList.slice()
    },
    winnergenreRandomMovie(){
      return this.$store.getters.randomPick
    }
  },
  created() {
    this.$store.dispatch('getRandomMovies')
  },
  methods: {
    selectMovie(movie) {
      if (this.round === 1) {
        this.movie8.push(movie);
        this.cnt += 1
        if (this.movie8.length === 8) {
          this.round = 2;
          this.cnt = 0
        }
      } else if (this.round === 2) {
        this.movie4.push(movie);
        this.cnt += 1
        if (this.movie4.length === 4) {
          this.round = 3;
          this.cnt = 0
        }
      } else if (this.round === 3) {
        this.movie2.push(movie);
        this.cnt += 1
        if (this.movie2.length === 2){
          this.round = 4;
          this.cnt = 0
        }
      } else if (this.round === 4) {
        this.winner = movie;
        console.log(this.winner.genre_ids)
        this.$store.dispatch('winnergenre', this.winner.genre_ids)
      }
    },
    getMoviePosterPath(posterPath) {
      return `https://image.tmdb.org/t/p/original${posterPath}`;
    },
  },
}
</script>

<style scoped>
img {
  height: 500px;
  width: 400px;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.col-sm-6:nth-child(even) {
  flex-basis: 50%;
}
.hidden {
  display: none;
}

.vs {
  width : 20%;
  height : 20%;
}
.image-transition:hover {
  transform: scale(1.1);
}

p {
  font-size : 40px;
  font-weight : bold;
}

.worldcupt-title {
  font-size : 60px;
  font-weight : bold;
}
</style>
