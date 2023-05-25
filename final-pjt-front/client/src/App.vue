<template>
  <div id="app" class="main-color">
    <div>
      <div class="navbar navbar-expand-lg bg-body-tertiary nav-color">
      <div class="container-fluid">
        <img class="mini_logo animate__animated animate__wobble" src="@/assets/MINI/glass_mini2.png" alt="mini_img" style="margin-right : 30px; margin-left : 10px;">
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
            <li class="nav-item nav-font" id="right" v-if="isLoggedIn">
              <router-link to="/profile" class="nav-link active" aria-current="page">프로필</router-link>
            </li>
            <li class="nav-item nav-font d-md-none" id="right" v-if="isLoggedIn">
              <a class="nav-link active cursor-on signout " aria-current="page" @click="signOut" >회원탈퇴</a>
            </li>
            <li class="nav-item nav-font">
              <router-link to="/games/worldCup" class="nav-link active" aria-current="page">게임</router-link>
            </li>
            
          </ul>
          <div class="collapse navbar-collapse searchmovie d-md-none" id="navbarNav">
            <div class="search-input-wrapper" style="margin-right : 20px;">
              <input type="text" id="search-input" v-model="searchData" placeholder="검색어를 입력하세요" @keyup.enter="search">
              <img src="./assets/search.png" class="searchImg" @click="search">
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <router-view/>
  <!-- <footer v-if="this.$route.name !== 'signup' || this.$route.name !== 'home'">
    <div class="row">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">
      <img src="./assets/MINI/minis_back.png" class="col-1 animate__animated animate__swing">

    </div>
  </footer> -->
</div>
</template>
<script>

import axios from 'axios';
  window.addEventListener('scroll', function() {
    var scrolledHeight = window.pageYOffset || document.documentElement.scrollTop;
    var body = document.querySelector('body');
    
    if (scrolledHeight > 0) {
      body.style.backgroundColor = 'rgb(255, 217, 102)';
    } else {
      body.style.backgroundColor = 'transparent';
    }
  });

export default {
  name: 'APP',
  data() {
    return {
      checkOut: false,
      searchData: '',
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
        // alert('다시 입력해주세요')
      } else {
        this.$store.dispatch('search', this.searchData)
      } this.searchData = ''
    },

    signOut() {
      const API_URL = 'http://127.0.0.1:8000'
      axios({
        url: `${API_URL}/accounts/delete/`,
        method: 'delete',
        headers: {
          'Authorization': `Token ${sessionStorage.getItem('key')}`
        },
      })
      .then(() => {
        this.$store.commit('LOGOUT')
      })
    },
  },
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
body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgb(255, 217, 102);
    background-attachment: fixed;
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
  cursor: pointer;
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
  height: 100%;
  background-color : rgb(255, 217, 102);
  font-family: 'Jua', sans-serif;
}
.test{
  position: absolute;
  bottom: 0;
}
.searchmovie{
  position: absolute;
  right: 0
}
footer {
  position: sticky;
  bottom: 0;
}

</style>

