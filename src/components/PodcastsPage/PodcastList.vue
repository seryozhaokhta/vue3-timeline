<!-- src/components/PodcastsPage/PodcastList.vue -->
 
<template>
    <v-container>
        <h1>Podcasts</h1>
        <v-row>
            <v-col cols="12">
                <v-list>
                    <v-list-item v-for="podcast in podcasts" :key="podcast.id" @click="selectPodcast(podcast)">
                        <v-list-item-content>
                            <v-list-item-title>{{ podcast.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import podcastsData from '@/data/podcasts.json';
import { useRouter } from 'vue-router';

export default {
    name: 'PodcastList',
    setup() {
        const podcasts = ref([]);
        const router = useRouter();

        onMounted(() => {
            podcasts.value = podcastsData.podcasts;
        });

        const selectPodcast = (podcast) => {
            router.push({ name: 'PodcastPlayer', params: { id: podcast.id } });
        };

        return {
            podcasts,
            selectPodcast
        };
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
