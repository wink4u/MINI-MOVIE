<template>
  <div class = "main">
    <b-container role="group">
      <img src="@/assets/MINI/mini_jeans.png" alt="">
      <h2>로그인</h2>
      <b-row>
        <label for="input-username" class="login-font">ID</label>
        <b-form-input id="input-username" placeholder="ID" v-model="username" 
        :state="nameState" aria-describedby="input-live-feedback" trim @keyup.enter="login"></b-form-input>
      <b-form-invalid-feedback id="input-username-feedback" calss="text-right">알파벳/숫자 5글자 이상</b-form-invalid-feedback>
      </b-row><br>
        
      <b-row>
        <label for="input-password" class="login-font">PASSWORD</label>
        <b-form-input 
        id="input-password" 
        placeholder="PASSWORD" 
        v-model="password" 
        trim
        type="password"
        :state="passwordState" aria-describedby="input-live-feedback" @keyup.enter="login"
        ></b-form-input>
      <b-form-invalid-feedback id="input-password-feedback" calss="text-right">알파벳/숫자 5글자 이상</b-form-invalid-feedback>
      </b-row>
      <div class="login-button ">
        <b-button variant="success" @click="login">로그인</b-button>
        <div>
          <img class="tri-mini" src="@/assets/MINI/minis_back.png" alt="">
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    }
  },
computed : {
  nameState() {
    return this.username.length > 2 ? true : false
  },
  passwordState() {
    return this.password.length > 4 ? true : false
  }
},
methods : {
  login() {
    const username = this.username
    const password = this.password
    const payload = {
      username, password
    }
    this.$store.dispatch("login", payload)
  }
}
}
</script>

<style>
.main {
  margin : auto;
}
.login-form {
  background-color: #faf9f9;
  box-shadow: 20px 20px 10px 0px rgb(243, 242, 242);
}

.login-font {
  font-size : 20px;
  font-weight : bold;
}

.login-button {
  display : flex;
  flex-direction : column;
}

.tri-mini {
  width : 314px;
}
</style>