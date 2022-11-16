import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies:[]
  },
  getters: {
  },
  mutations: {
    GET_MOVIES: (state, movies) => state.movies = movies
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
    }
  },
  modules: {
  }
})
