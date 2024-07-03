<!-- src/components/FooterApp.vue -->

<template>
    <v-footer app padless class="footer">
        <v-container class="text-center">
            <v-divider></v-divider>
            <p>&copy; 2024 Art Theory App. All rights reserved.</p>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterApp',
};
</script>

<style scoped>
.footer {
    background-color: var(--v-background-base);
    color: var(--v-theme-on-background);
    padding: 16px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
}

p {
    margin: 0;
    font-size: 14px;
}
</style>
