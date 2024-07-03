<!-- src/components/NodesApp.vue -->

<template>
    <div>
        <!-- Interaction Panel -->
        <v-container class="interaction-panel" fluid>
            <v-row>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedEpoch" :items="['All', ...epochNames]" label="Select Epoch"
                        clearable></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedSpecialization" :items="specializations" label="Select Specialization"
                        clearable></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="searchQuery" label="Search Artists"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-btn @click="resetFilters" class="mt-7">Reset Filters</v-btn>
                </v-col>
            </v-row>
        </v-container>

        <svg ref="svg" :width="width" :height="height" @mousemove="onMouseMove" @mouseup="onMouseUp"
            @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
            <!-- Bezier Paths -->
            <path v-for="(artist, artistIndex) in filteredArtists" :key="'path-' + artistIndex"
                :d="drawBezier(epochPositions[artist.epoch], artist.position)" class="bezier-path"
                :style="bezierPathStyle"
                :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16" />
            <!-- Epochs -->
            <g v-for="(epoch, epochIndex) in epochs" :key="epochIndex">
                <circle :cx="epoch.position.x" :cy="epoch.position.y" :r="epoch.isHovered ? 20 : 15"
                    class="epoch-circle" :style="epochCircleStyle" @mousedown="onMouseDown(epoch, 'epoch')"
                    @touchstart.prevent="onTouchStart(epoch, 'epoch')" :opacity="isEpochVisible(epoch) ? 1 : 0.16" />
                <text :x="epoch.position.x" :y="epoch.position.y + 45" class="epoch-text" text-anchor="middle"
                    :style="epochTextStyle" @mouseover="onEpochMouseOver(epoch)" @mouseout="onEpochMouseOut(epoch)"
                    :opacity="isEpochVisible(epoch) ? 1 : 0.16">
                    {{ epoch.name }}
                </text>
            </g>
            <!-- Artists -->
            <g v-for="(artist, artistIndex) in filteredArtists" :key="artistIndex">
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
import { ref, computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import artistsData from "@/data/artists-by-specialization-and-period-english.json";

export default {
    setup() {
        const theme = useTheme();

        const width = 1000;
        const height = 1200;
        const epochs = ref([
            { name: "Ancient", position: { x: 100, y: 50 }, isHovered: false },
            { name: "Medieval", position: { x: 100, y: 150 }, isHovered: false },
            { name: "Renaissance", position: { x: 100, y: 250 }, isHovered: false },
            { name: "The Age of Enlightenment", position: { x: 100, y: 350 }, isHovered: false },
            { name: "Romanticism", position: { x: 100, y: 450 }, isHovered: false },
            { name: "Modernism", position: { x: 100, y: 550 }, isHovered: false },
        ]);
        const artists = ref([]);
        const dragging = ref(null);
        const dragType = ref(null);
        const isHoveringEpoch = ref(null);
        const searchQuery = ref('');
        const selectedEpoch = ref('All');
        const selectedSpecialization = ref('');
        const specializations = ref(['painters', 'sculptors', 'architects']);

        const epochNames = computed(() => epochs.value.map(epoch => epoch.name));
        const epochPositions = computed(() => {
            return epochs.value.reduce((positions, epoch) => {
                positions[epoch.name] = epoch.position;
                return positions;
            }, {});
        });

        const bezierPathStyle = computed(() => ({
            stroke: theme.current.value.colors.path,
        }));

        const epochCircleStyle = computed(() => ({
            fill: theme.current.value.colors.epoch,
        }));

        const artistCircleStyle = computed(() => ({
            fill: theme.current.value.colors.node,
        }));

        const epochTextStyle = computed(() => ({
            fill: theme.current.value.variables.text,
        }));

        const artistTextStyle = computed(() => ({
            fill: theme.current.value.variables.text,
        }));

        const filteredArtists = computed(() => {
            return artists.value.filter(artist => {
                const matchesEpoch = selectedEpoch.value === 'All' || !selectedEpoch.value ? true : artist.epoch === selectedEpoch.value;
                const matchesSpecialization = selectedSpecialization.value ? artist.specialization === selectedSpecialization.value : true;
                const matchesSearchQuery = artist.name.toLowerCase().includes(searchQuery.value.toLowerCase());
                return matchesEpoch && matchesSpecialization && matchesSearchQuery;
            });
        });

        const drawBezier = (start, end) => {
            const controlX = (start.x + end.x) / 2;
            const controlY = Math.min(start.y, end.y) - 100;
            return `M${start.x},${start.y} Q${controlX},${controlY} ${end.x},${end.y}`;
        };

        const loadArtists = () => {
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
                        const position = calculateArtistPosition(epoch, yOffsets[epoch], epochIndex * xOffset);
                        loadedArtists.push({
                            ...artist,
                            epoch,
                            specialization,
                            position,
                            isHovered: false,
                        });
                        yOffsets[epoch] += yStep;
                    });
                });
            });

            artists.value = loadedArtists;
        };

        const calculateArtistPosition = (epoch, yOffset, xOffset) => {
            const epochPosition = epochPositions.value[epoch];
            return {
                x: epochPosition.x + 300 + xOffset, // Position horizontally right from epochs with x offset
                y: epochPosition.y + yOffset, // Sequential vertical positioning
            };
        };

        const onMouseDown = (item, type) => {
            dragging.value = item;
            dragType.value = type;
        };

        const onMouseMove = (event) => {
            if (dragging.value) {
                const svgRect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - svgRect.left;
                const y = event.clientY - svgRect.top;
                dragging.value.position.x = x;
                dragging.value.position.y = y;
            }
        };

        const onMouseUp = () => {
            dragging.value = null;
            dragType.value = null;
        };

        const onMouseOver = (item) => {
            if (dragType.value === "epoch") {
                isHoveringEpoch.value = item.name;
            } else {
                item.isHovered = true;
            }
        };

        const onMouseOut = (item) => {
            if (dragType.value === "epoch") {
                isHoveringEpoch.value = null;
            } else {
                item.isHovered = false;
            }
        };

        const onEpochMouseOver = (epoch) => {
            epoch.isHovered = true;
            isHoveringEpoch.value = epoch.name;
        };

        const onEpochMouseOut = (epoch) => {
            epoch.isHovered = false;
            isHoveringEpoch.value = null;
        };

        const onTouchStart = (item, type) => {
            dragging.value = item;
            dragType.value = type;
        };

        const onTouchMove = (event) => {
            if (dragging.value) {
                const svgRect = event.currentTarget.getBoundingClientRect();
                const x = event.touches[0].clientX - svgRect.left;
                const y = event.touches[0].clientY - svgRect.top;
                dragging.value.position.x = x;
                dragging.value.position.y = y;
            }
        };

        const onTouchEnd = () => {
            dragging.value = null;
            dragType.value = null;
        };

        const resetFilters = () => {
            selectedEpoch.value = 'All';
            selectedSpecialization.value = '';
            searchQuery.value = '';
        };

        const isEpochVisible = (epoch) => {
            return selectedEpoch.value === 'All' || !selectedEpoch.value || epoch.name === selectedEpoch.value;
        };

        onMounted(() => {
            loadArtists();
        });

        return {
            width,
            height,
            epochs,
            artists,
            dragging,
            dragType,
            isHoveringEpoch,
            searchQuery,
            selectedEpoch,
            selectedSpecialization,
            specializations,
            epochNames,
            epochPositions,
            bezierPathStyle,
            epochCircleStyle,
            artistCircleStyle,
            epochTextStyle,
            artistTextStyle,
            filteredArtists,
            drawBezier,
            loadArtists,
            calculateArtistPosition,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseOver,
            onMouseOut,
            onEpochMouseOver,
            onEpochMouseOut,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            resetFilters,
            isEpochVisible
        };
    },
};
</script>

<style scoped>
.interaction-panel {
    margin-bottom: 20px;
}

svg {
    border: 1px solid #ccc;
    user-select: none;
}

.epoch-circle {
    transition: r 0.3s ease, fill 0.3s ease;
}

.epoch-text {
    font-size: 14px;
    font-family: "Helvetica Neue", sans-serif;
}

.artist-circle {
    transition: r 0.3s ease, fill 0.3s ease;
}

.artist-text {
    font-size: 12px;
    font-family: "Helvetica Neue", sans-serif;
}

.bezier-path {
    stroke-width: 1;
    fill: transparent;
    pointer-events: none;
}
</style>
