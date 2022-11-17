<template>
  <div id="app">
    <nav>
      <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Search
      </button>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Movie Search</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="text" v-model="movieTitle" @input="movieSearch" @keyup.enter="movieSearch">
              <button @click="movieSearch">Search</button>
            </div>
            <div class="modal-footer">
              <MovieSearching/>
            </div>
          </div>
        </div>
      </div>

      <router-link to="/">main</router-link> |
      <router-link to="/recommend">recommend</router-link> |
      <span v-if="!isLogin">
        <router-link to="/login">login</router-link>|
        <router-link :to="{ name: 'SignUpView'}">signup</router-link>|
      </span>
      <span v-if="isLogin">
        <button @click="logout">Logout</button> |
        <router-link :to="{name: 'ProfileView'}">Profile</router-link>
      </span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import MovieSearching from '@/components/MovieSearching'

export default {
  data() {
    return {
      movieTitle: null,
    }
  },
  computed: {
    isLogin() {return this.$store.getters.isLogin},
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    movieSearch() {
      this.$store.dispatch('movieSearch', this.movieTitle)
    }
  },
  components: {
    MovieSearching,
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
