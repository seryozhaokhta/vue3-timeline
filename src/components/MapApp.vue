<!-- src/components/MapApp.vue -->

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-img ref="mapImage" :src="require('@/assets/map/World_map_blank_without_borders.svg')"
                    aspect-ratio="16/9" @load="handleImageLoad" @mousemove="handleMouseMove" @mouseleave="resetTooltip"
                    class="map-image">
                    <!-- Display points on the map -->
                    <template v-for="point in visiblePoints" :key="point.id">
                        <div class="map-point" :style="{ left: point.x + 'px', top: point.y + 'px' }">
                            <span class="map-point-label">{{ point.name }}</span>
                        </div>
                    </template>
                </v-img>
                <!-- Progress bar for time navigation -->
                <v-slider v-model="progress" class="map-progress" @input="updateViewport" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import mapPointsData from '@/data/map-points.json';

export default {
    name: 'MapApp',
    data() {
        return {
            mapPoints: [],
            sortedPoints: [],
            progress: 0,
            viewportScale: 1,
            imageLoaded: false,
        };
    },
    computed: {
        // Compute visible points based on current progress
        visiblePoints() {
            // Return the sortedPoints based on the current progress
            const numPointsToShow = Math.floor(this.sortedPoints.length * (this.progress / 100));
            return this.sortedPoints.slice(0, numPointsToShow);
        },
    },
    methods: {
        handleImageLoad() {
            this.imageLoaded = true;
        },
        handleMouseMove(event) {
            if (!this.imageLoaded) return;
            const x = event.offsetX / this.viewportScale;
            const y = event.offsetY / this.viewportScale;
            console.log(`Mouse coordinates: x=${x}, y=${y}`);
            // Implement tooltip logic if needed
        },
        resetTooltip() {
            // Implement reset tooltip logic if needed
        },
        updateViewport() {
            // Implement update viewport logic based on progress bar
        },
    },
    created() {
        // Load map points data from JSON file
        this.mapPoints = mapPointsData;

        // Sort mapPoints by founded date
        this.sortedPoints = [...this.mapPoints].sort((a, b) => {
            return new Date(a.founded).getTime() - new Date(b.founded).getTime();
        });
    },
};
</script>

<style scoped>
.map-image {
    position: relative;
}

.map-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #ff9800;
    /* Adjust color as needed */
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 1000;
}

.map-point-label {
    position: absolute;
    top: -20px;
    /* Adjust as needed */
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    /* Adjust font size as needed */
    font-weight: normal;
    /* Adjust label color */
}
</style>
