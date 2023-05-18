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

        <tbody>
          <tr v-for="(board, index) in boards" :key="index">
            <!-- <td>{{ board.user.username }}</td> -->
            <td>{{ board.title }}</td>
            <td>{{ board.content }}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn waves-effect waves-light" type="submit" @click="createBoard">작성</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      ...mapGetters(['boards'])
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