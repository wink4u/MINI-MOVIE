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
    </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

const URL = "https://www.googleapis.com/youtube/v3/search"
const API_KEY = "AIzaSyAWNUiFp58G_MdghygPStTt15VpIEtjhyM"

export default {
    name : 'DetailView',
    props: ['movie_id'],
    data() {
        return {
            movie : [],
            videos : [],
            selectedViedo: {},

        } 
    },
    methods : {

    },
    computed : {
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
    }
}
</script>

<style>

</style>