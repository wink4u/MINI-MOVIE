<template>
  <div>다른사람프로피ㄹ
    <h1>{{ user_id }}</h1>
    <h1>{{ eachUser.username }}</h1>
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
    UserProfile() {
      this.$store.dispatch('getuserProfile', this.user_id);
    },
  },
  created() {
    this.UserProfile();
  }
}
</script>

<style>

</style>