<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title>
                    Meu Perfil
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { useAppStore } from '@/stores/app.ts'

export default{
    name: 'MeuPerfil',
    data() {
        return {
        };
    },
    computed: {
        appStore() {
            return useAppStore();
        },
    },
    methods: {
      
    }
}
</script>