<template>
  <div>
    <h1>CommentsList</h1>
    <CommentListItem
    v-for="content in contents"
    :key="content"
    :content="content"
    />
  </div>
</template>

<script>
import CommentListItem from '@/CommentListItem';
export default {
  components: { CommentListItem },
  name:"CommentList",
  data() {
    return
  },
  methods:{
    axios
  }
}
</script>

<style>

</style>