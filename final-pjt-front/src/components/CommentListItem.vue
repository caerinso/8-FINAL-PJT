<template>
  <div>
    <p>{{comment.content}}</p>
    <p>{{comment.created_at}}</p>
  </div>
</template>

<script>
export default {
  name:'CommentListItem',
  props:{
    comment:object,
  }
}
</script>

<style>

</style>