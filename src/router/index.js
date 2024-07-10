// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage/HomePage.vue";
import ArtistList from "../components/ArtistsPage/ArtistList.vue";
import NodesApp from "../components/NodesPage/NodesApp.vue";
import MapApp from "../components/MapPage/MapApp.vue";
import ArtTimeline from "../components/TimelinePage/ArtTimeline.vue";
import ArticleList from "../components/ArticlesPage/ArticleList.vue";
import ArticleDetail from "../components/ArticlesPage/ArticleDetail.vue";
import GalleryApp from "../components/GalleryPage/GalleryApp.vue";
import ProfileApp from "../components/ProfilePage/ProfileApp.vue";
import VideoList from "../components/VideosPage/VideoList.vue";
import VideoDetail from "../components/VideosPage/VideoDetail.vue";

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
  {
    path: "/videos",
    name: "VideoList",
    component: VideoList,
  },
  {
    path: "/videos/:id",
    name: "VideoDetail",
    component: VideoDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
