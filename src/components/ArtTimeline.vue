<!-- src/components/ArtTimeline.vue -->

<template>
  <v-container>
    <v-timeline align="start" side="end">
      <v-timeline-item v-for="epoch in timelineData['Western-European-art-periodization']" :key="epoch.id"
        dot-color="grey-darken-1" size="small">
        <div class="d-inline-flex align-items-start flex-column">
          <div class="me-4 mb-2">
            <strong>{{ epoch.epoch }}</strong>
            <div class="text-caption" v-if="epoch.dates">{{ epoch.dates }}</div>
          </div>
          <div>
            <v-btn v-if="epoch.expandable" @click="toggleExpand(epoch)" class="styled-button">
              {{ epoch.expanded ? 'Collapse' : 'Expand' }}
            </v-btn>
            <v-expand-transition>
              <div v-if="epoch.expanded" class="timeline-details">
                <v-list>
                  <v-list-item v-for="subItem in epoch.subItems" :key="subItem.title">
                    <TimelineSubItem :subItem="subItem" />
                  </v-list-item>
                </v-list>
              </div>
            </v-expand-transition>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import { timelineData } from "@/data/timelineData";
import TimelineSubItem from './TimelineSubItem.vue';

export default {
  components: {
    TimelineSubItem
  },
  data() {
    return {
      timelineData,
    };
  },
  methods: {
    toggleExpand(item) {
      item.expanded = !item.expanded;
    }
  }
};
</script>

<style scoped>
.timeline-details {
  padding: 0 10px;
  border-top: 2px solid lightgrey;
  margin-top: 10px;
}

.text-caption {
  color: gray;
}

.v-list-item-content {
  margin-left: 0;
  /* Adjust this value as needed to shift the content */
}

.styled-button {
  background-color: #666666;
  color: white;
  text-transform: none;
  margin: 5px 0;
}

.styled-button:hover {
  background-color: #999999;
}
</style>
