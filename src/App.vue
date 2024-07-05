<!-- src/App.vue -->

<template>
  <v-app>
    <HeaderApp />
    <v-main class="main-content">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <FooterApp />
  </v-app>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';
import FooterApp from './components/FooterApp.vue';

export default {
  components: {
    HeaderApp,
    FooterApp,
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.v-application--wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>

