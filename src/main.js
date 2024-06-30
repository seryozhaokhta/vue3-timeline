// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/styles";
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);

app.use(vuetify);

app.mount("#app");

// Инициализируем AOS после того, как приложение будет смонтировано
app.AOS = new AOS.init(); // Инициализируем AOS как свойство Vue приложения для SSR
