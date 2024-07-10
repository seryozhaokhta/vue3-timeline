<!-- src/components/ArtistList.vue -->

<template>
    <section>
        <v-text-field v-model="searchQuery" label="Search artists..." outlined dense>
            <template #prepend>
                <v-icon>
                    <img :src="require('@/assets/search.svg')" alt="Search" />
                </v-icon>
            </template>
        </v-text-field>

        <div class="filter-buttons">
            <v-btn v-for="epoch in epochs" :key="epoch" :class="{ 'active-button': selectedEpoch === epoch }"
                @click="filterByEpoch(epoch)" outlined small>
                {{ epoch }}
            </v-btn>
        </div>

        <h1>Artists by Epoch</h1>
        <article v-for="(period, periodName) in filteredArtists" :key="periodName">
            <h2>{{ periodName }}</h2>
            <section class="artist-row" v-for="(artists, specialization) in period" :key="specialization">
                <h3>{{ specialization }}</h3>
                <v-row>
                    <v-col v-for="artist in artists" :key="artist.name" cols="12" sm="6" md="4" lg="3">
                        <v-card class="artist-card">
                            <div class="rounded-circle"
                                :style="{ backgroundImage: `url(${getImageUrl(artist.photoURL)})` }">
                            </div>
                            <v-card-title class="artist-name">{{ artist.name }}</v-card-title>
                            <v-card-subtitle class="artist-details">{{ artist.birthPlace }} ({{ artist.years
                                }})</v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </section>
        </article>
    </section>
</template>

<script>
import { ref, computed } from 'vue';
import artists from '@/data/artists-by-specialization-and-period-english.json';
import { timelineData } from '@/data/timelineData';

export default {
    setup() {
        const searchQuery = ref('');
        const artistsData = ref(artists);
        const epochs = ref(timelineData["Western-European-art-periodization"].map(item => item.epoch));
        const selectedEpoch = ref('');

        const filterByEpoch = (epoch) => {
            if (selectedEpoch.value === epoch) {
                selectedEpoch.value = '';
            } else {
                selectedEpoch.value = epoch;
            }
        };

        const filterArtistsByQuery = (filtered) => {
            const query = searchQuery.value.toLowerCase();
            const searchFiltered = {};

            Object.entries(filtered).forEach(([period, specializations]) => {
                const filteredSpecializations = {};

                Object.entries(specializations).forEach(([specialization, artists]) => {
                    const filteredArtists = artists.filter(artist =>
                        artist.name.toLowerCase().includes(query) ||
                        artist.birthPlace.toLowerCase().includes(query) ||
                        period.toLowerCase().includes(query) ||
                        specialization.toLowerCase().includes(query)
                    );

                    if (filteredArtists.length) {
                        filteredSpecializations[specialization] = filteredArtists;
                    }
                });

                if (Object.keys(filteredSpecializations).length) {
                    searchFiltered[period] = filteredSpecializations;
                }
            });

            return searchFiltered;
        };

        const filteredArtists = computed(() => {
            let filtered = artistsData.value;

            if (selectedEpoch.value) {
                filtered = { [selectedEpoch.value]: filtered[selectedEpoch.value] };
            }

            if (searchQuery.value.trim()) {
                filtered = filterArtistsByQuery(filtered);
            }

            return filtered;
        });

        const getImageUrl = (photoURL) => {
            try {
                if (!photoURL.startsWith('http')) {
                    return require(`@/${photoURL}`);
                }
                return photoURL;
            } catch (e) {
                console.error(`Image not found: ${photoURL}`);
                return require('@/assets/images/default-image.png');
            }
        };

        return {
            searchQuery,
            filteredArtists,
            getImageUrl,
            epochs,
            selectedEpoch,
            filterByEpoch
        };
    }

};
</script>

<style scoped>
h1,
h2,
h3 {
    color: var(--text);
    margin: 20px 0 10px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
}

h2 {
    font-size: 20px;
    font-weight: bold;
}

h3 {
    font-size: 16px;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 10px;
}

.artist-row {
    margin-bottom: 20px;
}

.rounded-circle {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    position: relative;
    margin: 0 auto 10px;
}

.artist-card {
    padding: 20px;
    text-align: center;
    background-color: var(--cardBackground);
    border-radius: 8px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.artist-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.artist-name {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
}

.artist-details {
    font-size: 14px;
    color: #666;
}

.filter-buttons {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
}

.active-button {
    background-color: #1976d2 !important;
    color: #fff !important;
}

/* Добавление отступа сверху, чтобы контент не накладывался на хедер */
@media (max-width: 960px) {
    section {
        padding-top: 64px;
    }
}
</style>
