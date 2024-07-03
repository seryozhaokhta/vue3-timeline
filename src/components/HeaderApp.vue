<!-- src/components/HeaderApp.vue -->

<template>
    <v-app-bar app fixed>
        <v-toolbar-title>Art Theory App</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Desktop and Tablet Buttons -->
        <div class="d-none d-md-flex">
            <v-btn text :to="{ name: 'HomePage' }">Home</v-btn>
            <v-btn text :to="{ name: 'ArtistList' }">Artists List</v-btn>
            <v-btn text :to="{ name: 'NodesApp' }">Nodes</v-btn>
            <v-btn text :to="{ name: 'MapApp' }">Map</v-btn>
            <v-btn text :to="{ name: 'ArtTimeline' }">Timeline</v-btn>
            <v-btn @click="toggleTheme">
                {{ $vuetify.theme.global.name === 'dark' ? '🌙' : '☀️' }}
            </v-btn>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="d-flex d-md-none">
            <v-btn icon @click="menuOpen = !menuOpen">
                <v-icon>{{ menuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </v-btn>
        </div>
    </v-app-bar>

    <!-- Mobile Menu -->
    <v-navigation-drawer v-model="menuOpen" temporary right overlay>
        <v-list>
            <v-list-item :to="{ name: 'HomePage' }">Home</v-list-item>
            <v-list-item :to="{ name: 'ArtistList' }">Artists List</v-list-item>
            <v-list-item :to="{ name: 'NodesApp' }">Nodes</v-list-item>
            <v-list-item :to="{ name: 'MapApp' }">Map</v-list-item>
            <v-list-item :to="{ name: 'ArtTimeline' }">Timeline</v-list-item>
            <v-list-item @click="toggleTheme">
                {{ $vuetify.theme.global.name === 'dark' ? '🌙' : '☀️' }}
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'HeaderApp',
    data() {
        return {
            menuOpen: false
        };
    },
    methods: {
        toggleTheme() {
            this.$vuetify.theme.global.name = this.$vuetify.theme.global.name === 'dark' ? 'light' : 'dark';
        },
    },
};
</script>

<style scoped>
/* Стили для кнопок и меню */
.v-btn {
    margin-left: 10px;
}

/* Дополнительные стили для адаптивности и внешнего вида могут быть добавлены здесь */
.v-app-bar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.v-navigation-drawer {
    z-index: 2000;
}

/* Обеспечиваем, чтобы контент не перекрывался хедером на мобильных устройствах */
@media (max-width: 960px) {
    .v-application--wrap {
        padding-top: 64px;
    }
}

/* Стили для видимости иконки меню */
.v-icon {
    font-size: 24px;
}
</style>
