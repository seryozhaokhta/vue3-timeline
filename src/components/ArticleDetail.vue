<!-- src/components/ArticleDetail.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ article.title }}</h1>
                <div v-for="(paragraph, index) in article.content" :key="index">
                    <p>{{ paragraph }}</p>
                </div>
                <v-btn @click="goBack">Back to Articles</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import articles from "@/data/articles.json";

export default {
    name: 'ArticleDetail',
    data() {
        return {
            article: {}
        };
    },
    created() {
        const articleId = this.$route.params.id;
        this.article = articles.find(article => article.id === Number(articleId));
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'ArticleList' });
        }
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
