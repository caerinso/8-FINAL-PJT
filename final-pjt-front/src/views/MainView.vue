<template>
  <div>
    <h1>Main</h1>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'


export default {
  name: 'MainView',
  components: {
    MovieList
  },
  methods:{
    getMovies(){
      this.$store.dispatch('getMovies')
    }
  },
  created(){
    this.getMovies()
  }
  
}
</script>

<style scoped>

</style>
