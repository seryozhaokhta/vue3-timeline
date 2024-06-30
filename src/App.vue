<!-- src/App.vue -->

<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="4">
          <ArtTimeline />
        </v-col>
        <v-col cols="8">
          <ArtistList />
          <NodesApp />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ArtistList from './components/ArtistList.vue';
import ArtTimeline from './components/ArtTimeline.vue';
import NodesApp from './components/NodesApp.vue';

export default {
  components: {
    ArtistList,
    ArtTimeline,
    NodesApp,
  },
};
</script>