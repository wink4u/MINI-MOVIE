<template>
  <div>
    <h2>영화 월드컵</h2>
    <div v-if="winner">
      <h3>우승자</h3>
      <img :src="getMoviePosterPath(winner.poster_path)" alt="Winner">
      <p>{{ winner.title }}</p>
      <p>{{ winner }}</p>
      {{ winnergenreRandomMovie }}
    </div>
    <div v-else>
      <div v-if="round === 1">
        <h3>Round 1</h3>
        <h1>VS</h1>
        <div class="row">
          <div v-for="(movie, index) in randomList" :key="movie.id" class="col-sm-6" @click="selectMovie(movie)">
            <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2 || index === cnt*2+1">
            <p v-if="index === cnt*2 || index === cnt*2+1">{{ movie.title }}</p>
          </div>
        </div>
      </div>
      <div v-if="round === 2">
        <h3>Round 2</h3>
        <h1>VS</h1>
        <div class="row">
          <div v-for="(movie, index) in movie8" :key="movie.id" class="col-sm-6" @click="selectMovie(movie)">
            <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2 || index === cnt*2+1">
            <p v-if="index === cnt*2 || index === cnt*2+1">{{ movie.title }}</p>
          </div>
        </div>
      </div>
      <div v-if="round === 3">
        <h3>Round 3</h3>
        <h1>VS</h1>
        <div class="row">
          <div v-for="(movie, index) in movie4" :key="movie.id" class="col-sm-6" @click="selectMovie(movie)">
            <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie" v-if="index === cnt*2 || index === cnt*2+1">
            <p v-if="index === cnt*2 || index === cnt*2+1">{{ movie.title }}</p>
          </div>
        </div>
      </div>
      <div v-else-if="round === 4">
        <h3>Final Round</h3>
        <div class="row">
          <div v-for="movie in movie2" :key="movie.id" @click="selectMovie(movie)" class="col-sm-6">
            <img :src="getMoviePosterPath(movie.poster_path)" alt="Movie">
            <p>{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div>
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
      cnt : 0
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
</style>
