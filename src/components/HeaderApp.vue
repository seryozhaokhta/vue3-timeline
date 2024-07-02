<!-- src/components/HeaderApp.vue -->

<template>
    <v-app-bar app>
        <v-toolbar-title>Art Theory App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text :to="{ name: 'HomePage' }">Home</v-btn>
        <v-btn text :to="{ name: 'ArtistList' }">Artists List</v-btn>
        <v-btn text :to="{ name: 'NodesApp' }">Nodes</v-btn>
        <v-btn text :to="{ name: 'MapApp' }">Map</v-btn>
        <v-btn text :to="{ name: 'ArtTimeline' }">Timeline</v-btn>
        <v-btn @click="toggleTheme">
            {{ $vuetify.theme.global.name === 'light' ? '🌙' : '☀️' }}
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'HeaderApp',
    methods: {
        toggleTheme() {
            this.$vuetify.theme.global.name = this.$vuetify.theme.global.name === 'light' ? 'dark' : 'light';
        },
    },
};
</script>

<style scoped>
.v-btn {
    margin-left: 10px;
}
</style>


