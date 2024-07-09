<!-- src/components/VideosPage/VideoList.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Videos</h1>
                <v-list>
                    <v-list-item v-for="video in videos" :key="video.id" @click="goToVideo(video.id)"
                        class="video-item">
                        <v-list-item-avatar>
                            <v-img :src="video.thumbnail" class="preview-image"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ video.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ video.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <div v-if="error" class="error-message">
                    Failed to load videos. Please try again later.
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'VideoList',
    setup() {
        const store = useStore();
        const router = useRouter();
        const videos = computed(() => store.getters.getVideos);
        const error = ref(null);

        const goToVideo = (id) => {
            if (id) {
                router.push({ name: 'VideoDetail', params: { id } });
            } else {
                console.error("Video ID is missing");
            }
        };

        return {
            videos,
            goToVideo,
            error
        };
    },
    async created() {
        try {
            await this.$store.dispatch('fetchVideos');
        } catch (err) {
            console.error("Failed to fetch videos:", err);
            this.error = err;
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

.video-item {
    cursor: pointer;
    transition: border 0.3s;
    padding: 10px;
}

.preview-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-right: 16px;
}

.tag {
    margin: 4px;
}

@media (max-width: 600px) {
    .preview-image {
        width: 60px;
        height: 60px;
    }
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 20px;
}
</style>

