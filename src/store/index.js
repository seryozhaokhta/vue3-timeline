// src/store/index.js

import { createStore } from "vuex";
import articlesData from "@/data/articles.json";
import galleryData from "@/data/gallery.json";

const store = createStore({
  state() {
    return {
      artists: [],
      articles: articlesData,
      timelineData: {},
      gallery: galleryData,
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
    setGallery(state, gallery) {
      state.gallery = gallery;
    },
  },
  actions: {
    fetchArtists({ commit }) {
      commit("setArtists", []); // Replace with actual data fetch logic
    },
    fetchArticles({ commit }) {
      commit("setArticles", articlesData); // Using local data
    },
    fetchTimelineData({ commit }) {
      commit("setTimelineData", {}); // Replace with actual data fetch logic
    },
    fetchGallery({ commit }) {
      commit("setGallery", galleryData); // Using local data
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
    getGallery(state) {
      return state.gallery;
    },
  },
});

export default store;
