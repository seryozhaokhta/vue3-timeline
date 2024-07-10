<!-- src/components/ProfileApp.vue -->

<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card v-if="!user">
                    <v-card-title>
                        <span class="headline">{{ isLogin ? 'Login' : 'Register' }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="isLogin ? login() : register()">
                            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-btn type="submit" color="primary" class="mr-4">
                                {{ isLogin ? 'Login' : 'Register' }}
                            </v-btn>
                            <v-btn text @click="toggleForm">
                                {{ isLogin ? 'Create an account' : 'Already have an account?' }}
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
                <v-card v-else class="mt-4">
                    <v-card-title>
                        <span class="headline">Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <div class="profile-avatar-container">
                            <v-avatar size="100" class="mb-4">
                                <v-img :src="user.photo || defaultPhoto" class="clickable-avatar"></v-img>
                                <v-btn icon @click="removePhoto" class="remove-photo-btn">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-avatar>
                        </div>
                        <div class="upload-photo-container mb-4">
                            <v-icon left>mdi-camera</v-icon>
                            <span @click="selectPhoto" class="upload-photo-text">Upload Profile Photo</span>
                            <v-file-input ref="fileInput" accept="image/*" @change="updatePhoto" hidden></v-file-input>
                        </div>
                        <v-text-field v-model="user.firstName" label="First Name"
                            @change="updateProfile('firstName', user.firstName)"></v-text-field>
                        <v-text-field v-model="user.lastName" label="Last Name"
                            @change="updateProfile('lastName', user.lastName)"></v-text-field>
                        <p>Email: {{ user.email }}</p>
                        <v-btn @click="logout" color="error">Logout</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import defaultPhoto from '@/assets/images/default-image.png';

export default {
    name: 'ProfileApp',
    setup() {
        const store = useStore();
        const email = ref('');
        const password = ref('');
        const isLogin = ref(true);

        const user = computed(() => store.getters.getUser);
        const fileInput = ref(null);

        const login = async () => {
            try {
                await store.dispatch('login', { email: email.value, password: password.value });
                // убираем форму после успешного логина
                isLogin.value = false;
            } catch (error) {
                console.error('Login failed', error);
            }
        };

        const register = async () => {
            try {
                await store.dispatch('register', { email: email.value, password: password.value });
                // убираем форму после успешной регистрации
                isLogin.value = false;
            } catch (error) {
                console.error('Registration failed', error);
            }
        };

        const logout = () => {
            store.dispatch('logout');
            isLogin.value = true;
        };

        const toggleForm = () => {
            isLogin.value = !isLogin.value;
        };

        const selectPhoto = () => {
            fileInput.value.$el.click();
        };

        const updatePhoto = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const photo = event.target.result;
                    store.commit('updateUserProfile', { photo });
                };
                reader.readAsDataURL(file);
            }
        };

        const removePhoto = () => {
            store.commit('updateUserProfile', { photo: defaultPhoto });
        };

        const updateProfile = (key, value) => {
            const profileUpdate = {};
            profileUpdate[key] = value;
            store.commit('updateUserProfile', profileUpdate);
        };

        return {
            email,
            password,
            isLogin,
            login,
            register,
            logout,
            toggleForm,
            user,
            selectPhoto,
            updatePhoto,
            removePhoto,
            defaultPhoto,
            fileInput,
            updateProfile,
        };
    },
};
</script>

<style scoped>
.headline {
    text-align: center;
    width: 100%;
}

.v-btn {
    margin-top: 20px;
}

.clickable-avatar {
    cursor: pointer;
}

.profile-avatar-container {
    position: relative;
    display: inline-block;
}

.remove-photo-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 1;
}

.upload-photo-container {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.upload-photo-text {
    margin-left: 8px;
    cursor: pointer;
}
</style>
