<!-- src/components/GalleryApp.vue -->

<template>
    <v-container>
        <h1>Gallery</h1>
        <v-row>
            <v-col cols="12">
                <div class="timeline-container">
                    <v-slider v-model="selectedPeriodIndex" class="timeline-slider" :max="periods.length - 1" step="1"
                        thumb-label="always" thumb-color="lime" @input="selectPeriod" thumb-label-slot>
                        <template #thumb-label="{ modelValue }">
                            <span>{{ periods[modelValue]?.date }}</span>
                        </template>
                    </v-slider>
                    <div class="period-labels">
                        <span v-for="(period, index) in periods" :key="index" class="period-label"
                            :style="{ left: `calc(${index * (100 / (periods.length - 1))}%)` }"
                            @click="selectPeriod(index)">
                            {{ period?.name }}
                        </span>
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
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
    name: "GalleryApp",
    setup() {
        const store = useStore();
        const periods = ref([]);
        const selectedPeriodIndex = ref(0);

        const gallery = computed(() => store.getters.getGallery);
        const filteredGallery = computed(() => {
            return periods.value[selectedPeriodIndex.value]
                ? gallery.value.filter(
                    (item) => item.period === periods.value[selectedPeriodIndex.value]?.name
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

        const initializePeriods = () => {
            const uniquePeriods = [];
            gallery.value.forEach(item => {
                if (!uniquePeriods.some(period => period.name === item.period)) {
                    uniquePeriods.push({ name: item.period, date: item.date });
                }
            });
            periods.value = uniquePeriods;
        };

        onMounted(() => {
            store.dispatch("fetchGallery").then(() => {
                initializePeriods();
            });
        });

        return {
            periods,
            filteredGallery,
            selectPeriod,
            getImageUrl,
            selectedPeriodIndex,
            initializePeriods,
        };
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

.timeline-slider {
    width: calc(100% - 70px);
    margin: 0 auto;
}

.period-labels {
    position: relative;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 35px;
}

.period-label {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    cursor: pointer;
    transition: transform 0.3s;
}

.period-label:hover {
    transform: translateX(-50%) scale(1.2);
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
