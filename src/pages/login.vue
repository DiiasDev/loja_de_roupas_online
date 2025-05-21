<template>
    <v-row class="no-scroll">
        <v-col class="d-flex align-center justify-center" cols="12">
            <v-card rounded="lg" :width="getCardWidth" :class="{'pa-2 ml-4': display.xs, 'pa-4': display.sm || display.md}">
                <v-card-title class="text-h5 text-center" :class="{'text-h6': display.xs}">
                    Login
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Email" type="email" v-model="email" required :density="display.xs ? 'compact' : 'default'"></v-text-field>
                        <v-text-field label="Senha" type="password" v-model="password" required :density="display.xs ? 'compact' : 'default'"></v-text-field>
                        <v-btn color="primary" @click="login" class="mt-4" :block="display.xs || display.sm">Entrar</v-btn>
                        <v-card-text class="px-0">Ainda não tem login? Clique <strong style="cursor: pointer;"
                                @click="openModal">aqui</strong> para
                            cadastrar.</v-card-text>
                        <v-card-text class="px-0" v-html="exibeMessage"></v-card-text>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <modalCadastro />
</template>

<script>
import { useAppStore } from '../store/app.ts'
import { useDisplay } from 'vuetify'
import modalCadastro from '../components/modals/modalCadastro.vue'
export default {
    name: 'LoginVue',
    components: {
        modalCadastro
    },
    data() {
        return {
            display: useDisplay(),
            email: '',
            password: '',
            exibeMessage: '',
        }
    },
    computed: {
        appStore() {
            return useAppStore();
        },
        getCardWidth() {
            if (this.display.xs) return '90%'
            if (this.display.sm) return '70%'
            if (this.display.md) return '50%'
            return '30%'
        }
    },
    methods: {
        openModal() {
            try {
                this.appStore.modalCadastro = true;
            } catch (e) {
                console.error("Erro ao abrir o modal: ", e);
            }
        },
        login() {
            const credentials = {
                email: this.email,
                password: this.password
            };
            
            const success = this.appStore.login(credentials);
            if (success) {
                console.log('Login successful');
                this.appStore.isHome = true;
            } else {
                console.log('Login failed - invalid credentials');
            }
        }
    }
}
</script>

<style scoped>
.no-scroll {
    height: 100vh;
    width: 100vw;
}

.v-application {
    overflow-y: hidden !important;
}

html {
    overflow-y: hidden !important;
}

@media (max-width: 600px) {
    .v-card-title {
        margin-bottom: 0;
    }
    
    .v-card-text {
        padding-top: 8px;
    }
}
</style>