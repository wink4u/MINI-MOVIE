<template>
  <div>
    <div class="container">
      <br>
      <hr>
      <div class="d-flex justify-content-start">
        <h4 style = "margin-right:20px;">작성자</h4>
        <!-- <img v-if="eachUser.imgId" :src="require(`@/assets/profileImg/${eachUser.imgId}.png`)"
        alt="" style="width: 50%; height: 50%; margin-top: 100px; margin-right: 30px;">
        <img v-if="!eachUser.imgId" src="@/assets/profileImg/21.png" alt=""
        style="width: 40%; height: 40%; margin-top: 50px; margin-right: 30px;"> -->
      </div>
      <div class="table-content">
        <h4 @click=profileEach(Boardlist[board_id].user.pk) class="profile-link" style = "margin-left : 10px;">{{ Boardlist[board_id].user.username }}</h4>
      </div>
      <div class="d-flex justify-content-start">
        <h4 style = "margin-right:20px;">제목</h4>
      </div>
      <div class="table-content" style="width: 100%;">
        <h4 style = "margin-left : 10px;">{{ Boardlist[board_id].title }}</h4>
      </div>
      <div class="d-flex justify-content-start">
        <h4 style = "margin-right:20px;">내용</h4>
      </div>
      <div class="table-content">
        <div style="width:100%;">
          <h4 style = "text-align: left; margin-left: 10px;">{{ Boardlist[board_id].content }}</h4>
        </div>
      </div>
      <div class="d-flex justify-content-start">
        <h4 style = "margin-right:20px; white-space : pre;">작성시간</h4>
      </div>
      <div class="table-content">
        <h4 style = "margin-left : 10px;">{{ Boardlist[board_id].created_at.slice(0,10) }}</h4>
      </div>
      <br>
      <a class="btn " @click="deleteBoard()">DELETE</a>
    </div> 
    <div>
      <form @submit.prevent="onSubmit" class="comment-list-form" style="margin-right: 0px;margin-left: 35px;">
        <label for="comment"></label>
        <input type="text" style="margin-right: 10px;" size="38" placeholder="여러분의 소중한 댓글을 입력해주세요" id="comment" v-model="content" required>
        <button type="submit" class="btn-floating pulse" style="width: 40px;"><i class="material-icons" style="font-size: 18px; padding-right: 3px;">작성</i></button>
      </form>
    </div>
    <div class="comment-container">
      <div class="commentstyle container">
        <div class="row tableboard">
          <div class="col-3">
            <span class="username" >작 성 자</span>
          </div>
          <div class="col-4">
            <span class="content">댓 글 내 용</span>
          </div>
          <div class="col-4">
            <span class="content">작 성 시 간</span>
          </div>
          <div class="col-1">
            <span class="content">삭 제</span>
          </div>
        </div>
      
        <div v-for="(comment, index) in Comments" :key="index">
          <div class="row">
            <div class="col-3 profile-link" @click=profileEach(comment.write_comment_user.pk)>
              <span class="username" >{{ comment.write_comment_user.username }}</span>
            </div>
            <div class="col-4">
              <span class="content">{{ comment.content }}</span>
            </div>
            <div class="col-4">
              <span class="content">{{ comment.created_at.slice(0,10) }}</span>
            </div>
            <div class="col-1">
              <a class="btn btninline" @click="deleteComment(comment)">삭제</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'BoardDetail',
  props: {
    board_id : Number,
    real_id: Number
  },
  data() {
    return {
      content: ''
    }
  },

  computed: {
    ...mapState({ Boardlist: state => state.board.freeBoard }),
    ...mapState({ allComments: state => state.board.allComments }),
    Comments() {
      return this.$store.state.board.Comments
    },
    eachUser() {
      return this.$store.getters.eachUser;
    }
  },
  methods: {
    ...mapActions(['createComment', 'GetComments']),
    onSubmit() {
      // alert("댓글 고마워요 꼬마아가씨.")
      
      this.createComment({ board_id: this.real_id, content: this.content })
      this.content = ''
    },
    deleteComment(comment){
      const username = sessionStorage.getItem('username')
  
      if (comment.write_comment_user.username === username) {
        this.$store.dispatch('deleteComment', { board_id: this.real_id, id: comment.id })
      } else {
        alert('남의 댓글은 삭제 안대용')
      }
    },
    profileEach(user_id){
      this.$store.dispatch('getuserProfile', user_id)
    },
    deleteBoard() {
      console.log(this.board_id)
      console.log(this.real_id)
      this.$store.dispatch('deleteBoard', this.real_id)
    }
  },

  mounted() {
    this.GetComments(this.real_id)
  },
  created() {
  }
}
</script>

<style>
  .comment-list-form {
    border: 1px solid #939883;
    margin: 1rem;
    padding: 1rem;
  }
  .comment-container {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 40px;
}

.commentstyle {
  /* 댓글 스타일링을 원하는 대로 설정하세요 */
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
}

.username {
  text-align: left;
}

.content {
  text-align: right;
}
  /* .link{
  position: relative;
  color : black;
  text-decoration: none;
  z-index: 1;
  padding: 0 .2rem;
  transition: color .2s;
  } */

  /* .link::after{
    content:'';
    z-index: -1;
    position: absolute;
    inset: 99% 0 0 0;
    background: #e92964;
    transition: inset .2s;
  } */

  .pulse:hover{
    color: white;
  }

  .link:hover::after{
    inset: 0 0 0 0;
  }
  .btninline{
    display: inline-flexbox;
    width:  70px;
  }
  .tableboard{
    font-weight: bolder
  }
  .post {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 20px;
    }
    
    .post-title {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .post-content {
      font-size: 20px;
      margin-bottom: 10px;
    }
    
    .post-meta {
      font-size: 20px;
      color: #888;
    }
    
    .post-meta span {
      margin-right: 10px;
    }

    .table-content {
      background-color : white;
      display : flex;
      justify-content : start;
      border : 1px solid black;
    }
</style>