<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">SweetM</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/home" class="nav-link active" aria-current="page">홈</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link active" aria-current="page">로그인</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link active cursor-on" aria-current="page" @click="logout">로그아웃</a>
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link active" aria-current="page">회원가입</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
    <nav>
      <router-link to="/normal">일반</router-link> |
      <router-link to="/concept">특성</router-link>
    </nav>
    <router-view/>
</div>
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {
      checkOut: false
    }
  },
  methods: {
    getMovies() {
      for (let i = 1; i < 4; i++) {
        this.$store.dispatch('getMovies', i)
      }
    },
    logout() {
      console.log('1')
      this.$store.dispatch('logout')
    },
    saveValue() {
      localStorage.setItem('checkOut', JSON.stringify(true));
    },
    loadValue() {
      const value = localStorage.getItem('checkOut'); 
      this.checkOut = value ? JSON.parse(value) : false; 
    },
  } ,
  created() {
    this.loadValue()
    if (this.checkOut === false) {
      this.getMovies()
    }
    this.saveValue()
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.cursor-on {
  cursor : pointer;
}
</style>

