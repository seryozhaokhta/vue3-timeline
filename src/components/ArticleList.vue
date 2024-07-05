<!-- src/components/ArticleList.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Articles</h1>
                <v-list>
                    <v-list-item v-for="article in articles" :key="article.id" @click="goToArticle(article.id)">
                        <v-list-item-content>
                            <v-list-item-title>{{ article.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ article.subtitle }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import articles from "@/data/articles.json";

export default {
    name: 'ArticleList',
    data() {
        return {
            articles
        };
    },
    methods: {
        goToArticle(id) {
            this.$router.push({ name: 'ArticleDetail', params: { id } });
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
