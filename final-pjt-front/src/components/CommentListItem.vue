<template>
  <div>
    <p>내용 : {{ comment.content }}</p>
    <p>글쓴이 : {{ comment.user_id }}</p>

    <button
      v-if="comment.user_id === this.$store.state.user.pk"
      @click="deleteComment"
    >
      DELETE
    </button>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
export default {
  name: "CommentListItem",
  props: {
    comment: Object,
  },
  methods: {
    deleteComment() {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      }).then((res) => {
        console.log(res);
        this.$router.push({ name: "DetailView" });
      });
    },
  },
};
</script>

<style></style>
