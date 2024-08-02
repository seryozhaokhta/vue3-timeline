<!-- src/components/VideosPage/VideoDetail.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <iframe :src="videoUrl" width="100%" height="480" frameborder="0" allowfullscreen class="mb-4"></iframe>
                <h1>{{ video.title }}</h1>
                <p class="text-caption mb-2">{{ formattedDate }}</p>
                <div class="description" v-html="video.description"></div>
                <v-btn @click="goBack" class="mt-4">Back to Videos</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'VideoDetail',
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const videoId = route.params.id;
        const video = computed(() => store.getters.getVideoById(videoId));

        const videoUrl = computed(() => `https://www.youtube.com/embed/${video.value.id}`);

        const formattedDate = computed(() => {
            const date = new Date(video.value.publishedAt);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        });

        const goBack = () => {
            router.push({ name: 'VideoList' });
        };

        return {
            video,
            videoUrl,
            goBack,
            formattedDate
        };
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

.text-caption {
    text-align: center;
    color: gray;
}

.description {
    white-space: pre-line;
    text-align: justify;
    margin-bottom: 10px;
    overflow-y: auto;
    padding-right: 10px;
}

.v-btn {
    display: block;
    margin: 0 auto;
}
</style>

