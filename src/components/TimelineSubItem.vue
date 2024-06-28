<!-- src/components/TimelineSubItem.vue -->

<template>
    <v-list-item-content class="sub-item-content">
        <div class="d-flex flex-column align-items-start">
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="subItem.dates">{{ subItem.dates }}</v-list-item-subtitle>
            <v-btn v-if="subItem.expandable" @click="toggleExpand(subItem)" class="styled-button">
                {{ subItem.expanded ? 'Collapse' : 'Expand' }}
            </v-btn>
            <v-expand-transition>
                <v-list v-if="subItem.expanded">
                    <template v-if="subItem.type === 'subperiods'">
                        <v-list-item v-for="subperiod in subItem.subperiods" :key="subperiod.title">
                            <v-list-item-content>
                                <v-list-item-title>{{ subperiod.title }}</v-list-item-title>
                                <v-list-item-subtitle v-if="subperiod.dates">{{ subperiod.dates
                                    }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <template v-else-if="subItem.type === 'schools'">
                        <v-list-item v-for="school in subItem.schools" :key="school.title">
                            <v-list-item-content>
                                <v-list-item-title>{{ school.title }}</v-list-item-title>
                                <v-list-item-subtitle v-if="school.dates">{{ school.dates }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <template v-else-if="subItem.type === 'transition'">
                        <v-list-item v-for="transition in subItem.transition" :key="transition.title">
                            <v-list-item-content>
                                <v-list-item-title>{{ transition.title }}</v-list-item-title>
                                <v-list-item-subtitle v-if="transition.dates">{{ transition.dates
                                    }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <template v-else-if="subItem.type === 'crisis'">
                        <v-list-item v-for="crisis in subItem.crisis" :key="crisis.title">
                            <v-list-item-content>
                                <v-list-item-title>{{ crisis.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
            </v-expand-transition>
        </div>
    </v-list-item-content>
</template>

<script>
export default {
    props: {
        subItem: Object
    },
    methods: {
        toggleExpand(item) {
            item.expanded = !item.expanded;
        }
    }
};
</script>

<style scoped>
.sub-item-content {
    margin-left: 0;
    /* Adjust this value as needed to shift the content */
}

.styled-button {
    background-color: #666666;
    color: white;
    text-transform: none;
    margin: 5px 0;
}

.styled-button:hover {
    background-color: #999999;
}
</style>
