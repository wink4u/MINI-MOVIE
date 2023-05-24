<template>
<div class="user-profile pb-5 flex-column align-items-center">
  <div class="d-flex align-items-start justify-content-start">
    <img
      v-if="eachUser.imgId"
      :src="require(`@/assets/profileImg/${eachUser.imgId}.png`)"
      alt=""
      style="width: 70%; height: 50%; margin-top: 50px; margin-right: 30px;"
    >
    <img
      v-if="!eachUser.imgId"
      src="@/assets/profileImg/21.png"
      alt=""
      style="width: 40%; height: 40%; margin-top: 50px; margin-right: 30px;"
    >
    <div class="d-flex flex-column align-items-center pt-5 px-5">
      <h2>{{ eachUser.username }}의 프로필</h2>
      <p>성별: {{ eachUser.sex == 1 ? '남자' : eachUser.sex == 2 ? '여자' : '추가하세용' }}</p>
      <ul>
        <li>Email: {{ eachUser.email ? eachUser.email : '추가하세용' }}</li>
        <li>Location: {{ eachUser.region ? eachUser.region : '추가하세용' }}</li>
        <b-button @click="follow">{{ followState.follow }}</b-button>
        <span >
          <p>팔로잉수: {{ followState.following_count }}  /  팔로워수: {{ followState.count }}</p>
        </span>
      </ul>
    </div>
  </div>
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
      return this.$store.getters.eachUser;
    },
    followState() {
      return this.$store.getters.followState.data
    },
    userId(){
      return this.$store.getters.userId
    },

  },
  methods: {
    follow(){
      console.log(this.user_id)
      this.$store.dispatch('follow', this.user_id)
    },
    UserProfile() {
      this.$store.dispatch('getuserProfile', this.user_id);
    },
    findfollow(){
      this.$store.dispatch('findfollow', this.user_id)
    }
  },

  created() {
    this.findfollow()
    this.$store.dispatch('GETUSERPROFILE', this.user_id)
  }
}
</script>

<style>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
}

.user-profile h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.user-profile p,
.user-profile li {
  font-size: 16px;
  margin-bottom: 10px;
}

.user-profile ul {
  list-style-type: none;
  padding: 0;
}

.user-profile b-button {
  margin-top: 10px;
}

.user-profile h1 {
  font-size: 20px;
  font-weight: bold;
}
</style>