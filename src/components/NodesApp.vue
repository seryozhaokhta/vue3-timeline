<!-- src/components/NodesApp.vue -->

<template>
    <div>
        <svg ref="svg" :width="width" :height="height" @mousemove="onMouseMove" @mouseup="onMouseUp"
            @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
            <!-- Bezier Paths -->
            <path v-for="(artist, artistIndex) in artists" :key="'path-' + artistIndex"
                :d="drawBezier(epochPositions[artist.epoch], artist.position)" class="bezier-path"
                :style="bezierPathStyle"
                :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16" />
            <!-- Epochs -->
            <g v-for="(epoch, epochIndex) in epochs" :key="epochIndex">
                <circle :cx="epoch.position.x" :cy="epoch.position.y" :r="epoch.isHovered ? 20 : 15"
                    class="epoch-circle" :style="epochCircleStyle" @mousedown="onMouseDown(epoch, 'epoch')"
                    @touchstart.prevent="onTouchStart(epoch, 'epoch')"
                    :opacity="epoch.isHovered || isHoveringEpoch === null ? 1 : 0.16" />
                <text :x="epoch.position.x" :y="epoch.position.y + 45" class="epoch-text" text-anchor="middle"
                    :style="epochTextStyle" @mouseover="onEpochMouseOver(epoch)" @mouseout="onEpochMouseOut(epoch)"
                    :opacity="epoch.isHovered || isHoveringEpoch === null ? 1 : 0.16">
                    {{ epoch.name }}
                </text>
            </g>
            <!-- Artists -->
            <g v-for="(artist, artistIndex) in artists" :key="artistIndex">
                <circle :cx="artist.position.x" :cy="artist.position.y" :r="artist.isHovered ? 20 : 15"
                    class="artist-circle" :style="artistCircleStyle" @mousedown="onMouseDown(artist, 'artist')"
                    @touchstart.prevent="onTouchStart(artist, 'artist')" @mouseover="onMouseOver(artist)"
                    @mouseout="onMouseOut(artist)"
                    :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16" />
                <image :x="artist.position.x - 10" :y="artist.position.y - 10" width="20" height="20"
                    :href="artist.photoURL"
                    :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16" />
                <text :x="artist.position.x" :y="artist.position.y + 35" class="artist-text" text-anchor="middle"
                    :style="artistTextStyle"
                    :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16">
                    {{ artist.name }}
                </text>
            </g>
        </svg>
    </div>
</template>

<script>
import artistsData from "@/data/artists-by-specialization-and-period-english.json";

export default {
    data() {
        return {
            width: 1000,
            height: 1200,
            epochs: [
                { name: "Ancient", position: { x: 100, y: 50 }, isHovered: false },
                { name: "Medieval", position: { x: 100, y: 150 }, isHovered: false },
                { name: "Renaissance", position: { x: 100, y: 250 }, isHovered: false },
                { name: "The Age of Enlightenment", position: { x: 100, y: 350 }, isHovered: false },
                { name: "Romanticism", position: { x: 100, y: 450 }, isHovered: false },
                { name: "Modernism", position: { x: 100, y: 550 }, isHovered: false },
            ],
            artists: [],
            dragging: null,
            dragType: null,
            isHoveringEpoch: null,
        };
    },
    computed: {
        epochPositions() {
            return this.epochs.reduce((positions, epoch) => {
                positions[epoch.name] = epoch.position;
                return positions;
            }, {});
        },
        bezierPathStyle() {
            return {
                stroke: this.$vuetify.theme.global.current.colors.path,
            };
        },
        epochCircleStyle() {
            return {
                fill: this.$vuetify.theme.global.current.colors.epoch,
            };
        },
        artistCircleStyle() {
            return {
                fill: this.$vuetify.theme.global.current.colors.node,
            };
        },
        epochTextStyle() {
            return {
                fill: this.$vuetify.theme.global.current.variables.text,
            };
        },
        artistTextStyle() {
            return {
                fill: this.$vuetify.theme.global.current.variables.text,
            };
        },
    },
    methods: {
        drawBezier(start, end) {
            const controlX = (start.x + end.x) / 2;
            const controlY = Math.min(start.y, end.y) - 100;
            return `M${start.x},${start.y} Q${controlX},${controlY} ${end.x},${end.y}`;
        },
        loadArtists() {
            const loadedArtists = [];
            const yOffsets = {
                Ancient: 0,
                Medieval: 0,
                Renaissance: 0,
                "The Age of Enlightenment": 0,
                Romanticism: 0,
                Modernism: 0,
            };
            const yStep = 60;
            const xOffset = 90; // Offset for each epoch

            Object.keys(artistsData).forEach((epoch, epochIndex) => {
                ["painters", "sculptors", "architects"].forEach((specialization) => {
                    artistsData[epoch][specialization].forEach((artist) => {
                        const position = this.calculateArtistPosition(epoch, yOffsets[epoch], epochIndex * xOffset);
                        loadedArtists.push({
                            ...artist,
                            epoch,
                            position,
                            isHovered: false,
                        });
                        yOffsets[epoch] += yStep;
                    });
                });
            });

            this.artists = loadedArtists;
        },
        calculateArtistPosition(epoch, yOffset, xOffset) {
            const epochPosition = this.epochPositions[epoch];
            return {
                x: epochPosition.x + 300 + xOffset, // Position horizontally right from epochs with x offset
                y: epochPosition.y + yOffset, // Sequential vertical positioning
            };
        },
        onMouseDown(item, type) {
            this.dragging = item;
            this.dragType = type;
        },
        onMouseMove(event) {
            if (this.dragging) {
                const svgRect = this.$refs.svg.getBoundingClientRect();
                const x = event.clientX - svgRect.left;
                const y = event.clientY - svgRect.top;
                this.dragging.position.x = x;
                this.dragging.position.y = y;
            }
        },
        onMouseUp() {
            this.dragging = null;
            this.dragType = null;
        },
        onMouseOver(item) {
            if (this.dragType === "epoch") {
                this.isHoveringEpoch = item.name;
            } else {
                item.isHovered = true;
            }
        },
        onMouseOut(item) {
            if (this.dragType === "epoch") {
                this.isHoveringEpoch = null;
            } else {
                item.isHovered = false;
            }
        },
        onEpochMouseOver(epoch) {
            epoch.isHovered = true;
            this.isHoveringEpoch = epoch.name;
        },
        onEpochMouseOut(epoch) {
            epoch.isHovered = false;
            this.isHoveringEpoch = null;
        },
        onTouchStart(item, type) {
            this.dragging = item;
            this.dragType = type;
        },
        onTouchMove(event) {
            if (this.dragging) {
                const svgRect = this.$refs.svg.getBoundingClientRect();
                const x = event.touches[0].clientX - svgRect.left;
                const y = event.touches[0].clientY - svgRect.top;
                this.dragging.position.x = x;
                this.dragging.position.y = y;
            }
        },
        onTouchEnd() {
            this.dragging = null;
            this.dragType = null;
        },
    },
    mounted() {
        this.loadArtists();
    },
};
</script>

<style scoped>
svg {
    border: 1px solid #ccc;
    user-select: none;
}

.epoch-circle {
    transition: r 0.3s ease, fill 0.3s ease;
}

.epoch-circle:hover {}

.epoch-text {
    font-size: 14px;
    font-family: "Helvetica Neue", sans-serif;
}

.artist-circle {
    transition: r 0.3s ease, fill 0.3s ease;
}

.artist-circle:hover {}

.artist-text {
    font-size: 12px;
    font-family: "Helvetica Neue", sans-serif;
}

.bezier-path {
    stroke: #78909c;
    stroke-width: 1;
    fill: transparent;
    pointer-events: none;
    /* Игнорируем события мыши для кривых Безье */
}
</style>

