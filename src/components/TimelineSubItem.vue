<!-- src/components/TimelineSubItem.vue -->

<template>
    <v-list-item-content class="sub-item-content">
        <div class="">
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="subItem.dates">{{ subItem.dates }}</v-list-item-subtitle>
            <v-btn v-if="subItem.expandable" @click="toggleExpand(subItem)" class="styled-button">
                <v-icon v-if="subItem.type === 'subperiods'">
                    <img :src="require('@/assets/subperiodsIcon.svg')" alt="Subperiods Icon" />
                </v-icon>
                <v-icon v-else-if="subItem.type === 'schools'">
                    <img :src="require('@/assets/schoolsIcon.svg')" alt="Schools Icon" />
                </v-icon>
                <v-icon v-else-if="subItem.type === 'transition'">
                    <img :src="require('@/assets/transitionIcon.svg')" alt="Transition Icon" />
                </v-icon>
                <v-icon v-else-if="subItem.type === 'crisis'">
                    <img :src="require('@/assets/crisisIcon.svg')" alt="Crisis Icon" />
                </v-icon>
                {{ subItem.expanded ? 'Collapse' : 'Expand' }}
            </v-btn>
            <v-expand-transition>
                <v-list v-if="subItem.expanded">
                    <template v-for="subType in subItemTypes" :key="subType.type">
                        <v-list-item v-for="item in subType.items" :key="item.title">
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle v-if="item.dates">{{ item.dates }}</v-list-item-subtitle>
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
    computed: {
        subItemTypes() {
            const types = ['subperiods', 'schools', 'transition', 'crisis'];
            return types
                .map(type => ({
                    type,
                    items: this.subItem[type] || []
                }))
                .filter(subType => subType.items.length > 0);
        }
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
}

.styled-button {
    background-color: #666666;
    color: white;
    text-transform: none;
    margin: 5px 0;
    display: flex;
    align-items: center;
}

.styled-button v-icon {
    margin-right: 8px;
}

.styled-button:hover {
    background-color: #999999;
}
</style>
