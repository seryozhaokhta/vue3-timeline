// src/store/index.js

import { createStore } from "vuex";
import articlesData from "@/data/articles.json";
import galleryData from "@/data/gallery.json";
import { fetchVideos } from "@/utils/youtube";

const store = createStore({
  state() {
    return {
      artists: [],
      articles: articlesData,
      timelineData: {},
      gallery: galleryData,
      videos: [],
      user: null,
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
    setVideos(state, videos) {
      state.videos = videos;
    },
    setUser(state, user) {
      state.user = user;
    },
    updateUserProfile(state, { photo, firstName, lastName }) {
      if (state.user) {
        if (photo !== undefined) state.user.photo = photo;
        if (firstName !== undefined) state.user.firstName = firstName;
        if (lastName !== undefined) state.user.lastName = lastName;
      }
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
    async fetchVideos({ commit }) {
      const videos = await fetchVideos();
      commit("setVideos", videos);
    },
    async login({ commit }, { email, password }) {
      // Replace with actual login logic
      if (email === "admin" && password === "43A1@3#as22V4$E2") {
        const user = { email, firstName: "Admin", lastName: "User" }; // Mock user
        commit("setUser", user);
        return user;
      } else {
        throw new Error("Invalid credentials");
      }
    },
    async register({ commit }, { email }) {
      // Replace with actual registration logic
      const user = { email }; // Mock user
      commit("setUser", user);
      return user;
    },
    logout({ commit }) {
      commit("setUser", null);
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
    getVideos(state) {
      return state.videos;
    },
    getVideoById: (state) => (id) => {
      return state.videos.find((video) => video.id === id);
    },
    getUser(state) {
      return state.user;
    },
  },
});

export default store;
