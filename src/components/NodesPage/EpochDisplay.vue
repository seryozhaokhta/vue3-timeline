<!-- src/components/NodesApp/EpochDisplay.vue -->

<template>
    <g v-for="(epoch, epochIndex) in epochs" :key="epochIndex"
        :transform="'translate(' + epoch.position.x + ',' + epoch.position.y + ')'"
        @mouseover="$emit('onEpochMouseOver', epoch)" @mouseout="$emit('onEpochMouseOut', epoch)">
        <circle :r="epoch.isHovered ? 20 : 15" class="epoch-circle" :style="epochCircleStyle"
            @mousedown="$emit('onMouseDown', epoch, 'epoch')" @dblclick="$emit('onEpochDoubleClick', epoch)"
            @touchstart.prevent="$emit('onTouchStart', epoch, 'epoch')" @touchend="$emit('onEpochTouchEnd', epoch)"
            :opacity="isEpochVisible(epoch) ? 1 : 0.16" />
        <text :y="45" class="epoch-text" text-anchor="middle" :style="epochTextStyle"
            :opacity="isEpochVisible(epoch) ? 1 : 0.16">
            {{ epoch.name }}
        </text>
    </g>
</template>

<script>
export default {
    name: 'EpochDisplay',
    props: {
        epochs: Array,
        isEpochVisible: Function,
        epochCircleStyle: Object,
        epochTextStyle: Object,
    },
};
</script>

<style scoped>
.epoch-circle {
    transition: r 0.3s ease, fill 0.3s ease, cx 0.5s, cy 0.5s;
}

.epoch-text {
    font-size: 14px;
    font-family: "Helvetica Neue", sans-serif;
    transition: x 0.5s, y 0.5s;
}
</style>
