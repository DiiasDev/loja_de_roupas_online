<template>
    <v-row>
        <v-col>
            <v-dialog v-model="appStore.modalCadastro" max-width="600px">
                <v-card rounded="lg">
                    <v-icon class="mt-2 ml-2" @click="appStore.modalCadastro = false">mdi-close</v-icon>
                    <v-card-title class="text-h5 text-center">
                        Cadastro
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Nome" v-model="user.name" required></v-text-field>
                            <v-text-field label="Telefone" type="text" v-model="user.phone" required></v-text-field>
                            <v-text-field label="Email" type="email" v-model="user.email" required></v-text-field>
                            <v-text-field label="Senha" type="password" v-model="user.password" required></v-text-field>
                            <v-text-field label="Confirmar Senha" v-model="confirmPassword" type="password" required></v-text-field>
                            <v-btn color="primary" @click="createUser" class="mt-4">Cadastrar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
import { useAppStore } from '../../store/app.ts'
import { useDisplay } from 'vuetify'

export default {
    name: 'modalCadastro',
    data() {
        return {
            user: {
                name: '',
                phone: '',
                email: '',
                password: '',
            },
            confirmPassword: '',
            display: useDisplay(),
        }
    },
    computed: {
        appStore() {
            return useAppStore();
        },
    },
    methods: {
        createUser() {
            if (this.user.password !== this.confirmPassword) {
                alert('As senhas não coincidem');
                return;
            }

            if (Array.isArray(this.appStore.user)) {
                this.appStore.user.push({
                    name: this.user.name,
                    phone: this.user.phone,
                    email: this.user.email,
                    password: this.user.password,
                });
                this.appStore.modalCadastro = false;
            } else {
                alert('Erro ao salvar o usuário. Tente novamente.');
            }
        }
    }
}
</script>