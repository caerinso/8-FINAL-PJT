import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    movies:[],
    similar: [],
  },
  getters: {
    isLogin: (state) => state.token? true: false,
    authHead: (state) => ({Authorization: `Token ${state.token}`}),
    user: (state) => state.user,
    isAuthor: (state) => state.user?.username === state.article.username,
    movies: (state) => state.movies,
    similar: (state) => state.similar,
  },
  mutations: {
    GET_MOVIES: (state, movies) => state.movies = movies,
    GET_SIMILAR_MOVIE(state, moviedata) {
      for (const movie of state.movies) {
        if (movie.id === moviedata.id) continue
        let count = 0
        for (const genre of movie.genres) {
          if (moviedata.genres.includes(genre)) {
            count++
          }
        }
        if (count > 2) {
          state.similar.push(movie)
        }
      }
    }
  },
  actions: {
    getMovies({commit}){
      axios({
        method:'get',
        url: `${API_URL}/api/v1/movies`
      })
      .then(res =>
        commit('GET_MOVIES', res.data))
      .catch(err => console.log(err))
    },
    getSimilarMovie({commit}, moviedata) {
      commit('GET_SIMILAR_MOVIE', moviedata)
    }
  },
  modules: {
  }
})
