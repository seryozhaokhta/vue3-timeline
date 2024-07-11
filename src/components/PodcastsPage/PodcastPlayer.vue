<!-- src/components/PodcastsPage/PodcastPlayer.vue -->

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <audio ref="audioPlayer" :src="podcast.audioUrl" controls @timeupdate="updateCurrentTime"></audio>
                <v-btn @click="addBookmark">Add Bookmark</v-btn>
                <v-btn @click="addNote">Add Note</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h2>Bookmarks</h2>
                <v-list>
                    <v-list-item v-for="bookmark in podcast.bookmarks" :key="bookmark.time">
                        <v-list-item-content>
                            <v-list-item-title>{{ formatTime(bookmark.time) }}</v-list-item-title>
                            <v-list-item-subtitle>{{ bookmark.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="removeBookmark(bookmark)"><v-icon>mdi-delete</v-icon></v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h2>Notes</h2>
                <v-list>
                    <v-list-item v-for="note in podcast.notes" :key="note.time">
                        <v-list-item-content>
                            <v-list-item-title>{{ formatTime(note.time) }}</v-list-item-title>
                            <v-list-item-subtitle>{{ note.content }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="removeNote(note)"><v-icon>mdi-delete</v-icon></v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'PodcastPlayer',
    props: {
        podcast: Object
    },
    setup(props, { emit }) {
        const audioPlayer = ref(null);
        const currentTime = ref(0);

        const updateCurrentTime = () => {
            currentTime.value = audioPlayer.value.currentTime;
        };

        const addBookmark = () => {
            const time = currentTime.value;
            const description = prompt('Enter description for the bookmark:');
            if (description) {
                emit('update:podcast', { ...props.podcast, bookmarks: [...props.podcast.bookmarks, { time, description }] });
            }
        };

        const removeBookmark = (bookmark) => {
            const bookmarks = props.podcast.bookmarks.filter(b => b !== bookmark);
            emit('update:podcast', { ...props.podcast, bookmarks });
        };

        const addNote = () => {
            const time = currentTime.value;
            const content = prompt('Enter your note:');
            if (content) {
                emit('update:podcast', { ...props.podcast, notes: [...props.podcast.notes, { time, content }] });
            }
        };

        const removeNote = (note) => {
            const notes = props.podcast.notes.filter(n => n !== note);
            emit('update:podcast', { ...props.podcast, notes });
        };

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        return {
            audioPlayer,
            currentTime,
            updateCurrentTime,
            addBookmark,
            removeBookmark,
            addNote,
            removeNote,
            formatTime
        };
    }
};
</script>

<style scoped>
h2 {
    margin-top: 20px;
}
</style>
