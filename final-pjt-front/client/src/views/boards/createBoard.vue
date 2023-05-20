<template>
    <div class="container">
    <h1>자유게시판</h1>
    <div v-if="freeBoard">
        <ul class="collection" v-for="(board, index) in freeBoard.slice(0,5)" :key="index">
            <li class="collection-item">
                <p>{{ board.title }}</p>
            </li>
    
        </ul>
    </div>
    <div v-else>
        <p>당신의 마음을 달래줄 소식이 없네요</p>
    </div>

    <form @submit.prevent="createB">
        <div class="input-field">
            <input type="text" id="title" name="title" v-model="title" required>
            <label for="title">제목</label>
        </div>
        <div class="input-field">
            <textarea class="materialize-textarea" id="content" name="content" v-model="content" required></textarea>
            <label for="content">내용</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit">작성</button>
    </form>
    </div>
</template>

<script>
import M from 'materialize-css'

export default {
    name: 'createBoard',
    data() {
        return {
            title: '',
            content: ''
        }
    },
    mounted () {
    M.AutoInit()
    },

    methods: {
        createB() {
            const board = {title: this.title, content: this.content}
            console.log(board)
            this.$store.dispatch('createB', board)
        }

    },
    computed: {
        freeBoard() {
            return this.$store.state.board.freeBoard
    }
    }
}
</script>

<style>

</style>