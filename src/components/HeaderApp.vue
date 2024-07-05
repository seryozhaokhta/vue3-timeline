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
            <v-btn text :to="{ name: 'ArticleList' }">Articles</v-btn>
            <v-btn @click="toggleTheme">
                <v-img :src="themeIcon" class="theme-icon" contain></v-img>
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
            <v-list-item :to="{ name: 'ArticleList' }">Articles</v-list-item>
            <v-list-item @click="toggleTheme">
                <v-img :src="themeIcon" class="theme-icon" contain></v-img>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import sunIcon from '@/assets/icons/sun.svg';
import moonIcon from '@/assets/icons/moon.svg';

export default {
    name: 'HeaderApp',
    setup() {
        const theme = useTheme();
        const menuOpen = ref(false);
        const isDarkTheme = ref(theme.global.current.value === 'dark');

        const sunIconImage = new Image();
        const moonIconImage = new Image();
        sunIconImage.src = sunIcon;
        moonIconImage.src = moonIcon;

        const themeIcon = computed(() => {
            return isDarkTheme.value ? moonIcon : sunIcon;
        });

        const toggleTheme = () => {
            isDarkTheme.value = !isDarkTheme.value;
            theme.global.name.value = isDarkTheme.value ? 'dark' : 'light';
        };

        onMounted(() => {
            // Preload images when the component mounts
            sunIconImage.onload = () => console.log('Sun icon preloaded');
            moonIconImage.onload = () => console.log('Moon icon preloaded');
        });

        return {
            menuOpen,
            themeIcon,
            toggleTheme,
        };
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
    box-shadow: none !important;
    border-bottom: 1px solid lightgrey;
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

/* Стили для темы иконок */
.theme-icon {
    height: 24px;
    width: 24px;
}

/* Стили для видимости иконки меню */
.v-icon {
    font-size: 24px;
}
</style>
