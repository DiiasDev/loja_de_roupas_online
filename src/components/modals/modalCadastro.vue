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
                            <v-text-field label="Nome" required></v-text-field>
                            <v-text-field label="Telefone" type="text" required></v-text-field>
                            <v-text-field label="Email" type="email" required></v-text-field>
                            <v-text-field label="Senha" type="password" required></v-text-field>
                            <v-text-field label="Confirmar Senha" type="password" required></v-text-field>
                            <v-btn color="primary" class="mt-4">Cadastrar</v-btn>
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
            display: useDisplay(),
        }
    },
    computed: {
        appStore() {
            return useAppStore();
        },
    },
}
</script>