<template>
    <NavigationVue />
    <v-main class="main-scroll">
        <v-container fluid>
            <v-row class="ml-3" v-if="!appStore.isPerfil" dense align="center" no-gutters>
                <v-col class="d-flex justify-center">
                    <v-card class="mt-3" height="35vh" width="80vw" :style="bannerStyle">
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="ml-6" v-if="!appStore.isPerfil" style="margin-top: 64px; padding: 0 16px;"> <!-- Ajuste o valor conforme necessário -->
                <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="6" lg="4">
                    <v-card class="elevation-10" :hover="true" style="border-radius: 12px;">
                        <v-img :src="product.image" height="200px" style="border-radius: 12px 12px 0 0;" />
                        <v-card-title class="text-h6">{{ product.name }}</v-card-title>
                        <v-card-subtitle class="text-body-2" style="font-style: italic;">{{ product.description }}</v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="primary" style="width: 100%; font-weight: bold;">
                                Adicionar ao Carrinho
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </v-main>
</template>

<script>
import { useAppStore } from '../../store/app.ts'
import bannerImage from '@/assets/novawear.png';
import NavigationVue from '../reutilizaveis/navgation.vue'
// import CarrinhoDeCompras from '../modals/carrinhoDeCompras.vue'
// import modalSuporte from '../modals/suporte.vue'

export default {
    name: 'HomeVue',
    components: {
        // CarrinhoDeCompras,
        // modalSuporte,
        NavigationVue
    },
    data() {
        return {
            products: [
                { name: 'Camiseta Básica', description: 'Camiseta confortável para o dia a dia.', image: '@/assets/camiseta.jpg' },
                { name: 'Jaqueta de Couro', description: 'Estilo e elegância para qualquer ocasião.', image: '@/assets/jaqueta.jpg' },
                { name: 'Calça Jeans', description: 'A calça perfeita para qualquer look.', image: '@/assets/calca.jpg' },
                { name: 'Camiseta Básica', description: 'Camiseta confortável para o dia a dia.', image: '@/assets/camiseta.jpg' },
                { name: 'Camiseta Básica', description: 'Camiseta confortável para o dia a dia.', image: '@/assets/camiseta.jpg' },
                { name: 'Camiseta Básica', description: 'Camiseta confortável para o dia a dia.', image: '@/assets/camiseta.jpg' },
                { name: 'Camiseta Básica', description: 'Camiseta confortável para o dia a dia.', image: '@/assets/camiseta.jpg' },
            ],
            bannerStyle: {
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        }
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

<style scoped>
.v-navigation-drawer {
    background-color: #fafafa;
}

.v-card-title {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: white;
}

.v-card-subtitle {
    font-style: italic;
    color: #757575;
}

.v-btn {
    font-weight: 600;
}

.v-btn:hover {
    background-color: #1976D2 !important;
}

.v-row {
    margin-top: 30px;
}

.v-col {
    margin-bottom: 20px;
}

.v-navigation-drawer .v-list-item {
    font-weight: 500;
}

.v-main {
    background-color: #f4f4f4;
}

.main-scroll {
    min-height: 100vh;
    overflow-y: auto;
    padding-bottom: 50px;
}
</style>
