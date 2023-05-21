<template>
  <div>
    <div>
      <h2><span>제목: </span>{{ Boardlist[board_id].title }}</h2>
      <h3><span>내용: </span>{{ Boardlist[board_id].content }}</h3>
      <h3><span>작성자: <a @click=profileEach(Boardlist[board_id].user.pk)>{{ Boardlist[board_id].user.username }}</a></span></h3>
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
        <div class="row">
          <div class="col-5">
            <span class="username" >작 성 자</span>
          </div>
          <div class="col-5">
            <span class="content">댓 글 내 용</span>
          </div>
        </div>
      
        <div v-for="(comment, index) in Comments" :key="index" class="commentstyle container">
          <div class="row">
            <div class="col-4">
              <span class="username" >{{ comment.write_comment_user.username }}</span>
            </div>
            <div class="col-7">
              <span class="content">{{ comment.content }}</span>
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
    board_id : Number
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
  },
  methods: {
    ...mapActions(['createComment', 'GetComments']),
    onSubmit() {
      // alert("댓글 고마워요 꼬마아가씨.")
      this.createComment({ board_id: this.board_id, content: this.content })
      this.content = ''
    },
    deleteComment(comment){
      const username = sessionStorage.getItem('username')
  
      if (comment.write_comment_user.username === username) {
        this.$store.dispatch('deleteComment', { board_id: this.board_id, id: comment.id })
      } else {
        alert('남의 댓글은 삭제 안대용')
      }
    },
    profileEach(user_id){
            this.$store.dispatch('getuserProfile', user_id)
        },
  },

  mounted() {
    this.GetComments(this.board_id)
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
</style>