<template>
  <div>
    <img :src="moviePoster" />
    <iframe :src="movieYoutube" frameborder="0"></iframe>
    <p>{{ movie?.id }}</p>
    <p>{{ movie?.genres }}</p>
    <p>{{ movie?.vote_average }}</p>
    <p>{{ movie?.title }}</p>
    <p>{{ movie?.overview }}</p>
    <p>{{ movie?.actors_namelist }}</p>
    <p>{{ movie?.genres_list }}</p>
    <!-- <p v-for="actor in movie?.actors" :key="actor.id" @click='actorInfo(actor)'>{{ actor }}</p> -->
    <p>{{ movie?.release_date }}</p>

    <h1>좋아요 기능</h1>
    <button @click="clickLikes"></button>

    <div>
      <h1>댓글쓰기</h1>
      <CommentForm :movie="movie" />
      <h1>댓글list</h1>
      <CommentList />
    </div>

    <div
      class="card"
      v-for="similarMovie in similarMovies"
      :key="similarMovie.id"
    >
      <img
        :src="
          'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
          similarMovie.poster_path
        "
      />
      <p>{{ similarMovie.title }}</p>
      <p>{{ similarMovie.release_date }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
const API_URL = "http://127.0.0.1:8000";
export default {
  name: "DetailView",
  components: {
    CommentList,
    CommentForm,
  },
  data() {
    return {
      movie: null,
      actor: null,
      content: null,
    };
  },
  computed: {
    moviePoster() {
      return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.movie?.poster_path}`;
    },
    movieYoutube() {
      return `http://www.youtube.com/embed/${this.movie?.youtube_key}`;
    },
    similarMovies() {
      return this.$store.getters.similar;
    },
  },
  methods: {
    getMovieDetail() {
      axios({
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}/`,
      }).then((res) => {
        this.movie = res.data;
        this.movie_comment = this.movie.comment_set;
        this.$store.dispatch("getSimilarMovie", this.movie);
      });
    },
    actorInfo(actorId) {
      window.location.href = `https://www.themoviedb.org/person/${actorId}?language=ko`;
    },
  },
  created() {
    this.getMovieDetail();
  },
};
</script>

<style></style>
