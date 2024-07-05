<!-- src/components/ArticleList.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Articles</h1>
                <v-list>
                    <v-list-item v-for="article in articles" :key="article.id" @click="goToArticle(article.id)"
                        class="article-item">
                        <v-list-item-avatar>
                            <v-img :src="article.previewImage" class="preview-image"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ article.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ article.subtitle }}</v-list-item-subtitle>
                            <v-chip-group>
                                <v-chip v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</v-chip>
                            </v-chip-group>
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

.article-item {
    cursor: pointer;
    transition: border 0.3s;
    padding: 10px;
}

.preview-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-right: 16px;
}

v-list-item-avatar {
    margin-left: auto;
}

.tag {
    margin: 4px;
}

@media (max-width: 600px) {
    .preview-image {
        width: 60px;
        height: 60px;
    }
}
</style>
