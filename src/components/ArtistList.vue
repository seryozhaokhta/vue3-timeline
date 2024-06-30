<!-- src/components/ArtistList.vue -->

<template>
    <div>
        <v-text-field v-model="searchQuery" label="Search artists..." outlined dense>
            <template #prepend>
                <v-icon>
                    <!-- Предполагаем, что иконка находится в папке assets/icons -->
                    <img :src="require('@/assets/search.svg')" alt="Search" />
                </v-icon>
            </template>
        </v-text-field>
        <h1>Artists by Epoch</h1>
        <div v-for="(period, periodName) in filteredArtists" :key="periodName">
            <h2>{{ periodName }}</h2>
            <div class="artist-row" v-for="(artists, specialization) in period" :key="specialization">
                <h3>{{ specialization }}</h3>
                <v-row>
                    <v-col v-for="artist in artists" :key="artist.name" cols="12" sm="6" md="4" lg="3">
                        <v-card>
                            <div class="rounded-circle"
                                :style="{ backgroundImage: 'url(' + getImageUrl(artist.photoURL) + ')' }"></div>
                            <v-card-title>{{ artist.name }}</v-card-title>
                            <v-card-subtitle>{{ artist.birthPlace }} ({{ artist.years }})</v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
import artists from '@/data/artists-by-specialization-and-period-english.json';

export default {
    data() {
        return {
            artists,
            searchQuery: '',
        };
    },
    computed: {
        filteredArtists() {
            if (!this.searchQuery.trim()) {
                return this.artists;
            }

            const query = this.searchQuery.toLowerCase();
            const filtered = {};

            Object.entries(this.artists).forEach(([period, specializations]) => {
                Object.entries(specializations).forEach(([specialization, artists]) => {
                    const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(query) || artist.birthPlace.toLowerCase().includes(query) || period.toLowerCase().includes(query));

                    if (filteredArtists.length) {
                        if (!filtered[period]) {
                            filtered[period] = {};
                        }
                        filtered[period][specialization] = filteredArtists;
                    }
                });
            });

            return filtered;
        }
    },
    methods: {
        getImageUrl(photoURL) {
            try {
                if (!photoURL.startsWith('http')) {
                    return require(`@/${photoURL}`);
                }
                return photoURL;
            } catch (e) {
                console.error(`Image not found: ${photoURL}`);
                return '';
            }
        }
    }
};
</script>

<style scoped>
h1,
h2,
h3 {
    color: #333;
}

.artist-row {
    margin-bottom: 10px;
}

.rounded-circle {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    position: relative;
}
</style>