<!-- src/components/TimelineSubItem.vue -->

<template>
    <div class="sub-item-content" data-aos="fade-up">
        <div class="list-container">
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="subItem.dates">{{ subItem.dates }}</v-list-item-subtitle>
            <v-btn v-if="subItem.expandable" @click="expanded = !expanded" class="styled-button">
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
                {{ expanded ? 'Collapse' : 'Expand' }}
            </v-btn>
            <v-expand-transition>
                <v-list v-show="expanded" ref="subList">
                    <template v-for="subType in subItemTypes" :key="subType.type">
                        <v-list-item v-for="item in subType.items" :key="item.title" data-aos="fade-up"
                            data-aos-delay="50">
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle v-if="item.dates">{{ item.dates }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
            </v-expand-transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        subItem: Object,
        modelValue: Boolean
    },
    data() {
        return {
            expanded: this.modelValue
        }
    },
    computed: {
        subItemTypes() {
            const types = ['subperiods', 'schools', 'transition', 'crisis'];
            return types.map(type => ({
                type,
                items: this.subItem[type] || []
            })).filter(subType => subType.items.length > 0);
        }
    },
    emits: ['update:modelValue'],
    mounted() {
        this.initAOS();
    },
    watch: {
        modelValue(newValue) {
            this.expanded = newValue;
        },
        expanded(newValue) {
            this.$emit('update:modelValue', newValue);

            if (newValue) {
                this.initAOS();
            }
        }
    },
    methods: {
        toggleExpand(item) {
            item.expanded = !item.expanded;
        },
        initAOS() {
            if (this.$root.AOS) {
                this.$root.AOS.refreshHard();
            } else {
                setTimeout(this.initAOS, 100);
            }
        }
    }
};
</script>

<style scoped>
.sub-item-content {
    margin-left: 0;
    padding: 10px 20px;
    background-color: var(--cardBackground);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
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

.list-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 450px;
}

.v-list::-webkit-scrollbar {
    display: none;
}

/* Добавление отступа сверху, чтобы контент не накладывался на хедер */
@media (max-width: 960px) {
    .sub-item-content {
        margin-top: 64px;
    }
}
</style>
