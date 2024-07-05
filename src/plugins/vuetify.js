// src/plugins/vuetify.js

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { themes } from "./theme";

export default createVuetify({
  components,
  theme: {
    defaultTheme: "light",
    themes: themes,
  },
});
