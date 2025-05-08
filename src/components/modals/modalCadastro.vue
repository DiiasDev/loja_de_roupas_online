<template>
    <v-row>
        <v-col>
            <v-dialog v-model="appStore.modalCadastro" max-width="600px">
                <v-card class="modal" rounded="lg">
                    <div class="modal-header">
                        <v-icon class="close-icon" @click="appStore.modalCadastro = false">mdi-close</v-icon>
                        <v-card-title class="text-h5 text-center">
                            Cadastro
                        </v-card-title>
                    </div>
                    <v-card-text class="modal-content">
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

<style scoped>
.modal {
    background: var(--modal-bg);
    border: 1px solid var(--modal-border);
    box-shadow: var(--modal-shadow);
    border-radius: 12px;
    overflow: hidden;
}

.modal-header {
    position: relative;
    background: var(--modal-bg);
    border-bottom: 1px solid var(--modal-border);
    padding: 1rem;
}

.close-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: color 0.3s ease;
}

.close-icon:hover {
    color: var(--primary);
}

.modal-content {
    padding: 1.5rem;
}

:deep(.v-text-field) {
    margin-bottom: 1rem;
    background: transparent;
}

:deep(.v-field) {
    border-radius: 8px;
    background: var(--card-bg) !important;
    border: 1px solid var(--modal-border) !important;
}

:deep(.v-field:hover) {
    border-color: var(--primary) !important;
}

:deep(.v-field__input) {
    color: var(--text-primary) !important;
    padding: 8px 12px !important;
}

:deep(.v-label) {
    color: var(--text-secondary) !important;
    opacity: 1;
}

:deep(.v-field__outline) {
    display: none;
}

:deep(.v-field--focused) {
    border-color: var(--primary) !important;
    box-shadow: 0 0 0 1px var(--primary) !important;
}

:deep(.v-field--focused .v-label) {
    color: var(--primary) !important;
}

:deep(.v-btn) {
    width: 100%;
    margin-top: 1.5rem;
    background: var(--primary) !important;
    color: white !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

:deep(.v-btn:hover) {
    transform: translateY(-2px);
    box-shadow: var(--card-hover-shadow);
}

.text-center {
    color: var(--text-primary);
}
</style>