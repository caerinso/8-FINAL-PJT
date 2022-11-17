<template>
  <div class="card" @click='goDetail'>
    <img :src="moviePoster">
    <h5>{{movie.id}}</h5>
    <p>{{movie.title}}</p>
  </div>
</template>

<script>
export default {
  name:'MovieListItem',
  props:{
    movie: Object
  },
  computed: {
    moviePoster() {
      return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.movie.poster_path}`
    },
  },
   methods: {
    goDetail() {
      this.$router.push({name: 'DetailView', params: {id: this.movie.id}})
    }
  }
}
</script>

<style>

</style>