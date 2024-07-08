<!-- src/components/NodesApp/ArtistDisplay.vue -->

<template>
    <g v-for="(artist, artistIndex) in artists" :key="artistIndex"
        :transform="'translate(' + artist.position.x + ',' + artist.position.y + ')'"
        @mouseover="$emit('onMouseOver', artist)" @mouseout="$emit('onMouseOut', artist)"
        @mousedown="$emit('onMouseDown', artist, 'artist')"
        @touchstart.prevent="$emit('onTouchStart', artist, 'artist')">
        <circle :r="artist.isHovered ? 20 : 15" class="artist-circle" :style="artistCircleStyle"
            :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16" />
        <image :x="-10" :y="-10" width="20" height="20" :href="artist.photoURL"
            :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16" />
        <text :y="35" class="artist-text" text-anchor="middle" :style="artistTextStyle"
            :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16">
            {{ artist.name }}
        </text>
    </g>
</template>

<script>
export default {
    name: 'ArtistDisplay',
    props: {
        artists: Array,
        isHoveringEpoch: String,
        artistCircleStyle: Object,
        artistTextStyle: Object,
    },
};
</script>

<style scoped>
.artist-circle {
    transition: r 0.3s ease, fill 0.3s ease, cx 0.5s, cy 0.5s;
}

.artist-text {
    font-size: 12px;
    font-family: "Helvetica Neue", sans-serif;
    transition: x 0.5s, y 0.5s;
}

image {
    transition: x 0.5s, y 0.5s;
}
</style>
