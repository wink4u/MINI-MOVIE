<template>
  <div>
    <!-- <h1>{{userData}}</h1>
    <form @submit.prevent="updateProfile">
      아이디<p>{{ userData.username}}</p>
      이메일<input type="text" v-model="email">
      지역<input type="text" v-model="region">
      성별<input type="text" v-model="sex">
      <button type="submit">asdsad</button>
    </form> -->
    <b-container role="group">
        
      <h2>프로필 </h2><hr>
        <br>
        <b-row>
            <label class="signup-font" for="input-username">아이디</label>
            <b-form-input id="input-username" placeholder="ID" v-model="username"
            trim :state="nameState" aria-describedby=" input-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-username-feedback" class="check-font text-right">
                알파벳/숫자 6글자 이상
            </b-form-invalid-feedback>
        </b-row>
        <b-row>
            <label class="signup-font" for="input-E-mail">이메일</label>
            <b-form-input id="input-E-mail" placeholder="E-mail" v-model="email"
            trim type="text" aria-describedby=" input-live-feedback"></b-form-input>
        </b-row>
        
        <label class="signup-font" for="input-sex">성별</label>
        <select class="form-select"  aria-label="Default select example" v-model="sex">
          <option selected>-----------------------</option>
          <option value="1">남</option>
          <option value="2">여</option>
        </select>
        
        <b-row>
            <label class="signup-font" for="input-sex">지역</label>
            <b-form-input id="input-sex" placeholder="REGION" v-model="region"
            trim type="text" aria-describedby=" input-live-feedback"></b-form-input>
        </b-row>

        <div class="signup-button">
            <b-button variant="success" @click="updateProfile">프로필정보변경</b-button>
            <div>
                <img src="@/assets/MINI/minions_full.png" alt="">
            </div>
        </div>
    
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      userData: '',
      email: '',
      region: '',
      sex: '성별을 선택해주세요'
    }
  },
  methods: {
    findUser(){
      this.userData = this.currentUser
      this.username = this.userData.username
    },
    updateProfile() {
      const data = {'email' : this.email,  'region':this.region, 'sex':this.sex, 'user_id': sessionStorage.getItem('userId'), 'username': this.username}
      console.log(data)
      this.$store.dispatch('updateProfile', data)
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    userId(){
      return this.$store.getters.userId
    },
    username(){
      return this.$store.getters.username
    }
    
  },
  created() {
    this.findUser()
  }
}
</script>

<style>
.form-select{
  margin-bottom: 30px;
}
</style>