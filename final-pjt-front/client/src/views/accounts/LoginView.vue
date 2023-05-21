<template>
  <div>
    <b-container role="group" class="p-5 login-form">
      <h1>로그인</h1>
      <b-row>
        <label for="input-username">ID</label>
        <b-form-input id="input-username" placeholder="ID" v-model="username" 
        :state="nameState" aria-describedby="input-live-feedback" trim></b-form-input>
      <b-form-invalid-feedback id="input-username-feedback" calss="text-right">알파벳/숫자 3글자 이상</b-form-invalid-feedback>
      </b-row><br>
        
      <b-row>
        <label for="input-password">PASSWORD</label>
        <b-form-input 
        id="input-password" 
        placeholder="PASSWORD" 
        v-model="password" 
        trim
        type="password"
        :state="passwordState" aria-describedby="input-live-feedback"
        ></b-form-input>
      <b-form-invalid-feedback id="input-password-feedback" calss="text-right">알파벳/숫자 5글자 이상</b-form-invalid-feedback>
      </b-row>
      <b-button variant="success" @click="login">로그인</b-button>
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
.login-form {
  background-color: #faf9f9;
  box-shadow: 20px 20px 10px 0px rgb(243, 242, 242);
}
</style>