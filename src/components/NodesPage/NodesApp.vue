<!-- src/components/NodesPage/NodesApp.vue -->

<template>
    <div>
        <!-- Interaction Panel -->
        <InteractionPanel :selectedEpoch="selectedEpoch" :epochNames="epochNames"
            :selectedSpecialization="selectedSpecialization" :specializations="specializations"
            :searchQuery="searchQuery" @resetFilters="resetFilters" @alignNodes="alignNodes"
            @update:selectedEpoch="value => selectedEpoch = value"
            @update:selectedSpecialization="value => selectedSpecialization = value"
            @update:searchQuery="value => searchQuery = value" />

        <svg ref="svg" :width="width" :height="height" @mousemove="onMouseMove" @mouseup="onMouseUp"
            @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
            <!-- Bezier Paths -->
            <BezierPaths :artists="filteredArtists" :epochPositions="epochPositions" :isHoveringEpoch="isHoveringEpoch"
                :bezierPathStyle="bezierPathStyle" :drawBezier="drawBezier" :dragging="dragging" />

            <!-- Epochs -->
            <EpochDisplay :epochs="epochs" :isEpochVisible="isEpochVisible" :epochCircleStyle="epochCircleStyle"
                :epochTextStyle="epochTextStyle" @onMouseDown="onMouseDown" @onEpochDoubleClick="onEpochDoubleClick"
                @onTouchStart="onTouchStart" @onEpochTouchEnd="onEpochTouchEnd" @onEpochMouseOver="onEpochMouseOver"
                @onEpochMouseOut="onEpochMouseOut" />

            <!-- Artists -->
            <ArtistDisplay :artists="filteredArtists" :isHoveringEpoch="isHoveringEpoch"
                :artistCircleStyle="artistCircleStyle" :artistTextStyle="artistTextStyle" @onMouseDown="onMouseDown"
                @onTouchStart="onTouchStart" @onMouseOver="onMouseOver" @onMouseOut="onMouseOut" />
        </svg>
    </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useTheme } from 'vuetify';
import artistsData from "@/data/artists-by-specialization-and-period-english.json";
import InteractionPanel from './InteractionPanel.vue';
import EpochDisplay from './EpochDisplay.vue';
import ArtistDisplay from './ArtistDisplay.vue';
import BezierPaths from './BezierPaths.vue';

export default {
    components: {
        InteractionPanel,
        EpochDisplay,
        ArtistDisplay,
        BezierPaths,
    },
    setup() {
        const theme = useTheme();

        const width = ref(window.innerWidth > 768 ? 1000 : window.innerWidth * 0.9);
        const height = ref(window.innerWidth > 768 ? 1200 : window.innerHeight * 0.9);
        const epochs = ref([
            { name: "Ancient", position: { x: 80, y: 50 }, isHovered: false },
            { name: "Medieval", position: { x: 80, y: 150 }, isHovered: false },
            { name: "Renaissance", position: { x: 80, y: 250 }, isHovered: false },
            { name: "The Age of Enlightenment", position: { x: 80, y: 350 }, isHovered: false },
            { name: "Romanticism", position: { x: 80, y: 450 }, isHovered: false },
            { name: "Modernism", position: { x: 80, y: 550 }, isHovered: false },
        ]);
        const artists = ref([]);
        const dragging = ref(null);
        const dragType = ref(null);
        const isHoveringEpoch = ref(null);
        const searchQuery = ref('');
        const selectedEpoch = ref('All');
        const selectedSpecialization = ref('');
        const specializations = ref(['painters', 'sculptors', 'architects']);
        const lastTap = ref(null);

        const epochNames = computed(() => epochs.value.map(epoch => epoch.name));
        const epochPositions = computed(() => {
            return epochs.value.reduce((positions, epoch) => {
                positions[epoch.name] = epoch.position;
                return positions;
            }, {});
        });

        const bezierPathStyle = computed(() => ({
            stroke: theme.current.value.colors.path,
            fill: 'none',
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
                const matchesSpecialization = selectedSpecialization.value === 'All' || !selectedSpecialization.value ? true : artist.specialization === selectedSpecialization.value;
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
            const xOffset = window.innerWidth > 768 ? 60 : 25;

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
                x: epochPosition.x + 300 + xOffset,
                y: epochPosition.y + yOffset,
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
                updateElementPositions();
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
                updateElementPositions();
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

        const handleResize = () => {
            width.value = window.innerWidth > 768 ? 1000 : window.innerWidth * 0.9;
            height.value = window.innerWidth > 768 ? 1200 : window.innerHeight * 0.9;
            loadArtists();
        };

        const onEpochDoubleClick = (epoch) => {
            const xOffset = 100;
            const yOffsetIncrement = 40;
            let yOffset = 0;

            artists.value.forEach((artist) => {
                if (artist.epoch === epoch.name) {
                    artist.position.x = epoch.position.x + xOffset;
                    artist.position.y = epoch.position.y + yOffset;
                    yOffset += yOffsetIncrement;
                }
            });
        };

        const onEpochTouchEnd = (epoch) => {
            const now = new Date().getTime();
            const timesince = now - lastTap.value;
            if ((timesince < 600) && (timesince > 0)) {
                onEpochDoubleClick(epoch);
            }
            lastTap.value = new Date().getTime();
        };

        const alignNodes = (layout) => {
            let updatedEpochs = [...epochs.value];
            switch (layout) {
                case 'horizontal':
                    updatedEpochs.forEach((epoch, index) => {
                        epoch.position.x = 80 + (index * 150);
                        epoch.position.y = 50;
                    });
                    break;
                case 'grid':
                    updatedEpochs.forEach((epoch, index) => {
                        epoch.position.x = 80 + (index % 3) * 150;
                        epoch.position.y = 50 + Math.floor(index / 3) * 150;
                    });
                    break;
                case 'default':
                default:
                    updatedEpochs = [
                        { name: "Ancient", position: { x: 80, y: 50 }, isHovered: false },
                        { name: "Medieval", position: { x: 80, y: 150 }, isHovered: false },
                        { name: "Renaissance", position: { x: 80, y: 250 }, isHovered: false },
                        { name: "The Age of Enlightenment", position: { x: 80, y: 350 }, isHovered: false },
                        { name: "Romanticism", position: { x: 80, y: 450 }, isHovered: false },
                        { name: "Modernism", position: { x: 80, y: 550 }, isHovered: false },
                    ];
                    break;
            }
            epochs.value = updatedEpochs;
            updateElementPositions();
        };

        const updateElementPositions = () => {
            nextTick(() => {
                const paths = document.querySelectorAll('.bezier-path');
                paths.forEach((path, index) => {
                    const artist = filteredArtists.value[index];
                    const epochPosition = epochPositions.value[artist.epoch];
                    const newD = drawBezier(epochPosition, artist.position);
                    path.setAttribute('d', newD);
                });
            });
        };

        onMounted(() => {
            loadArtists();
            window.addEventListener('resize', handleResize);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });

        watch(artists, updateElementPositions, { deep: true });
        watch(epochs, updateElementPositions, { deep: true });

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
            isEpochVisible,
            onEpochDoubleClick,
            onEpochTouchEnd,
            alignNodes,
            updateElementPositions,
        };
    },
};
</script>

<style scoped>
svg {
    border: 1px solid #ccc;
    user-select: none;
}

.bezier-path {
    stroke-width: 1;
    fill: none;
    pointer-events: none;
    transition: d 0.2s;
}

.bezier-path.dragging {
    transition: d 0.02s;
}

image {
    transition: x 0.5s, y 0.5s;
}
</style>

