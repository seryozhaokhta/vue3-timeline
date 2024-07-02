// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import ArtistList from "../components/ArtistList.vue";
import NodesApp from "../components/NodesApp.vue";
import MapApp from "../components/MapApp.vue";
import ArtTimeline from "../components/ArtTimeline.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
