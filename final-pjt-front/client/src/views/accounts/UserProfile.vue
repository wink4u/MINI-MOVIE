<template>

  <div class="user-profile">
    <h2>{{ eachUser.username }}</h2>
    <p>성별: {{ eachUser.sex ? eachUser.sex: '추가하세용' }}</p>
    <ul>
      <li>Email: {{ eachUser.email ? eachUser.email: '추가하세용'}}</li>
      <li>Location: {{ eachUser.region ? eachUser.region:'추가하세용' }}</li>
      <button @click="follow">{{ followState.follow }}</button>
      <li>팔로잉수: {{ followState.following_count }}</li>
      <li>팔로워수: {{ followState.count }}</li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    user_id: Number
  },
  computed: {
    eachUser() {
      return this.$store.state.accounts.eachUser;
    },
    followState() {
      return this.$store.getters.followState.data
    }
  },
  methods: {
    follow(){
      console.log('id')
      console.log(this.user_id)
      this.$store.dispatch('follow', this.user_id)
    }
  }
  // methods: {
  //   UserProfile() {
  //     this.$store.dispatch('getuserProfile', this.user_id);
  //   },
  // },
  // created() {
  //   this.UserProfile();
  // }
}
</script>

<style>

</style>