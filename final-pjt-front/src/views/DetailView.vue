<template>
  <div>
    <img :src="moviePoster">
    <iframe :src="movieYoutube" frameborder="0"></iframe>
    <p>{{ movie?.id }}</p>
    <p>{{ movie?.genres }}</p>
    <p>{{ movie?.vote_average }}</p>
    <p>{{ movie?.title }}</p>
    <p>{{ movie?.overview }}</p>
    <p>{{ movie?.actors_namelist }}</p>
    <!-- <p v-for="actor in movie?.actors" :key="actor.id" @click='actorInfo(actor)'>{{ actor }}</p> -->
    <p>{{ movie?.release_date }}</p>

    <div>
      <h1>댓글쓰기</h1>
      <form @submit.prevent="createComment">
        <label for="comment">한줄평: </label>
        <textarea  id="content" cols="10" rows="10"
        v-model.trim="content" :key="kk"></textarea>
        <input type="submit" value="저장">
      </form>
      <h1>댓글list</h1>
      <CommentList/>
    </div>

    <div class='card' v-for="similarMovie in similarMovies" :key="similarMovie.id">
      <img :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+similarMovie.poster_path">
      <p>{{ similarMovie.title }}</p>
      <p>{{ similarMovie.release_date }}</p>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios'
import CommentList from '@/components/CommentList'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'DetailView',
  components: {
    CommentList
  },
  data() {
    return {
      movie: null,
      actor: null,
      content: null,
    }
  },
  computed: {
    moviePoster() {
      return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.movie?.poster_path}`
    },
    movieYoutube() {
      return `http://www.youtube.com/embed/${this.movie?.youtube_key}`
    },
    similarMovies() {
      return this.$store.getters.similar
    },
  },
  methods: {
    getMovieDetail() {
      axios({
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}/`
      })
        .then(res => {
          this.movie = res.data
          this.$store.dispatch('getSimilarMovie', this.movie)
        })
    },
    actorInfo(actorId) {
      window.location.href = `https://www.themoviedb.org/person/${actorId}?language=ko`
    },
     createComment(){
      const content = this.content 
      if (!content) {
        alert('내용 입력해 주세요')
        return
      }
      axios({
        method:'post',
        url: `${API_URL}/api/v1/movies/${this.movie.id}/comments/`,
        data:{
          content: content,
        },
        headers: this.$store.getters.authHead
      })
      .then((res)=>{
        console.log(res)
        this.$router.push({name: 'DetailView' })

      })
      .catch((err)=>{
        console.log(err)
      })
    },
    // getMovieComments(){
    //   axios({
    //     method:'get',
    //     url:`${API_URL}/api/v1/comment//`
    //   })
    //   .then(res =>{

    //   })
    // },
  },
  created() {
    this.getMovieDetail()
  }
}
</script>

<style>
</style>