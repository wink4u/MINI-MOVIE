<template>
    <b-container role="group">
        <h2>회원가입</h2><hr>

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
            <label class="signup-font" for="input-password1">비밀번호</label>
            <b-form-input id="input-password1" placeholder="PASSWORD" v-model="password1"
            trim type="password" :state="passwordState1" aria-describedby=" input-live-feedback"></b-form-input>
            <b-form-invalid-feedback id="input-password1-feedback" class=" check-fonttext-right">
                비밀번호 8글자 이상
            </b-form-invalid-feedback>
        </b-row>

        <b-row>
            <label class="signup-font" for="input-password2">비밀번호 재확인</label>
            <b-form-input id="input-password2" placeholder="PASSWORD확인" v-model="password2"
            trim type="password" :state="passwordState2" aria-describedby=" input-live-feedback" @keyup.enter="signup"></b-form-input>
            <b-form-invalid-feedback id="input-password2-feedback" class="check-font text-right ">
                비밀번호 설정과 동일한 값 입력
            </b-form-invalid-feedback>
        </b-row>
        <div class="signup-button">
            <b-button variant="success" @click="signup">회원가입</b-button>
            <div>
                <img src="@/assets/MINI/minions_full.png" alt="">
            </div>
        </div>
    
    </b-container>
</template>
    
<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data() {
        return {
            email: '',
            username: '',
            password1: '',
            password2: '',
            // email: null,
        }
    },
    computed : {
        nameState() {
            return this.username.length > 2 ? true : false
        },
        passwordState1() {
            return this.password1.length > 4 ? true : false
        },
        passwordState2() {
            return this.password2.length > 4 ? true : false
        }
    },
    methods: {
        signup() {
            if (!this.$store.getters.isLoggedIn){
                axios({
                    method: 'post',
                    url: "http://127.0.0.1:8000/auth/signup/",
                    data: {
                        // email : this.email,
                        username: this.username,
                        password1: this.password1,
                        password2: this.password2,
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    this.$router.push({name:'login'})
                })
                .catch((err)=> {
                    console.log(err)
                })
            } else {
                this.$router.push({name:'home'})
            }
        }
    }
}
</script>

<style>
    .signup-font {
        font-size : 20px;
        font-weight : bold;
        color : rgb(59, 58, 58);
    }

    .check-font {
        font-size : 13px;
    }

    .signup-button {
        display : flex;
        flex-direction : column;
    }
</style>