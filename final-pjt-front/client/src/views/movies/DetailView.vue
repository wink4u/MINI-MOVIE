<template>
    <div class = "container">
        <div v-if="getvideoId">
            <p>{{ getvideoId }}</p>
            <iframe :src="'https://www.youtube.com/embed/' + getvideoId"></iframe>
        </div>
        <h1>{{ title }}</h1>
        <h1>댓글</h1>
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
                <div class="row">
                <div class="col-4">
                    <span class="username">작 성 자</span>
                </div>
                <div class="col-7">
                    <span class="content">리 뷰 내 용</span>
                </div>
                <div class="col-1">
                </div>
                </div>
                <div v-if="eachComments">
                    <div v-for="(comment, index) in eachComments" :key="index" class="commentstyle container">
                        <div class="row">
                            <div class="col-4">
                            <a @click=profileEach(comment.user.pk)><span class="username">{{ comment.user.username }}</span></a>
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

    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name : 'DetailView',
    props: {
        id : Number,
        title : String
    },
    data() {
        return {
            content: '',
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
        this.$store.dispatch('GetVideo', this.title)
    },
}
</script>

<style>

</style>