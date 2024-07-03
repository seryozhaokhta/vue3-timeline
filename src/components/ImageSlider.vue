<!-- src/components/ImageSlider.vue -->

<template>
    <div class="slider-container" @click="nextImage">
        <div class="progress-bars">
            <div v-for="(_, index) in images.length" :key="index"
                :class="['progress-bar', { 'active-bar': currentImageIndex === index }]"
                :style="{ width: currentImageIndex === index ? `${progressWidth}%` : '0%' }"></div>
        </div>
        <transition-group name="fade" tag="div" class="image-wrapper">
            <div v-for="(image, index) in images" :key="image"
                :class="['slider-image', { 'active': currentImageIndex === index }]"
                :style="{ backgroundImage: `url(${image})` }"></div>
        </transition-group>
        <div class="navigation">
            <v-btn icon="mdi-chevron-left" variant="text" @click="prevImage" class="nav-btn"></v-btn>
            <v-btn icon="mdi-chevron-right" variant="text" @click="nextImage" class="nav-btn"></v-btn>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
    setup() {
        const currentImageIndex = ref(0);
        const progressWidth = ref(0);
        const intervalId = ref(null);
        const isTransitioning = ref(false);
        const mousePosition = ref(null);
        const images = [
            require('@/assets/images/0_HomePage/img1.jpg'),
            require('@/assets/images/0_HomePage/img2.jpg'),
            require('@/assets/images/0_HomePage/img3.jpg')
        ];

        const startSlider = () => {
            intervalId.value = setInterval(() => {
                progressWidth.value += 0.5;
                if (progressWidth.value >= 100) {
                    nextImage();
                }
            }, 60);
        };

        const stopSlider = () => {
            clearInterval(intervalId.value);
        };

        const nextImage = () => {
            if (isTransitioning.value) return;
            isTransitioning.value = true;
            stopSlider();
            currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
            progressWidth.value = 0;
            startSlider();
            setTimeout(() => {
                isTransitioning.value = false;
            }, 500);
        };

        const prevImage = () => {
            if (isTransitioning.value) return;
            isTransitioning.value = true;
            stopSlider();
            currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length;
            progressWidth.value = 0;
            startSlider();
            setTimeout(() => {
                isTransitioning.value = false;
            }, 500);
        };

        const handleMouseMove = (event) => {
            const { clientX, target } = event;
            const { left, width } = target.getBoundingClientRect();
            const x = clientX - left;
            mousePosition.value = x / width;

            if (mousePosition.value < 0.3) {
                target.style.cursor = 'w-resize';
                if (!isTransitioning.value) {
                    prevImage();
                }
            } else if (mousePosition.value > 0.7) {
                target.style.cursor = 'e-resize';
                if (!isTransitioning.value) {
                    nextImage();
                }
            } else {
                target.style.cursor = 'default';
            }
        };

        const resetSliderState = () => {
            mousePosition.value = null;
        };

        onMounted(() => {
            startSlider();
        });

        onBeforeUnmount(() => {
            stopSlider();
        });

        return {
            currentImageIndex,
            progressWidth,
            images,
            nextImage,
            prevImage,
            handleMouseMove,
            resetSliderState,
            isTransitioning
        };
    }
};
</script>

<style scoped>
.slider-container {
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 16px;
    overflow: hidden;
    margin-top: 20px;
}

.progress-bars {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    width: 80%;
    z-index: 10;
}

.progress-bar {
    flex: 1;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.5);
    transition: width 0.1s linear;
}

.active-bar {
    background-color: #ff5722;
}

.image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.slider-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.slider-image.active {
    opacity: 1;
}

.navigation {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 20px;
    z-index: 20;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.nav-btn {
    background-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
}

.nav-btn:hover {
    background-color: rgba(255, 255, 255, 0.5) !important;
}
</style>