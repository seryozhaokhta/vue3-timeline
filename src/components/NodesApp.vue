<!-- src/components/NodesApp.vue -->

<template>
    <div>
        <svg :width="width" :height="height" @mousemove="onMouseMove" @mouseup="onMouseUp">
            <!-- Эпохи -->
            <g v-for="(epoch, epochIndex) in epochs" :key="epochIndex">
                <circle :cx="epoch.position.x" :cy="epoch.position.y" :r="epoch.isHovered ? 50 : 40" fill="lightgrey"
                    @mousedown="onMouseDown(epoch, 'epoch')" @mouseover="onMouseOver(epoch)"
                    @mouseout="onMouseOut(epoch)" />
                <text :x="epoch.position.x" :y="epoch.position.y" text-anchor="middle" dominant-baseline="middle">
                    {{ epoch.name }}
                </text>
            </g>

            <!-- Художники -->
            <g v-for="(artist, artistIndex) in artists" :key="artistIndex">
                <circle :cx="artist.position.x" :cy="artist.position.y" :r="artist.isHovered ? 25 : 20"
                    fill="lightgreen" @mousedown="onMouseDown(artist, 'artist')" @mouseover="onMouseOver(artist)"
                    @mouseout="onMouseOut(artist)" />
                <text :x="artist.position.x" :y="artist.position.y + 30" text-anchor="middle"
                    dominant-baseline="middle">
                    {{ artist.name }}
                </text>
                <image :x="artist.position.x - 15" :y="artist.position.y - 15" width="30" height="30"
                    :href="artist.photoURL" />
            </g>

            <!-- Кривые Безье -->
            <path v-for="(artist, artistIndex) in artists" :key="'path-' + artistIndex"
                :d="drawBezier(epochPositions[artist.epoch], artist.position)" stroke="black" fill="transparent" />
        </svg>
    </div>
</template>

<script>
import artistsData from '@/data/artists-by-specialization-and-period-english.json'; // Подключаем JSON-файл с данными художников

export default {
    data() {
        return {
            width: 800,
            height: 600,
            epochs: [
                { name: "Ancient", position: { x: 100, y: 100 }, isHovered: false },
                { name: "Medieval", position: { x: 300, y: 100 }, isHovered: false },
                { name: "Renaissance", position: { x: 500, y: 100 }, isHovered: false },
                { name: "The Age of Enlightenment", position: { x: 700, y: 100 }, isHovered: false },
                { name: "Romanticism", position: { x: 300, y: 500 }, isHovered: false },
                { name: "Modernism", position: { x: 500, y: 500 }, isHovered: false }
            ],
            artists: [],
            dragging: null,
            dragType: null,
        };
    },
    computed: {
        epochPositions() {
            let positions = {};
            this.epochs.forEach((epoch) => {
                positions[epoch.name] = epoch.position;
            });
            return positions;
        }
    },
    methods: {
        drawBezier(start, end) {
            const controlX = (start.x + end.x) / 2;
            const controlY = Math.min(start.y, end.y) - 100;
            return `M${start.x},${start.y} Q${controlX},${controlY} ${end.x},${end.y}`;
        },
        loadArtists() {
            const loadedArtists = [];

            Object.keys(artistsData).forEach(epoch => {
                ['painters', 'sculptors', 'architects'].forEach(specialization => {
                    artistsData[epoch][specialization].forEach(artist => {
                        loadedArtists.push({
                            ...artist,
                            epoch,
                            position: this.calculateArtistPosition(epoch),
                            isHovered: false
                        });
                    });
                });
            });

            this.artists = loadedArtists;
        },
        calculateArtistPosition(epoch) {
            // Задаем произвольное положение для художника в пределах соответствующей эпохи
            const epochPosition = this.epochPositions[epoch];
            return {
                x: epochPosition.x + (Math.random() - 0.5) * 100,
                y: epochPosition.y + (Math.random() - 0.5) * 100
            };
        },
        onMouseDown(item, type) {
            this.dragging = item;
            this.dragType = type;
        },
        onMouseMove(event) {
            if (this.dragging) {
                const svgRect = event.target.closest('svg').getBoundingClientRect();
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
            item.isHovered = true;
        },
        onMouseOut(item) {
            item.isHovered = false;
        }
    },
    created() {
        this.loadArtists(); // Загружаем художников при создании компонента
    }
};
</script>

<style scoped>
svg {
    border: 1px solid black;
    user-select: none;
}

circle {
    transition: r 0.3s ease;
}
</style>
