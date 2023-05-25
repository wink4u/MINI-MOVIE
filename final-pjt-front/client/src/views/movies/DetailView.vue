<template>
    <div>
      <img class="help-mini" src="@/assets/MINI/help.png" alt="">
      <div class= "row">
        <hr>
        <div v-if="getvideoId" class="col offset-1" >
          <youtube  :video-id=getvideoId :player-vars="playerVars"></youtube>
        </div>
        <div class="col">
          <hr>
          <div class="row">
            <div class="col-4 table-name">영화제목</div>
            <div class="col-8 table-content">{{ title }}</div>
          </div>
          <hr>
          <div class="row">
            <div class="col-4 table-name">줄거리</div>
            <div class="col-8 table-content">{{ overview }}</div>
          </div>
          <hr>
          <div class="row">
            <div class="col-4 table-name">개봉일</div>
            <div class="col-8 table-content">{{ release_date }}</div>
          </div>
          <hr>
          <div class="row">
            <div class="col-4 table-name">평점</div>
            <div class="col-8 table-content">{{ vote_average }}</div>
          </div>
          <hr> 
        </div>
      </div>
      <img class="catch-mini" src="@/assets/MINI/catch.png" alt="">
      <div class="container">
        <h2>댓글</h2>
        <div>
            <form @submit.prevent="createMcomment" class="comment-list-form" style="margin-right: 0px;margin-left: 35px;">
                <label for="comment"></label>
                <input type="text" style="margin-right: 10px;" size="38" placeholder="따끈따끈 리뷰작성" id="comment" v-model="content" required>
                <button type="submit" v-if="isLoggedIn" class="btn-floating pulse" style="width: 40px;"><i class="material-icons" style="font-size: 18px; padding-right: 3px;">작성</i></button>
                <p v-if="!isLoggedIn">로그인할래용?</p>
            </form>
        </div>
        <div class="comment-container">
          <div class="commentstyle container">
            <div>
              <div class="row">
                <div class="col-4">
                    <span class="username">작 성 자</span>
                </div>
                <div class="col-6">
                    <span class="content">리 뷰 내 용</span>
                </div >
                  <div class="col-2">삭제
                </div>
                <div v-if="eachComments">
                  <br>
                    <div v-for="(comment, index) in eachComments" :key="index" >
                        <div class="row">
                          <div class="col-4 profile-link"  @click=profileEach(comment.user.pk)>
                            <a><span class="username">{{ comment.user.username }}</span></a>
                          </div>
                          <div class="col-6">
                            <span class="content">{{ comment.content }}</span>
                          </div>
                          <div class="col-2">
                            <a class="btn btninline" @click="deleteComment(comment)">삭제</a>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        
        </div>
      </div>

      </div>

    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name : 'DetailView',
    props: {
        id : Number,
        title : String,
        release_date : String,
        vote_average : Number,
        overview : String,
    },
    data() {
        return {
            content: '',
            playerVars: {
              autoplay : 1,
              controls : 0,
              showinfo : 0,
            }
        } 
    },
    methods : {
        createMcomment() {
            if (sessionStorage.getItem('key')){
                this.$store.dispatch('createMcomment', { movie_id: this.id, content: this.content })
                this.content = ''
            } else {
                alert('로그인 하세요!')
                this.$router.push('/login')
            }
        },
        deleteComment(comment) {
            const username = sessionStorage.getItem('username')
            if (comment.user.username === username) {
                this.$store.dispatch('deleteMcomment', { movie_id: this.id, id: comment.id })
            } else {
                alert('남의 댓글은 삭제 안대용')
            }
        },
        profileEach(user_id){
            this.$store.dispatch('getuserProfile', user_id)
        },

    },
    computed : {
        getvideoId() {
            return this.$store.state.movies.videoId
        },
        isLoggedIn() {
        return this.$store.getters.isLoggedIn
        },
        eachComments(){
            return this.$store.state.movies.eachComments
        },        
        videoSrc() {
            return `http://www.youtube.com/embed/${this.selectedVideo.id.videoId}`
        },
        videoTitle() {
            return _.unescape(this.selectedVideo.snippet.title)
        },
        isSelectedVideo() {
        if (this.selectedVideo) {
            return true
        }
        else {
            return false
        }
    }
    },
    created() {
        this.$store.dispatch('GetCommentsMovie', this.id)
        // this.$store.dispatch('GetVideo', this.title)
    },
}
</script>

<style>
  .row {
    display : flex;
    align-items : center;
    justify-content : center;
    position: relative;
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 1;
  }
  .table-name {
    background-color : white;
    border-radius: 40%;
    font-weight : bold;
    font-size : 18px;
    width : 20%;
    border : 1px solid black;
  }

  .table-content {
    font-size : 20px;
    font-weight : bold;
  }

  .video-size {
    width : 100%;
    height : 100%;
  }

  #video-container {
  width: 100%; /* div 요소의 가로 너비 */
  height: 0; /* 높이를 0으로 설정하여 비율을 유지합니다 */
  padding-bottom: 56.25%; /* YouTube 동영상의 16:9 비율에 맞게 설정합니다 */
  position: relative; /* 포지션 설정은 필요한 경우에 따라 조정할 수 있습니다 */
  }

  .help-mini {
    width : 100px;
    position : absolute;
    left : 50px;
    z-index: 0;
  }

  .catch-mini {
    width : 300px;
    position : absolute;
    left : 0px;
    top : 450px;
    z-index: 0;
  }

  .username {
  font-weight: bold;
  }

  .profile-link {
    cursor: pointer;
  }
</style>