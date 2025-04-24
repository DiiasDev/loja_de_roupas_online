<template>
    <v-row class="no-scroll">
        <v-col class="d-flex align-center justify-center" cols="12">
            <v-card rounded="lg" :width="display.xs ? '80%' : '30%'">
                <v-card-title class="text-h5 text-center">
                    Login
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Email" type="email" v-model="email" required></v-text-field>
                        <v-text-field label="Senha" type="password" v-model="password" required></v-text-field>
                        <v-btn color="primary" @click="isLoged" class="mt-4">Entrar</v-btn>
                        <v-card-text>Ainda não tem login? Clique <strong style="cursor: pointer;"
                                @click="openModal">aqui</strong> para
                            cadastrar.</v-card-text>
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
import modalCadastro from './modals/modalCadastro.vue'
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
    },
    methods: {
        openModal() {
            try {
                this.appStore.modalCadastro = true;
            } catch (e) {
                console.error("Erro ao abrir o modal: ", e);
            }
        },
        isLoged() {
            try {
                const user = this.appStore.user;
                const userExist = user.find(e => e.email === this.email && e.password === this.password);

                if (!userExist) {
                    alert('Usuário não encontrado!');
                    return;
                }

                alert('Login realizado com sucesso!');
                this.appStore.isLoged = true;
            }
           catch (e) {
                console.error("Erro ao realizar login: ", e);
            }
        }
    }
}
</script>

<style scoped>
.no-scroll {
    overflow: auto;
    height: 100vh;
    width: 100vw;
}
</style>