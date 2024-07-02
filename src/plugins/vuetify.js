// src/plugins/vuetify.js

   import { createVuetify } from "vuetify";
   import * as components from "vuetify/components";
   import { themes } from "./theme"; // Импортируй темы

   export default createVuetify({
     components,
     theme: {
       defaultTheme: "light", // Начальная тема - светлая
       themes: themes, // Используй импортированные темы
     },
   });