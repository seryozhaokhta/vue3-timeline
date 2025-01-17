<!-- src/components/PodcastsPage/PodcastPlayer.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="audio-controls">
                    <audio ref="audioPlayer" :src="audioUrl" controls @timeupdate="updateCurrentTime"></audio>
                    <v-btn @click="addBookmark" color="primary">Add Bookmark</v-btn>
                    <v-btn @click="addNote" color="secondary">Add Note</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div ref="visualizer" class="visualizer"></div>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
                <h2>Bookmarks</h2>
                <v-list>
                    <v-list-item v-for="bookmark in podcast.bookmarks" :key="bookmark.time">
                        <v-list-item-content>
                            <v-list-item-title>{{ formatTime(bookmark.time) }}</v-list-item-title>
                            <v-list-item-subtitle>{{ bookmark.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="removeBookmark(bookmark)"><v-icon>mdi-delete</v-icon></v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
                <h2>Notes</h2>
                <v-list>
                    <v-list-item v-for="note in podcast.notes" :key="note.time">
                        <v-list-item-content>
                            <v-list-item-title>{{ formatTime(note.time) }}</v-list-item-title>
                            <v-list-item-subtitle>{{ note.content }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="removeNote(note)"><v-icon>mdi-delete</v-icon></v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
                <v-btn @click="goBack" color="info">Back to List</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import podcastsData from '@/data/podcasts.json';

export default {
    name: 'PodcastPlayer',
    setup() {
        const audioPlayer = ref(null);
        const visualizer = ref(null);
        const currentTime = ref(0);
        const route = useRoute();
        const router = useRouter();
        const podcastId = computed(() => route.params.id);
        const podcast = computed(() => podcastsData.podcasts.find(p => p.id == podcastId.value));
        const audioUrl = computed(() => require(`@/assets/podcasts/${podcast.value.audioUrl.split('/').pop()}`));
        let audioContext = null;
        let analyser = null;

        const updateCurrentTime = () => {
            if (audioPlayer.value) {
                currentTime.value = audioPlayer.value.currentTime;
            }
        };

        const addBookmark = () => {
            const time = currentTime.value;
            const description = prompt('Enter description for the bookmark:');
            if (description) {
                podcast.value.bookmarks.push({ time, description });
            }
        };

        const removeBookmark = (bookmark) => {
            const index = podcast.value.bookmarks.indexOf(bookmark);
            if (index > -1) {
                podcast.value.bookmarks.splice(index, 1);
            }
        };

        const addNote = () => {
            const time = currentTime.value;
            const content = prompt('Enter your note:');
            if (content) {
                podcast.value.notes.push({ time, content });
            }
        };

        const removeNote = (note) => {
            const index = podcast.value.notes.indexOf(note);
            if (index > -1) {
                podcast.value.notes.splice(index, 1);
            }
        };

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        const goBack = () => {
            router.push({ name: 'PodcastList' });
        };

        const initializeVisualizer = () => {
            if (!audioPlayer.value || !visualizer.value) return;

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            visualizer.value.appendChild(canvas);

            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(audioPlayer.value);
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            canvas.width = visualizer.value.clientWidth;
            canvas.height = visualizer.value.clientHeight;

            const draw = () => {
                requestAnimationFrame(draw);

                analyser.getByteFrequencyData(dataArray);

                context.fillStyle = 'rgba(0, 0, 0, 0.5)';
                context.fillRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];
                    context.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                    context.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

                    x += barWidth + 1;
                }
            };

            draw();
        };

        onMounted(() => {
            initializeVisualizer();
        });

        watch(audioUrl, () => {
            if (audioContext) {
                audioContext.close();
                audioContext = null;
            }
            initializeVisualizer();
        });

        return {
            audioPlayer,
            visualizer,
            currentTime,
            podcast,
            audioUrl,
            updateCurrentTime,
            addBookmark,
            removeBookmark,
            addNote,
            removeNote,
            formatTime,
            goBack
        };
    }
};
</script>

<style scoped>
h2 {
    margin-top: 20px;
}

.audio-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.visualizer {
    width: 100%;
    height: 200px;
    background-color: black;
    margin-bottom: 20px;
}
</style>

