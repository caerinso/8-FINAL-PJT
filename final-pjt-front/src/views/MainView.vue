<template>
  <div>
    <h2 v-if="isLogin">{{user.username}}님 환영합니다</h2>
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
  computed: {
    isLogin() {return this.$store.getters.isLogin},
    user() {return this.$store.getters.user}
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
