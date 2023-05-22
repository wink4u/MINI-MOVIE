<template>

  <div class="user-profile">
    <h2>{{ eachUser.username }}</h2>
    <p>성별: {{ eachUser.sex ? eachUser.sex: '추가하세용' }}</p>
    <ul>
      <li>Email: {{ eachUser.email ? eachUser.email: '추가하세용'}}</li>
      <li>Location: {{ eachUser.region ? eachUser.region:'추가하세용' }}</li>
      <button @click="follow">팔로우해버리깃</button>
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
    }
  },
  methods: {
    // follow()
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