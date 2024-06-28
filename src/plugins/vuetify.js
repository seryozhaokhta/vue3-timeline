// src/plugins/vuetify.js

import "vuetify/styles";
import { createVuetify } from "vuetify";
import {
  VApp,
  VContainer,
  VTimeline,
  VTimelineItem,
  VBtn,
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VExpandTransition,
} from "vuetify/components";

export default createVuetify({
  components: {
    VApp,
    VContainer,
    VTimeline,
    VTimelineItem,
    VBtn,
    VList,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VExpandTransition,
  },
});
