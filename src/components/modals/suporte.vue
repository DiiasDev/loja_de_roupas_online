<template>
    <v-row justify="center">
        <v-col cols="12" md="6">
            <v-dialog v-model="appStore.modalSuporte" max-width="450" transition="dialog-bottom-transition">
                <v-card class="pa-4" style="background-color: #ffffff; border-radius: 12px;">
                    <div class="d-flex justify-end">
                        <v-btn icon @click="appStore.modalSuporte = false" color="blue lighten-1">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>

                    <v-card-title class="text-h5 font-weight-bold justify-center text-center" style="color: #1E88E5;">
                        <v-icon size="36" color="blue lighten-1" class="mr-2">mdi-headset</v-icon>
                        Suporte ao Cliente
                    </v-card-title>

                    <v-card-text class="mt-4 text-center" style="color: #555;">
                        Estamos aqui para te ajudar! 💬<br>
                        Envie sua dúvida e nossa equipe responderá o mais rápido possível.
                    </v-card-text>

                    <v-card-actions class="d-flex flex-column mt-6">
                        <v-btn @click="redirecionaMail" color="blue lighten-1" block style="color: white;">
                            Falar com o Suporte
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>


<script>
import { useAppStore } from '@/store/app.ts';

export default {
    name: 'modalSuporte',
    data() {
        return {

        }
    },
    computed: {
        appStore() {
            return useAppStore()
        }
    },
    methods:{
        redirecionaMail(){
            window.open('https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlFmXZCxZJLngfPfKbBrxGFdRCGbDTCbDrMBXVrnlkWktSnFjNtqFHTBprmBLBvkqvhSRL', '_blank');
        }
    }
}
</script>