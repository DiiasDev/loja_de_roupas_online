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
                            <v-text-field label="Confirmar Senha" v-model="confirmPassword" type="password"
                                required></v-text-field>
                            <v-btn color="primary" @click="createUser" class="mt-4">Cadastrar</v-btn>
                            <v-card-text v-html="exibeMessage"></v-card-text>
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
            exibeMessage: '', 
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
            // this.exibeMessage = '<span style="color: blue;">Processando cadastro...</span>';

            const userExists = this.appStore.user.find(e => e.email === this.user.email);
            
            if (userExists) {
                this.exibeMessage = `<span style="color: red;">Usuário já cadastrado!</span>`;
                return;
            }

            if (this.user.password !== this.confirmPassword) {
                this.exibeMessage = `<span style="color: red;">As senhas não coincidem!</span>`;
                return;
            }

            this.appStore.user.push({
                name: this.user.name,
                phone: this.user.phone,
                email: this.user.email,
                password: this.user.password,
            });

            localStorage.setItem('user', JSON.stringify(this.appStore.user));
            console.log('Usuário cadastrado com sucesso:', this.appStore.user);

            this.exibeMessage = `<span style="color: green;">Usuário cadastrado com sucesso!</span>`;

            setTimeout(() => {
                this.resetForm();
                this.appStore.modalCadastro = false;
            }, 1000);
        },
        resetForm() {
            this.user = {
                name: '',
                phone: '',
                email: '',
                password: '',
            };
            this.confirmPassword = '';
            this.exibeMessage = '';
        }
    }
}
</script>