<!-- src/App.vue -->

  <template>
    <v-app>
      <v-main>
        <v-btn @click="toggleTheme">
          {{ $vuetify.theme.global.name === 'light' ? '🌙' : '☀️' }}
        </v-btn>
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
      </v-main>
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
    methods: {
      toggleTheme() {
        this.$vuetify.theme.global.name = this.$vuetify.theme.global.name === 'light' ? 'dark' : 'light';
             },
         },
     };
     </script>