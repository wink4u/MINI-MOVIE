<template>
    <div class = "container">
        <div class="mt-3" v-if="isSelectedVideo">
            <div class="ratio ratio-16x9">
            <iframe :src="videoSrc" frameborder="0"></iframe>
            </div>
            <div>
            <h4>{{videoTitle}}</h4>
        </div>
        </div>
        <h1>댓글</h1>
        <div>
            <form @submit.prevent="createMcomment" class="comment-list-form" style="margin-right: 0px;margin-left: 35px;">
                <label for="comment"></label>
                <input type="text" style="margin-right: 10px;" size="38" placeholder="따끈따끈 리뷰작성" id="comment" v-model="content" required>
                <button type="submit" class="btn-floating pulse" style="width: 40px;"><i class="material-icons" style="font-size: 18px; padding-right: 3px;">작성</i></button>
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
                            <span class="username">{{ comment.user.username }}</span>
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
import axios from 'axios'


const URL = "https://www.googleapis.com/youtube/v3/search"
const API_KEY = "AIzaSyAWNUiFp58G_MdghygPStTt15VpIEtjhyM"

export default {
    name : 'DetailView',
    props: {
        movie_id : Number
    },
    data() {
        return {
            movie : [],
            videos : [],
            selectedViedo: {},
            content: ''
        } 
    },
    methods : {
        createMcomment() {
            this.$store.dispatch('createMcomment', { movie_id: this.movie_id, content: this.content })
            this.content = ''
        },
        deleteComment(comment) {
            const username = sessionStorage.getItem('username')
            if (comment.user.username === username) {
                this.$store.dispatch('deleteMcomment', { movie_id: this.movie_id, id: comment.id })
            } else {
                alert('남의 댓글은 삭제 안대용')
            }
        }

    },
    computed : {
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
        this.$store.dispatch('GetComments', this.movie_id)
        axios({
                method: 'get',
                url: `http://127.0.0.1:8000/movies/${this.movie_id}/`,
            })
            .then((res) => {
                console.log(res.data)
                this.movie = res.data
            })
            .catch((err)=> {
                console.log(err)
        }),

        axios.get(URL, {
            params: {
                key : API_KEY,
                type : 'video',
                part : 'snippet',
                q : `${this.movie.title} 예고편`
            }
        })
        .then((response) => {
            console.log(response)
        })
    },
}
</script>

<style>

</style>