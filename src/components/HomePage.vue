<!-- src/components/HomePage.vue -->

<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <h1 class="main-title">Welcome to the Art Theory App</h1>
                <p class="intro-text">This app is designed to help you study art theory.</p>
                <image-slider></image-slider>
                <p class="additional-info">
                    Explore various art periods, artists, and theories that shaped the history of art.
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ImageSlider from './ImageSlider.vue';

export default {
    name: 'HomePage',
    components: {
        ImageSlider
    }
};
</script>

<style scoped>
.main-title {
    text-align: center;
    margin-top: 20px;
    font-size: 2.5em;
    font-weight: bold;
}

.intro-text {
    text-align: center;
    font-size: 1.2em;
    margin-bottom: 20px;
}

.additional-info {
    text-align: center;
    font-size: 1em;
    margin-top: 20px;
}

/* Добавление отступа сверху, чтобы контент не накладывался на хедер */
@media (max-width: 960px) {

    .main-title,
    .intro-text,
    .additional-info {
        padding-top: 64px;
    }
}
</style>
