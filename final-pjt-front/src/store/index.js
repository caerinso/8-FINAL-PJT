import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[
    createPersistedState()
  ],
  state: {
    movies:[],
    token: null,
    user: null,
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
    GET_MOVIES: (state, movies) => state.movies = movies , 
    SAVE_TOKEN(state, token) {
      state.token = token
      // router.push({ name: 'ArticleView' })
    },
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
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch(err => console.log(err))
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch(err=>console.log(err))
    },
    getSimilarMovie({commit}, moviedata) {
      commit('GET_SIMILAR_MOVIE', moviedata)
    }
  },
  modules: {
  }
})
