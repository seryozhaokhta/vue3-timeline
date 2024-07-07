<!-- src/components/GalleryApp.vue -->

<template>
    <v-container>
        <h1>Gallery</h1>
        <v-row>
            <v-col cols="12">
                <div class="timeline-container">
                    <div class="timeline">
                        <div class="timeline-line"></div>
                        <div v-for="(period, index) in periods" :key="index" class="epoch-circle"
                            :style="{ left: `calc(${index * (100 / (periods.length - 1))}% - 35px)` }"
                            @click="selectPeriod(index)">
                            {{ period }}
                        </div>
                        <div class="marker"
                            :style="{ left: `calc(${selectedPeriodIndex * (100 / (periods.length - 1))}% - 10px)` }"
                            @mousedown="startDrag"></div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="item in filteredGallery" :key="item.id" cols="12">
                <v-row>
                    <v-col v-for="image in item.images" :key="image" cols="12" sm="6" md="4" lg="3">
                        <v-card class="gallery-card">
                            <v-img :src="getImageUrl(image)" class="gallery-image"></v-img>
                            <v-card-title>{{ item.title }}</v-card-title>
                            <v-card-subtitle>{{ item.period }}</v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

export default {
    name: "GalleryApp",
    setup() {
        const store = useStore();
        const periods = ref([
            "Ancient",
            "Medieval",
            "Renaissance",
            "The Age of Enlightenment",
            "Romanticism",
            "Modernism",
        ]);
        const selectedPeriodIndex = ref(0);
        const isDragging = ref(false);
        const startX = ref(0);

        const gallery = computed(() => store.getters.getGallery);
        const filteredGallery = computed(() => {
            return periods.value[selectedPeriodIndex.value]
                ? gallery.value.filter(
                    (item) => item.period === periods.value[selectedPeriodIndex.value]
                )
                : gallery.value;
        });

        const getImageUrl = (photoURL) => {
            try {
                if (!photoURL.startsWith("http")) {
                    return require(`@/${photoURL}`);
                }
                return photoURL;
            } catch (e) {
                console.error(`Image not found: ${photoURL}`);
                return require("@/assets/images/default-image.png");
            }
        };

        const selectPeriod = (index) => {
            selectedPeriodIndex.value = index;
        };

        const startDrag = (event) => {
            isDragging.value = true;
            startX.value = event.clientX;
            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", stopDrag);
        };

        const onDrag = (event) => {
            if (!isDragging.value) return;
            const deltaX = event.clientX - startX.value;
            const timelineWidth = document.querySelector(".timeline").offsetWidth;
            let newX = (deltaX / timelineWidth) * 100;
            newX = Math.max(0, Math.min(newX, 100));
            selectedPeriodIndex.value = Math.round(
                (newX / 100) * (periods.value.length - 1)
            );
        };

        const stopDrag = () => {
            isDragging.value = false;
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", stopDrag);
        };

        onMounted(() => {
            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", stopDrag);
        });

        onUnmounted(() => {
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", stopDrag);
        });

        return {
            periods,
            filteredGallery,
            selectPeriod,
            getImageUrl,
            selectedPeriodIndex,
            startDrag,
        };
    },
    created() {
        this.$store.dispatch("fetchGallery");
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

.timeline-container {
    position: relative;
    height: 60px;
    margin-bottom: 40px;
}

.timeline {
    position: relative;
    height: 60px;
}

.timeline-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: grey;
    transform: translateY(-50%);
}

.epoch-circle {
    position: absolute;
    top: -40px;
    width: 70px;
    height: 70px;
    background-color: var(--epoch);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s;
    user-select: none;
}

.epoch-circle:hover {
    transform: scale(1.2);
}

.marker {
    position: absolute;
    top: 20px;
    width: 20px;
    height: 20px;
    background-color: #bdff00;
    border-radius: 50%;
    transition: left 0.3s;
    cursor: pointer;
    user-select: none;
}

.gallery-card {
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    transition: transform 0.3s;
    margin-bottom: 20px;
}

.gallery-card:hover {
    transform: translateY(-5px);
}

.gallery-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
}
</style>
