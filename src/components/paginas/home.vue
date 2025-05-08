<template>
    <NavigationVue />
    <v-main class="main-scroll body">
        <v-container fluid>
            <v-row class="ml-3" v-if="!appStore.isPerfil" dense align="center" no-gutters>
                <v-col class="d-flex justify-center">
                    <v-card class="mt-3" height="35vh" width="80vw" :style="bannerStyle">
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="ml-6" v-if="!appStore.isPerfil" style="margin-top: 64px; padding: 0 16px;"> <!-- Ajuste o valor conforme necessário -->
                <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="6" lg="3">
                    <v-card class="custom-card elevation-0" :hover="true">
                        <v-img :src="product.image" height="200px" style="border-radius: 12px 12px 0 0;" />
                        <v-card-title class="text-h6">{{ product.name }}</v-card-title>
                        <v-card-subtitle class="text-body-2">{{ product.description }}</v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="primary" class="custom-button">
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
import NavigationVue from '../reutilizaveis/navigation.vue'
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

.custom-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    box-shadow: var(--card-shadow);
    border-radius: 12px;
    padding: 1rem;
    transition: all 0.3s ease;
}

.custom-card:hover {
    box-shadow: var(--card-hover-shadow);
    transform: translateY(-2px);
    background: var(--card-highlight);
}

.custom-button {
    width: 100%;
    font-weight: bold;
    color: var(--text-primary);
    background: var(--primary);
    transition: background-color 0.3s ease;
}

.custom-button:hover {
    background-color: var(--secondary) !important;
}

.v-card-title {
    color: var(--text-primary);
    font-weight: bold;
}

.v-card-subtitle {
    color: var(--text-secondary);
}

.main-scroll {
    background: var(--background);
    min-height: 100vh;
    overflow-y: auto;
    padding-bottom: 50px;
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
</style>
