<template>
  <div>
    <router-link :to="{name: 'DetailView', params:{id:movie.id}}"><h5>{{movie.id}}</h5></router-link>
    <p>{{movie.title}}</p>
  </div>
</template>

<script>
export default {
  name:'MovieListItem',
  props:{
    movie: Object
  }
}
</script>

<style>

</style>