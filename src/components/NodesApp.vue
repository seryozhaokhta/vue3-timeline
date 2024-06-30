<!-- src/components/NodesApp.vue -->
 
<template>
    <div class="nodes-app">
        <v-btn color="primary" @click="toggleNodes">Toggle Nodes</v-btn>
        <div class="nodes-container">
            <div class="epochs-container">
                <div v-for="epoch in epochNodes" :key="epoch.id" class="node epoch-node" :style="epoch.style">
                    <span class="node-label">{{ epoch.label }}</span>
                </div>
            </div>
            <div class="artists-container">
                <div v-for="artist in artistNodes" :key="artist.id" class="node artist-node" :style="artist.style">
                    <span class="node-label">{{ artist.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import artistsData from '@/data/artists-by-specialization-and-period-english.json';
import { timelineData } from '@/data/timelineData.js';

export default {
    name: 'NodesApp',
    setup() {
        const isOrganized = ref(false);

        const epochs = timelineData['Western-European-art-periodization'].map((epoch) => ({
            ...epoch,
            type: 'epoch',
        }));

        // Обработка данных из artistsData
        const artists = Object.entries(artistsData).flatMap(([, specializations]) =>
            Object.entries(specializations).flatMap(([, artists]) =>
                artists.map((artist) => ({
                    ...artist,
                    type: 'artist',
                }))
            )
        );

        const epochNodes = computed(() => {
            return epochs.map((epoch) => ({
                ...epoch,
                id: epoch.epoch,
                label: epoch.epoch,
                style: {
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    position: 'absolute',
                    backgroundColor: '#3498db', // Синий цвет для эпох
                    color: '#fff',
                    padding: '15px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60px',
                    height: '60px',
                    fontSize: '12px',
                    transition: 'all 0.5s ease',
                    transform: isOrganized.value ? 'translate(-50%, -50%)' : 'none',
                },
            }));
        });

        const artistNodes = computed(() => {
            return artists.map((artist) => ({
                ...artist,
                id: artist.name,
                label: artist.name,
                style: {
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    position: 'absolute',
                    backgroundColor: '#9b59b6', // Фиолетовый цвет для деятелей искусства
                    color: '#fff',
                    padding: '15px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60px',
                    height: '60px',
                    fontSize: '12px',
                    transition: 'all 0.5s ease',
                    transform: isOrganized.value ? 'translate(-50%, -50%)' : 'none',
                },
            }));
        });

        function toggleNodes() {
            isOrganized.value = !isOrganized.value;
        }

        return {
            epochNodes,
            artistNodes,
            toggleNodes,
        };
    },
};
</script>

<style scoped>
.nodes-app {
    padding: 20px;
}

.nodes-container {
    position: relative;
    width: 100%;
    height: 500px;
    border: 1px solid #ddd;
    overflow: hidden;
    display: flex;
}

.epochs-container,
.artists-container {
    position: relative;
    flex: 1;
    height: 100%;
}

.node {
    min-width: 20px;
    min-height: 20px;
}

.node-label {
    text-align: center;
    white-space: nowrap;
}
</style>