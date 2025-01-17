// src/main.js

import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

import "vuetify/styles";
import AOS from "aos";
import "aos/dist/aos.css";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");

app.AOS = new AOS.init();
