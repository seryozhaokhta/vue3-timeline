<!-- src/components/MapApp.vue -->

<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="map-container" @wheel="handleWheel" @mousedown="startPan" @mousemove="panMap"
                    @mouseup="endPan" @mouseleave="endPan">
                    <v-img ref="mapImage" :src="require('@/assets/map/World_map_blank_without_borders.svg')"
                        aspect-ratio="16/9" @load="handleImageLoad" @mousemove="handleMouseMove"
                        @mouseleave="resetTooltip" class="map-image" :style="mapStyle">
                        <!-- Display points on the map -->
                        <template v-for="point in visiblePoints" :key="point.id">
                            <div class="map-point"
                                :style="{ left: point.x + 'px', top: point.y + 'px', transform: `translate(-50%, -50%) scale(${1 / zoomScale})` }">
                                <span class="map-point-label">{{ point.name }}</span>
                            </div>
                        </template>
                    </v-img>
                </div>
                <!-- Toolbar for map controls -->
                <div class="toolbar">
                    <v-btn icon @click="zoomIn">
                        <v-icon>mdi-magnify-plus</v-icon>
                    </v-btn>
                    <v-btn icon @click="zoomOut">
                        <v-icon>mdi-magnify-minus</v-icon>
                    </v-btn>
                    <v-btn icon @click="moveMap('up')">
                        <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn icon @click="moveMap('down')">
                        <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                    <v-btn icon @click="moveMap('left')">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn icon @click="moveMap('right')">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
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
            zoomScale: 1,
            zoomStep: 0.1,
            minZoom: 1,
            maxZoom: 3,
            mapPosition: { x: 0, y: 0 },
            isPanning: false,
            startPanPosition: { x: 0, y: 0 },
        };
    },
    computed: {
        mapStyle() {
            return {
                transform: `scale(${this.zoomScale}) translate(${this.mapPosition.x}px, ${this.mapPosition.y}px)`,
                transition: this.isPanning ? 'none' : 'transform 0.3s ease',
            };
        },
        visiblePoints() {
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
            const x = event.offsetX / this.zoomScale;
            const y = event.offsetY / this.zoomScale;
            console.log(`Mouse coordinates: x=${x}, y=${y}`);
            // Implement tooltip logic if needed
        },
        resetTooltip() {
            // Implement reset tooltip logic if needed
        },
        updateViewport() {
            // Implement update viewport logic based on progress bar
        },
        zoomIn() {
            if (this.zoomScale < this.maxZoom) {
                this.zoomScale += this.zoomStep;
            }
        },
        zoomOut() {
            if (this.zoomScale > this.minZoom) {
                this.zoomScale -= this.zoomStep;
            }
        },
        handleWheel(event) {
            event.preventDefault();
            if (event.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        },
        moveMap(direction) {
            const step = 20;
            switch (direction) {
                case 'up':
                    this.mapPosition.y -= step;
                    break;
                case 'down':
                    this.mapPosition.y += step;
                    break;
                case 'left':
                    this.mapPosition.x -= step;
                    break;
                case 'right':
                    this.mapPosition.x += step;
                    break;
            }
        },
        startPan(event) {
            this.isPanning = true;
            this.startPanPosition = { x: event.clientX, y: event.clientY };
        },
        panMap(event) {
            if (!this.isPanning) return;
            const deltaX = event.clientX - this.startPanPosition.x;
            const deltaY = event.clientY - this.startPanPosition.y;
            this.mapPosition.x += deltaX / this.zoomScale;
            this.mapPosition.y += deltaY / this.zoomScale;
            this.startPanPosition = { x: event.clientX, y: event.clientY };
        },
        endPan() {
            this.isPanning = false;
        },
    },
    created() {
        this.mapPoints = mapPointsData;
        this.sortedPoints = [...this.mapPoints].sort((a, b) => {
            return new Date(a.founded).getTime() - new Date(b.founded).getTime();
        });
    },
};
</script>

<style scoped>
.map-container {
    overflow: hidden;
    position: relative;
    cursor: grab;
}

.map-container:active {
    cursor: grabbing;
}

.map-image {
    position: relative;
    transform-origin: top left;
}

.map-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #ff9800;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 1000;
}

.map-point-label {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
}

.toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}

.toolbar v-btn {
    color: white;
}

.map-progress {
    margin-top: 20px;
}
</style>
