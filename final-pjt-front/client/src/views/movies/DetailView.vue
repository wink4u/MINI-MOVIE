<template>
    <div class = "container">
        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'DetailView',
    props: ['id'],
    data() {
        return {

        } 
    },
    methods : {

    },
    created() {
        axios({
                method: 'get',
                url: `http://127.0.0.1:8000/movies/${this.id}/`,
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err)=> {
                console.log(err)
            })
    }
}
</script>

<style>

</style>