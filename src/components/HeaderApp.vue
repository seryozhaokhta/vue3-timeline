<!-- src/components/HeaderApp.vue -->

<template>
    <v-app-bar app fixed>
        <v-container class="d-flex align-center justify-space-between no-padding">
            <div class="left-nav">
                <v-toolbar-title @click="goHome" class="clickable-title">
                    <img :src="logo" class="logo" alt="Logo" />
                </v-toolbar-title>
            </div>

            <nav class="d-none d-md-flex central-nav">
                <v-btn text v-for="item in menuItems" :key="item.name" :to="{ name: item.name }">
                    {{ item.label }}
                </v-btn>
            </nav>

            <div class="right-nav d-none d-md-flex">
                <v-btn @click="toggleTheme">
                    <v-img :src="themeIcon" class="theme-icon" contain></v-img>
                </v-btn>
                <v-btn text :to="{ name: 'ProfileApp' }">Profile</v-btn>
            </div>

            <div class="d-flex d-md-none">
                <v-btn icon @click="menuOpen = !menuOpen">
                    <v-icon>{{ menuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
                </v-btn>
            </div>
        </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="menuOpen" temporary right overlay>
        <v-list>
            <v-list-item v-for="item in menuItems" :key="item.name" :to="{ name: item.name }">
                {{ item.label }}
            </v-list-item>
            <v-list-item :to="{ name: 'ProfileApp' }">
                Profile
            </v-list-item>
            <v-list-item @click="toggleTheme">
                <v-img :src="themeIcon" class="theme-icon" contain></v-img>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import { useRouter } from 'vue-router';
import sunIcon from '@/assets/icons/sun.svg';
import moonIcon from '@/assets/icons/moon.svg';
import logoLight from '@/assets/icons/logo-light.svg';
import logoDark from '@/assets/icons/logo-dark.svg';

export default {
    name: 'HeaderApp',
    setup() {
        const router = useRouter();
        const theme = useTheme();
        const menuOpen = ref(false);
        const isDarkTheme = ref(theme.global.current.value === 'dark');

        const themeIcon = computed(() => (isDarkTheme.value ? moonIcon : sunIcon));
        const logo = computed(() => (isDarkTheme.value ? logoDark : logoLight));

        const toggleTheme = () => {
            isDarkTheme.value = !isDarkTheme.value;
            theme.global.name.value = isDarkTheme.value ? 'dark' : 'light';
        };

        const goHome = () => {
            router.push({ name: 'HomePage' });
        };

        const menuItems = [
            { name: 'ArtistList', label: 'Artists List' },
            { name: 'NodesApp', label: 'Nodes' },
            { name: 'MapApp', label: 'Map' },
            { name: 'ArtTimeline', label: 'Timeline' },
            { name: 'ArticleList', label: 'Articles' },
            { name: 'GalleryApp', label: 'Gallery' },
            { name: 'VideoList', label: 'Videos' },
        ];

        return { menuOpen, themeIcon, toggleTheme, goHome, logo, menuItems };
    },
};
</script>

<style scoped>
.v-app-bar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: none !important;
    border-bottom: 1px solid lightgrey;
}

.left-nav {
    display: flex;
    align-items: center;
    margin-right: auto;
}

.central-nav {
    display: flex;
    justify-content: center;
    flex: 1;
}

.right-nav {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.central-nav .v-btn,
.right-nav .v-btn {
    margin-left: 8px;
}

.theme-icon {
    height: 24px;
    width: 24px;
}

.logo {
    cursor: pointer;
    height: 40px;
    width: auto;
    max-width: 40px;
}

.v-container.no-padding {
    padding: 0;
}

@media (max-width: 960px) {
    .v-application--wrap {
        padding-top: 64px;
    }

    .right-nav {
        display: none;
    }
}
</style>

