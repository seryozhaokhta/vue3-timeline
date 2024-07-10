<!-- src/components/AboutApp.vue -->

<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <h2 class="text-center">About the Art Theory App</h2>
                <p class="text-center">
                    Discover the world of art through timelines, maps, and interactive content.
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="mb-4">
                    <v-img src="https://example.com/image1.jpg" alt="Image description"></v-img>
                    <v-card-text>
                        <h3 class="text-center">Interactive Timelines</h3>
                        <p>Track the progression of art movements through our detailed timelines.</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="mb-4">
                    <v-video :src="videoSrc1" controls></v-video>
                    <v-card-text>
                        <h3 class="text-center">Historical Maps</h3>
                        <p>Explore important historical locations related to art.</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-card class="mb-4">
                    <v-img src="https://example.com/image2.jpg" alt="Image description"></v-img>
                    <v-card-text>
                        <h3 class="text-center">Artists</h3>
                        <p>Discover artists, their works, and their contributions to art history.</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mb-4">
                    <v-video :src="videoSrc2" controls></v-video>
                    <v-card-text>
                        <h3 class="text-center">Art Movements</h3>
                        <p>Learn about different art movements and their impact on art history.</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mb-4">
                    <v-img src="https://example.com/image3.jpg" alt="Image description"></v-img>
                    <v-card-text>
                        <h3 class="text-center">Curated Articles</h3>
                        <p>Read articles on various aspects of art theory.</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'AboutApp',
    data() {
        return {
            videoSrc1: 'https://example.com/video1.mp4',
            videoSrc2: 'https://example.com/video2.mp4'
        };
    }
};
</script>

<style scoped>
.text-center {
    text-align: center;
}

.mb-4 {
    margin-bottom: 16px;
}

v-video {
    width: 100%;
    height: auto;
}
</style>
