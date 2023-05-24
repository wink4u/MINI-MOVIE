<template>
  <div>
    <br />
    <p class="worldcupt-title">영화 월드컵</p>
    <div v-if="winner">
      <h3>[ 우승작품 ]</h3>
      <img
        :src="getMoviePosterPath(winner.poster_path)"
        alt="Winner"
        class="btn p-0"
        type="button"
        @click="WinnerWinner()"
      />
      <br>
      <p>{{ winner.title }}</p>
      <div v-if="flag === 1">
        <hr>
        <h3>우승작품과 비슷한 장르를 추천드릴게요!</h3>
        <div>
          <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <div v-for="(movie, index) in winnergenreRandomMovie" :key="index">
              <WorldCupCard class="col" :movie="movie"/>
            </div>
          </div>
        </div>
        <img class="movie-minion" src="@/assets/MINI/movie_flower_minion.gif" alt="">
      </div>
    </div>
    <div v-else>
      <div v-if="round === 1">
        <h3>Round 1</h3>
        <div class="row">
          <div class="col-md-5">
            <div
              v-for="(movie, index) in randomList"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2"
              />
              <p v-if="index === cnt * 2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div
              v-for="(movie, index) in randomList"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2 + 1"
              />
              <p v-if="index === cnt * 2 + 1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="round === 2">
        <h3>Round 2</h3>
        <div class="row">
          <div class="col-md-5">
            <div
              v-for="(movie, index) in movie8"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2"
              />
              <p v-if="index === cnt * 2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div
              v-for="(movie, index) in movie8"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2 + 1"
              />
              <p v-if="index === cnt * 2 + 1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="round === 3">
        <h3>Round 3</h3>
        <div class="row">
          <div class="col-md-5">
            <div
              v-for="(movie, index) in movie4"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2"
              />
              <p v-if="index === cnt * 2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div
              v-for="(movie, index) in movie4"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2 + 1"
              />
              <p v-if="index === cnt * 2 + 1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="round === 4">
        <h3>Final Round</h3>
        <div class="row">
          <div class="col-md-5">
            <div
              v-for="(movie, index) in movie2"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2"
              />
              <p v-if="index === cnt * 2">{{ movie.title }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <h1>VS</h1>
          </div>
          <div class="col-md-5">
            <div
              v-for="(movie, index) in movie2"
              :key="movie.id"
              class="image-transition"
              @click="selectMovie(movie)"
            >
              <img
                :src="getMoviePosterPath(movie.poster_path)"
                alt="Movie"
                v-if="index === cnt * 2 + 1"
              />
              <p v-if="index === cnt * 2 + 1">{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
import WorldCupCard from "@/components/movies/WorldCupCard.vue";

export default {
  name: "worldCup",
  data() {
    return {
      round: 1,
      movie8: [],
      movie4: [],
      movie2: [],
      winner: null,
      cnt: 0,
      flag: 0,
      perPage: null,
      lgpage: 5,
      smpage: 3,
      xsmpage: 2,
    };
  },
  computed: {
    randomList() {
      return this.$store.getters.randomList.slice();
    },
    winnergenreRandomMovie() {
      console.log(this.$store.getters.randomPick);
      return this.$store.getters.randomPick;
    },
  },
  created() {
    this.$store.dispatch("getRandomMovies");
  },
  components: {
    WorldCupCard,
  },
  methods: {
    selectMovie(movie) {
      if (this.round === 1) {
        this.movie8.push(movie);
        this.cnt += 1;
        if (this.movie8.length === 8) {
          this.round = 2;
          this.cnt = 0;
        }
      } else if (this.round === 2) {
        this.movie4.push(movie);
        this.cnt += 1;
        if (this.movie4.length === 4) {
          this.round = 3;
          this.cnt = 0;
        }
      } else if (this.round === 3) {
        this.movie2.push(movie);
        this.cnt += 1;
        if (this.movie2.length === 2) {
          this.round = 4;
          this.cnt = 0;
        }
      } else if (this.round === 4) {
        this.winner = movie;
        console.log(this.winner.genre_ids);
        this.$store.dispatch("winnergenre", this.winner.genre_ids);
      }
    },
    getMoviePosterPath(posterPath) {
      return `https://image.tmdb.org/t/p/original${posterPath}`;
    },
    WinnerWinner() {
      this.flag = 1;
      console.log(this.flag);
    },
    // setView() {
    //     if (window.innerWidth >= 992){
    //       this.perPage = this.lgpage
    //     } else if (window.innerWidth >= 576) {
    //       this.perPage = this.smpage
    //     } else {
    //       this.perPage = this.xsmpage
    //     }
    //   }
  },
};
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
  width: 20%;
  height: 20%;
}
.image-transition:hover {
  transform: scale(1.1);
}

p {
  font-size: 40px;
  font-weight: bold;
}

.worldcupt-title {
  font-size: 60px;
  font-weight: bold;
}

.foot {
  height: 100px;
}

.movie-minion {
  height : 200px;
}
</style>
