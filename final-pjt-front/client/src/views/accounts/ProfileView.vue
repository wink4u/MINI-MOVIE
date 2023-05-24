<template>
  <div>
    <b-container role="group">
      <br>
        <h2>프로필</h2>
        <div class="d-flex justify-content-end">
          <div>
          <b-button v-b-modal.modal-center>프로필 이미지 선택</b-button>
          </div>
          <div>
            <b-modal id="modal-center" centered title="프로필 이미지 고르기" @hide="modalClosed" no-fade class="fullscreen-modal">
              <div>
                <div class="row">
                  <div class="col-md-4 col-6 d-flex align-items-center justify-content-center" v-for="i in 20" :key="i">
                        <img
                          :src="require(`@/assets/profileImg/${i}.png`)"
                          alt=""
                          @mouseover="highlightImage"
                          @mouseout="unhighlightImage"
                          @click="selectImage(i)"
                          style="width: 100%; height: 90%; margin-right: 15%; margin-left: -30%;"
                        >
                  </div>
                </div>
              </div>
            </b-modal>
          </div>
        </div>
        <hr>
        <br>
        <b-row>
            <label class="signup-font" for="input-username">아이디</label>
            <b-form-input id="input-username" placeholder="ID" v-model="username"
            trim aria-describedby=" input-live-feedback"
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
        
        <label class="signup-font mb-3" for="input-sex">성별</label>
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
            <!-- 이미지 선택 -->

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
      sex: '성별을 선택해주세요',
      imgId: null
      
    }
  },
  methods: {
    findUser(){
      this.userData = this.currentUser
      this.username = this.userData.username
    },
    updateProfile() {
      const data = {'email' : this.email,  'region':this.region, 'sex':this.sex, 'user_id': sessionStorage.getItem('userId'), 'username': this.username, 'imgId':this.imgId}
      console.log(data)
      this.$store.dispatch('updateProfile', data)
    },
    highlightImage(event) {
      event.target.style.border = '2px solid red';  // 이미지 강조 효과
      event.target.style.cursor = 'pointer';  // 마우스 포인터 모양 변경
    },
    unhighlightImage(event) {
      event.target.style.border = 'none';  // 이미지 강조 효과 제거
      event.target.style.cursor = 'default';  // 기본 마우스 포인터 모양으로 복원
    },
    selectImage(i) {
      // 선택된 i 값을 저장하거나 활용할 수 있습니다.
      console.log('Selected image:', i);
      this.imgId = i
      // 모달 닫기
      this.$bvModal.hide('modal-center');
    },
    modalClosed() {
      // 모달이 닫힐 때 호출되는 메서드입니다.
      console.log('Modal closed');
    },


  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    userId(){
      return this.$store.getters.userId
    },
    // username(){
    //   return this.$store.getters.username
    // }
    
  },
  created() {
    this.findUser()
  }
}
</script>

<style>
body :scope{
	width:100%;
	/* height:100vh; */
}
.modal{
  box-sizing: padding;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-0%, -60%);
}
.form-select{
  margin-bottom: 30px;
}
.imgmargin{
  margin: 30px 30px 30px 30px;
}

.div-modal {
  width: 100%; 
  height: 100px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  position: relative;
}
</style>