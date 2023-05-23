<template>
  <div id="app" class="main-color">
    <div>
      <div class="navbar navbar-expand-lg bg-body-tertiary nav-color">
      <div class="container-fluid">
        <img class="mini_logo" src="@/assets/MINI/glass_mini.png" alt="mini_img">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item nav-font">
              <router-link to="/" class="nav-link active" aria-current="page">홈</router-link>
            </li>
            <li class="nav-item nav-font">
              <router-link to="/login" class="nav-link active" aria-current="page" v-if="!isLoggedIn">로그인</router-link>
            </li>
            <li class="nav-item nav-font">
              <a class="nav-link active cursor-on" aria-current="page" @click="logout" v-if="isLoggedIn">로그아웃</a>
            </li>
            <li class="nav-item nav-font">
              <router-link to="/signup" class="nav-link active" aria-current="page">회원가입</router-link>
            </li>
            <li class="nav-item nav-font">
              <router-link to="/board" class="nav-link active" aria-current="page">자유게시판</router-link>
            </li>
            <li class="nav-item nav-font" v-if="isLoggedIn">
              <router-link to="/profile" class="nav-link active" aria-current="page">프로필</router-link>
            </li>

          </ul>
          <div class="collapse navbar-collapse searchmovie" id="navbarNav">

            <div class="search-input-wrapper">
              <input type="text" id="search-input" v-model="searchData" placeholder="검색어를 입력하세요" @keyup.enter="search">
              <img src="./assets/search.png" class="searchImg" @click="search">
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
    
</div>
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {
      checkOut: false,
      searchData: ''
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    saveValue() {
      localStorage.setItem('checkOut', JSON.stringify(true));
    },
    search() {
      this.$store.dispatch('getDataMovies')
      if (this.searchData.trim().length === 0) {
        alert('다시 입력해주세요')
      } else {
        this.$store.dispatch('search', this.searchData)
      } this.searchData = ''

    }
  } ,
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  created(){
    this.$store.dispatch('savenow')
  } 
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #34383b !important;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.cursor-on {
  cursor : pointer;
}
.searchImg{
  width: 50px;
}
.search-form {
  display: flex;
  align-items: center;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left : 15px;
  margin-bottom : 5px;
}

#search-input {
  margin-right: 5px;
}

.searchImg {
  width: 40px;
  height: 40px;
}

.nav-font {
  font-size : 20px;
  font-weight : bold;
}
.mini_logo {
  height: 100px;
}

.nav-color {
  background-color : white;
}

#app {
  height: 1000px;
  background-color : rgb(255, 217, 102);
}
</style>

