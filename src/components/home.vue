<template>
    <v-layout full-height>
        <!-- Navigation Drawer Fixo -->
        <v-navigation-drawer expand-on-hover rail permanent app
        style="position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto;">
            <!-- Perfil do usuário -->
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="user@gmail.com"
                    title="Nome Sobrenome">
                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon>mdi-settings</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

            <v-divider />

            <!-- Menu de navegação -->
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home" title="Início" value="home" />
                <v-list-item prepend-icon="mdi-sale" title="Ofertas" value="offers" />
                <v-list-item prepend-icon="mdi-account" title="Meu Perfil" value="profile" />
                <v-list-item prepend-icon="mdi-cart" title="Carrinho" value="cart" />
                <v-list-item prepend-icon="mdi-information" title="Sobre a Loja" value="about" />
                <v-list-item prepend-icon="mdi-face-agent" title="Suporte" value="support" />
            </v-list>
        </v-navigation-drawer>

        <!-- Conteúdo principal -->
        <v-main>
            <v-container>
                <!-- Banner -->
                <v-row>
                    <v-col class="d-flex justify-center">
                        <v-card class="mt-3" height="35vh" width="80vw" :style="bannerStyle">
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Cards de Produtos -->
                <v-row>
                    <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="4" lg="3">
                        <v-card class="elevation-10" :hover="true" style="border-radius: 12px;">
                            <v-img :src="product.image" height="200px" style="border-radius: 12px 12px 0 0;" />
                            <v-card-title class="text-h6">{{ product.name }}</v-card-title>
                            <v-card-subtitle class="text-body-2" style="font-style: italic;">{{ product.description
                                }}</v-card-subtitle>
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
    </v-layout>
</template>


<script>
import { useAppStore } from '../store/app.ts'
import bannerImage from '@/assets/novawear.png';
export default {
    name: 'HomeVue',
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
</style>