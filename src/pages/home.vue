<template>
    <NavigationVue />
    <v-main class="main-scroll body">
        <v-container fluid>
            <v-row class="ml-3" v-if="!appStore.isPerfil" dense align="center" no-gutters>
                <v-col class="d-flex justify-center">
                    <v-card class="mt-3" height="35vh" width="80vw" :style="bannerStyle">
                    </v-card>
                </v-col>
                <TabNavigation v-model="categoriaSelecionada" @change="onCategoriaChange" />
            </v-row>

            <v-row> 
                <CardsProduto v-if="appStore.isHome == true" :produtos="produtosFiltrados" />
            </v-row>

        </v-container>
    </v-main>
</template>

<script>
import { useAppStore } from '../store/app.ts'
import bannerImage from '@/assets/novawear.png';
import NavigationVue from '../components/reutilizaveis/navigation.vue'
import TabNavigation from '../components/tabNavigation/TabNavigation.vue'
import CardsProduto from '../components/cardsProduto/CardsProduto.vue'

export default {
    name: 'HomeVue',
    components: {
        NavigationVue,
        TabNavigation,
        CardsProduto
    },
    data() {
        return {
            bannerStyle: {
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            },
            categoriaSelecionada: 'Camisa',
        }
    },
    mounted() {
        this.appStore.loadProductsFromStorage();
    },
    computed: {
        appStore() {
            return useAppStore();
        },
        produtosFiltrados() {
            return this.appStore.productsSaved.filter(p => {
                // Handle if categoriaProduct is a string
                if (typeof p.categoriaProduct === 'string') {
                    return p.categoriaProduct === this.categoriaSelecionada;
                }

                // Handle if categoriaProduct is an array
                if (Array.isArray(p.categoriaProduct)) {
                    return p.categoriaProduct.includes(this.categoriaSelecionada);
                }

                return false;
            });
        },
    },
    methods: {
        onCategoriaChange(categoria) {
            this.categoriaSelecionada = categoria;
        },
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
