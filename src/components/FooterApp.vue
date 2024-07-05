<!-- src/components/FooterApp.vue -->

<template>
    <v-footer app class="footer" :class="{ collapsed: isCollapsed }">
        <v-container>
            <div class="toggle-area" @click="toggleFooter">
                <div class="ellipse"></div>
                <div class="ellipse"></div>
                <div class="ellipse"></div>
            </div>
            <v-divider v-if="!isCollapsed"></v-divider>
            <transition name="fade">
                <div v-if="!isCollapsed" class="support-links">
                    <span>Support the project:</span>
                    <a :href="boostyLink" target="_blank" rel="noopener" class="support-link">
                        Boosty
                    </a>
                    <a :href="patreonLink" target="_blank" rel="noopener" class="support-link">
                        Patreon
                    </a>
                </div>
            </transition>
            <transition name="fade">
                <p v-if="!isCollapsed">&copy; 2024 Art Theory App. All rights reserved.</p>
            </transition>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterApp',
    data() {
        return {
            boostyLink: 'https://boosty.to', // Replace with your actual Boosty link
            patreonLink: 'https://patreon.com', // Replace with your actual Patreon link
            isCollapsed: false,
        };
    },
    methods: {
        toggleFooter() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
};
</script>

<style scoped>
.footer {
    background-color: var(--v-background-base);
    color: var(--v-theme-on-background);
    padding: 16px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    z-index: 1000;
    transform: translateY(0);
    transition: all 0.5s ease;
    overflow: hidden;
    height: auto;
    max-height: 200px;
    /* Adjust based on the content height */
}

.footer.collapsed {
    transform: translateY(calc(100% - 24px));
    max-height: 24px;
    padding: 0;
}

.toggle-area {
    display: flex;
    justify-content: center;
    cursor: pointer;
}

.ellipse {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: grey;
    border-radius: 50%;
}

.support-links {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    transition: opacity 0.5s ease;
}

.support-link {
    color: var(--v-theme-on-background);
    text-decoration: none;
    font-weight: bold;
}

.support-link:hover {
    text-decoration: underline;
}

p {
    margin: 0;
    font-size: 14px;
    transition: opacity 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
