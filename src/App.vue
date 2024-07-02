<!-- src/App.vue -->

<template>
  <v-app>
    <HeaderApp />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';

export default {
  components: {
    HeaderApp,
  },
};
</script>
