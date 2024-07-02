<!-- src/components/HomePage.vue -->

<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <h1>Welcome to the Art Theory App</h1>
                <p>This app is designed to help you study art theory.</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'HomePage',
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-top: 20px;
}

p {
    text-align: center;
}
</style>
