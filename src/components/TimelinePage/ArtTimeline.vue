<!-- src/components/ArtTimeline.vue -->

<template>
  <v-container>
    <v-timeline align="start" side="end" dense>
      <v-timeline-item v-for="epoch in timelineData['Western-European-art-periodization']" :key="epoch.id"
        dot-color="grey-darken-1" size="x-small">
        <div class="epoch-container">
          <div class="epoch-title">
            <strong>{{ epoch.epoch }}</strong>
            <div class="text-caption" v-if="epoch.dates">{{ epoch.dates }}</div>
          </div>
          <div class="expand-button-container">
            <v-btn v-if="epoch.expandable" @click="epoch.expanded = !epoch.expanded" class="styled-button">
              <v-icon>
                <img :src="require('@/assets/expand_more.svg')" alt="Expand Icon" />
              </v-icon>
              {{ epoch.expanded ? 'Collapse' : 'Expand' }}
            </v-btn>
            <div class="vertical-line" v-if="epoch.expandable && epoch.expanded"></div>
          </div>
          <v-expand-transition>
            <div v-if="epoch.expanded" class="timeline-details">
              <v-list>
                <v-list-item v-for="subItem in epoch.subItems" :key="subItem.title">
                  <TimelineSubItem v-model="subItem.expanded" :subItem="subItem" />
                </v-list-item>
              </v-list>
            </div>
          </v-expand-transition>
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
  padding: 10px 0;
  border-left: 2px solid lightgrey;
  margin-left: 10px;
  height: auto;
}

.text-caption {
  color: gray;
}

.v-list-item-content {
  margin-left: 0;
}

.styled-button {
  background-color: #666666;
  color: white;
  text-transform: none;
  margin: 5px 0;
  display: flex;
  align-items: center;
}

.styled-button v-icon {
  margin-right: 8px;
}

.styled-button:hover {
  background-color: #999999;
}
</style>
