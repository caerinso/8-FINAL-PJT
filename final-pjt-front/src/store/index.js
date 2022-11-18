import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";
import createPersistedState from "vuex-persistedstate";

const API_URL = "http://127.0.0.1:8000";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    movies: [],
    similar: [],
    searchedMovies: [],
  },
  getters: {
    isLogin: (state) => (state.token ? true : false),
    authHead: (state) => ({ Authorization: `Token ${state.token}` }),
    user: (state) => state.user,
    isAuthor: (state) => state.user?.username === state.article.username,
    movies: (state) => state.movies,
    similar: (state) => state.similar,
    searchedMovies: (state) => state.searchedMovies,
  },
  mutations: {
    SET_TOKEN: (state, token) => (state.token = token),
    SET_USER: (state, user) => (state.user = user),
    GET_MOVIES: (state, movies) => (state.movies = movies),
    GET_SIMILAR_MOVIE(state, moviedata) {
      for (const movie of state.movies) {
        if (movie.id === moviedata.id) continue;
        let count = 0;
        for (const genre of movie.genres) {
          if (moviedata.genres.includes(genre)) {
            count++;
          }
        }
        if (count > 2) {
          state.similar.push(movie);
        }
      }
    },
    MOVIE_SEARCH(state, movieTitle) {
      state.searchedMovies = [];
      for (const movie in state.movies) {
        if (movie.title.includes(movieTitle)) {
          state.searchedMovies.push(movie);
        }
      }
    },
  },
  actions: {
    signUp({ commit }, payload) {
      axios({
        method: "post",
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        },
      })
        .then((res) => {
          commit("SAVE_TOKEN", res.data.key);
          router.push({ name: "LoginView" });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert(JSON.stringify(err.response.data));
          }
        });
    },
    logIn({ commit, dispatch }, { username, password }) {
      const payload = { username, password };
      axios({
        url: `${API_URL}/accounts/login/`,
        method: "post",
        data: payload,
      })
        .then((res) => {
          commit("SET_TOKEN", res.data.key);
          dispatch("getUserInfo");
          router.push({ name: "MainView" });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert(JSON.stringify(err.response.data));
          }
        });
    },
    logout({ commit, getters }) {
      axios({
        url: `${API_URL}/accounts/logout/`,
        method: "post",
        headers: getters.authHead,
      })
        .then(commit("SET_TOKEN", null), commit("SET_USER", null))
        .catch((err) => console.log(err));
    },
    getUserInfo({ commit, getters }) {
      axios({
        url: `${API_URL}/accounts/user/`,
        method: "get",
        headers: getters.authHead,
      })
        .then((res) => {
          commit("SET_USER", res.data);
        })
        .catch((err) => console.log(err));
    },
    getMovies({ commit }) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies`,
      })
        .then((res) => commit("GET_MOVIES", res.data))
        .catch((err) => console.log(err));
    },
    getSimilarMovie({ commit }, moviedata) {
      commit("GET_SIMILAR_MOVIE", moviedata);
    },
    pwChange({ getters }, newPassword) {
      axios({
        method: "post",
        url: `${API_URL}/accounts/password/change/`,
        headers: getters.authHead,
        data: {
          new_password1: newPassword,
          new_password2: newPassword,
        },
      })
        .then(() => {
          this.dispatch("getUserInfo");
          alert("비밀번호가 변경되었습니다");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    movieSearch({ commit }, movieTitle) {
      commit("MOVIE_SEARCH", movieTitle);
    },
  },
  modules: {},
});
