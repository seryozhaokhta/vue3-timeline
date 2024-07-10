<!-- src/components/ArticleDetail.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-img :src="getImageUrl(article.previewImage)" aspect-ratio="16/9" class="mb-4"></v-img>
                <h1>{{ article.title }}</h1>
                <v-chip-group class="mb-4">
                    <v-chip v-for="tag in article.tags" :key="tag">{{ tag }}</v-chip>
                </v-chip-group>
                <p class="text-caption mb-4">{{ article.readingTime }}</p>
                <div v-for="(paragraph, index) in article.content" :key="index">
                    <p>{{ paragraph }}</p>
                </div>
                <v-btn @click="goBack" class="mt-4">Back to Articles</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'ArticleDetail',
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const articleId = Number(route.params.id);
        const article = computed(() => store.getters.getArticleById(articleId));

        const goBack = () => {
            router.push({ name: 'ArticleList' });
        };

        const getImageUrl = (photoURL) => {
            try {
                if (!photoURL.startsWith('http')) {
                    return require(`@/assets/images/articles/${photoURL}`);
                }
                return photoURL;
            } catch (e) {
                console.error(`Image not found: ${photoURL}`);
                return require('@/assets/images/default-image.png');
            }
        };

        return {
            article,
            goBack,
            getImageUrl
        };
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

p {
    text-align: justify;
    margin-bottom: 10px;
}
</style>
