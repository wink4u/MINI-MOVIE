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
          <tr v-for="(board, index) in boards" :key="index">
            <td>{{ board.user.username }}</td>
            <td>{{ board.title }}</td>
            <td>{{ board.content }}</td>
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
            this.$router.push({name:'boardcreate'})
        },
        getBoard() {
            this.$store.dispatch('getBoard')
        }
    },
    computed: {
      boards() {
        return this.$store.state.board.freeBoard
      }
    },
    created() {
        this.getBoard()
    }
}
</script>

<style>
.freetable {
    margin-top: 30px;
}
</style>