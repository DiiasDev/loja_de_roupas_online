<template>
    <v-row class="no-scroll">
        <v-col class="d-flex align-center justify-center" cols="12">
            <v-sheet class="d-flex align-center justify-center" height="50vh" 
            :width="display.xs ? '80%' : '30%'">
                <v-card width="100%">
                    <v-card-title class="text-h5 text-center">
                        Login
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Email" type="email" required></v-text-field>
                            <v-text-field label="Senha" type="password" required></v-text-field>
                            <v-btn color="primary" class="mt-4">Entrar</v-btn>
                            <v-card-text>Ainda não tem login? Clique <strong @click="teste">aqui</strong> para cadastrar.</v-card-text>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import {useAppStore} from '../store/app.ts'
import {useDisplay} from 'vuetify'
export default{
    name: 'LoginVue',
    data(){
        return{
            display: useDisplay(),
        }
    },
    computed:{
        appStore() {
            return useAppStore();
        },
    },
    methods:{
        teste(){
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