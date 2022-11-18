<template>
  <div>
    <form @submit.prevent="createComment">
      <label for="comment">한줄평: </label>
      <textarea
        id="content"
        cols="10"
        rows="10"
        v-model.trim="content"
      ></textarea>
      <input type="submit" value="저장" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
export default {
  name: "CommentForm",
  data() {
    return {
      content: null,
    };
  },
  props: {
    movie: Object,
  },
  methods: {
    createComment() {
      const content = this.content;
      if (!content) {
        alert("내용 입력해 주세요");
        return;
      }
      axios({
        method: "post",
        url: `${API_URL}/api/v1/movies/${this.movie.id}/comments/`,
        data: {
          content: content,
          user_id: this.$store.state.user.pk,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "DetailView" });
          this.content = null;
        })
        .catch((err) => {
          console.log(this.$store.state.user);
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
