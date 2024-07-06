// src/store/index.js

import { createStore } from "vuex";
import articlesData from "@/data/articles.json";

const store = createStore({
  state() {
    return {
      artists: [],
      articles: articlesData,
      timelineData: {},
    };
  },
  mutations: {
    setArtists(state, artists) {
      state.artists = artists;
    },
    setArticles(state, articles) {
      state.articles = articles;
    },
    setTimelineData(state, timelineData) {
      state.timelineData = timelineData;
    },
  },
  actions: {
    fetchArtists({ commit }) {
      commit("setArtists", []); // Пример коммита, замените на реальный запрос
    },
    fetchArticles({ commit }) {
      commit("setArticles", articlesData); // Используем локальные данные
    },
    fetchTimelineData({ commit }) {
      commit("setTimelineData", {}); // Пример коммита, замените на реальный запрос
    },
  },
  getters: {
    getArtists(state) {
      return state.artists;
    },
    getArticles(state) {
      return state.articles;
    },
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.id === id);
    },
    getTimelineData(state) {
      return state.timelineData;
    },
  },
});

export default store;
