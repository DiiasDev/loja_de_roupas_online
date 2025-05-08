<template>
    <v-row justify="center">
        <v-col cols="12" md="6">
            <v-dialog v-model="appStore.modalSuporte" max-width="450" transition="dialog-bottom-transition">
                <v-card class="modal pa-4">
                    <div class="d-flex justify-end">
                        <v-btn icon @click="appStore.modalSuporte = false" class="close-btn" :color="btnColor">
                            <v-icon color="white">mdi-close</v-icon>
                        </v-btn>
                    </div>

                    <v-card-title class="modal-header d-flex text-h5 font-weight-bold justify-center align-center">
                        <span class="me-2">🎧</span>
                        Suporte ao Cliente
                    </v-card-title>

                    <v-card-text class="mt-4 text-center support-text">
                        Estamos aqui para te ajudar! 💬<br>
                        Envie sua dúvida e nossa equipe responderá o mais rápido possível.
                    </v-card-text>

                    <v-card-actions class="d-flex flex-column mt-6">
                        <v-btn @click="redirecionaMail" class="support-btn" block>
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
    computed: {
        appStore() {
            return useAppStore()
        },
        btnColor() {
            return this.$vuetify.theme.dark ? 'var(--modal-header)' : 'blue lighten-1'
        },
        iconColor() {
            return this.$vuetify.theme.dark ? 'var(--modal-header)' : 'blue lighten-1'
        }
    },
    methods:{
        redirecionaMail(){
            window.open('https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlFmXZCxZJLngfPfKbBrxGFdRCGbDTCbDrMBXVrnlkWktSnFjNtqFHTBprmBLBvkqvhSRL', '_blank');
        }
    }
}
</script>

<style scoped>
.modal {
    background: var(--modal-bg) !important;
    border: 1px solid var(--modal-border) !important;
    box-shadow: var(--modal-shadow) !important;
    border-radius: 16px;
    color: var(--text-primary) !important;
    backdrop-filter: blur(10px);
}

.modal-header {
    color: var(--modal-header) !important;
    border-bottom: 2px solid var(--modal-border);
    padding: 1rem;
    font-size: 1.5rem;
    letter-spacing: 0.5px;
}

.support-text {
    color: var(--text-secondary) !important;
}

.close-btn {
    color: var(--primary) !important;
}

.support-btn {
    background-color: var(--primary) !important;
    color: var(--surface) !important;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.support-btn:hover {
    background-color: var(--secondary) !important;
    box-shadow: var(--card-hover-shadow);
    transform: translateY(-2px);
}
</style>