<template>
  <div>
    <p>{{ movie.id }}</p>
    <p>{{ movie.title }}</p>
    <p>{{ movie.overview }}</p>
    <p>{{ movie.actors}}</p>
    <p>{{ movie.release_date }}</p>
    <p>{{ movie.actors_namelist }}</p>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'DetailView',
  data() {
    return {
      movie: null,
      actor: null,
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}/`
      })
        .then(res => {
          this.movie = res.data
          console.log(this.movie.actors)
        })
    }
  },
  created() {
    this.getMovieDetail()
  }
}
</script>

<style>
</style>