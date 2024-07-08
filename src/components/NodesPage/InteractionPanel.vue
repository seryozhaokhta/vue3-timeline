<!-- src/components/NodesApp/InteractionPanel.vue -->

<template>
    <v-container class="interaction-panel" fluid>
        <v-row>
            <v-col cols="12" md="3">
                <v-select :modelValue="selectedEpoch" :items="['All', ...epochNames]" label="Select Epoch" clearable
                    @update:modelValue="updateSelectedEpoch"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select :modelValue="selectedSpecialization" :items="['All', ...specializations]"
                    label="Select Specialization" clearable
                    @update:modelValue="updateSelectedSpecialization"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field :modelValue="searchQuery" label="Search Artists"
                    @update:modelValue="updateSearchQuery"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-btn @click="$emit('resetFilters')" class="mt-7">Reset Filters</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-btn @click="$emit('alignNodes', 'default')">Default Layout</v-btn>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn @click="$emit('alignNodes', 'horizontal')">Horizontal Layout</v-btn>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn @click="$emit('alignNodes', 'grid')">Grid Layout</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'InteractionPanel',
    props: {
        selectedEpoch: String,
        epochNames: Array,
        selectedSpecialization: String,
        specializations: Array,
        searchQuery: String,
    },
    methods: {
        updateSelectedEpoch(value) {
            this.$emit('update:selectedEpoch', value);
        },
        updateSelectedSpecialization(value) {
            this.$emit('update:selectedSpecialization', value);
        },
        updateSearchQuery(value) {
            this.$emit('update:searchQuery', value);
        }
    }
};
</script>

<style scoped>
.interaction-panel {
    margin-bottom: 20px;
}
</style>
