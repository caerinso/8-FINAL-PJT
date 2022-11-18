<template>
  <div>
    <h1>CommentsList</h1>
    <button @click="getMovieDetail">click</button>
    <CommentListItem
      v-for="comment in movie_comment"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
import CommentListItem from "@/components/CommentListItem";
export default {
  components: { CommentListItem },
  name: "CommentList",
  data() {
    return {
      movie: null,
      movie_comment: null,
    };
  },
  methods: {
    getMovieDetail() {
      axios({
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}/`,
      }).then((res) => {
        this.movie = res.data;
        this.movie_comment = this.movie.comment_set;
      });
    },
  },
};
</script>

<style></style>
