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
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
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