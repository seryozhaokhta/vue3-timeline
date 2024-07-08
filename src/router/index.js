// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ArtistList from "../components/ArtistList.vue";
import NodesApp from "../components/NodesPage/NodesApp.vue";
import MapApp from "../components/MapApp.vue";
import ArtTimeline from "../components/ArtTimeline.vue";
import ArticleList from "../components/ArticleList.vue";
import ArticleDetail from "../components/ArticleDetail.vue";
import GalleryApp from "../components/GalleryApp.vue";
import ProfileApp from "../components/ProfileApp.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/artists",
    name: "ArtistList",
    component: ArtistList,
  },
  {
    path: "/nodes",
    name: "NodesApp",
    component: NodesApp,
  },
  {
    path: "/map",
    name: "MapApp",
    component: MapApp,
  },
  {
    path: "/timeline",
    name: "ArtTimeline",
    component: ArtTimeline,
  },
  {
    path: "/articles",
    name: "ArticleList",
    component: ArticleList,
  },
  {
    path: "/articles/:id",
    name: "ArticleDetail",
    component: ArticleDetail,
    props: true,
  },
  {
    path: "/gallery",
    name: "GalleryApp",
    component: GalleryApp,
  },
  {
    path: "/profile",
    name: "ProfileApp",
    component: ProfileApp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
