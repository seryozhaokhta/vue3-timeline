<!-- src/components/NodesApp/BezierPaths.vue -->

<template>
    <path v-for="(artist, artistIndex) in artists" :key="'path-' + artistIndex"
        :d="drawBezier(epochPositions[artist.epoch], artist.position)"
        :class="{ 'bezier-path': true, 'dragging': dragging !== null }" :style="bezierPathStyle"
        :opacity="artist.epoch === isHoveringEpoch || isHoveringEpoch === null ? 1 : 0.16" />
</template>

<script>
export default {
    name: 'BezierPaths',
    props: {
        artists: Array,
        epochPositions: Object,
        isHoveringEpoch: String,
        bezierPathStyle: Object,
        drawBezier: Function,
        dragging: Object,
    },
};
</script>

<style scoped>
.bezier-path {
    stroke-width: 1;
    fill: none;
    pointer-events: none;
    transition: d 0.2s;
}

.bezier-path.dragging {
    transition: d 0.02s;
}
</style>

