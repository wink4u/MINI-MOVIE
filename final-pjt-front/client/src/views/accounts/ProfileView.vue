<template>
  <div>
    <h1>{{userData}}</h1>
    <form @submit.prevent="updateProfile">
      아이디<p>{{ userData.username}}</p>
      이메일<input type="text" v-model="email">
      지역<input type="text" v-model="region">
      성별<input type="text" v-model="sex">
      <button type="submit">asdsad</button>
    </form>
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
      username: ''
    }
  },
  methods: {
    findUser(){
      this.userData = this.currentUser
      this.username = this.userData.username
    },
    updateProfile() {
      const data = {'email' : this.email,  'region':this.region, 'sex':this.sex, 'user_id': this.userData.id, 'username': this.username}
      console.log(data)
      this.$store.dispatch('updateProfile', data)
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    }
  },
  created() {
    this.findUser()
  }
}
</script>

<style>

</style>