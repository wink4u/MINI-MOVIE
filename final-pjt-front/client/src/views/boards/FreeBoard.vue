<template>
  <div class="container">
    <table class="freetable highlight">
        <thead>
          <tr>
              <th>Username</th>
              <th>TITLE</th>
              <th>HEALING</th>
          </tr>
        </thead>

        <tbody v-if="boards">
          <tr v-for="(board, index) in boards" :key="index" @click="detailBoard(index)">
            <td>{{ board.user.username }}</td>
            <td>{{ board.title.slice(0, 10) }}</td>
            <td>{{ board.content.slice(0, 30) }}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn waves-effect waves-light" type="submit" @click="createBoard">작성</button>
  </div>
</template>

<script>

export default {
    name: 'FreeBoard',
    methods: {
        createBoard(){
          if (sessionStorage.getItem('key')){
            this.$router.push({name:'boardcreate'})
          } else {
            alert('로그인 하세요')
            this.$router.push('/login')
          }
        },
        getBoard() {
            this.$store.dispatch('getBoard')
        },
        detailBoard(board_id) {
          
          this.$router.push({name:'BoardDetail', params:{'board_id':board_id}})
        },
        allcomments(){
        this.$store.dispatch('allComments')
        },  
    },
    computed: {
      boards() {
        return this.$store.state.board.freeBoard
      },
      
    },
    created() {
        this.getBoard()
        this.allcomments()
    }
}
</script>

<style>
.freetable {
    margin-top: 30px;
}
</style>