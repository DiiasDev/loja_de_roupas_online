<template>
    <NavigationVue />
    <v-main class="main-scroll body">
        <v-container fluid class="px-2 px-sm-3 px-md-6">
            <v-row class="mx-0 mx-sm-2" v-if="!appStore.isPerfil" dense align="center" no-gutters>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="mt-3 banner-card" :style="bannerStyle">
                    </v-card>
                </v-col>
                <v-col class="d-flex justify-center" style="margin: auto;" cols="12">
                    <TabNavigation style="width: 90% !important;" v-model="categoriaSelecionada"
                        @change="onCategoriaChange" />
                </v-col>
            </v-row>

            <v-row :class="!display.xs?  'ml-10' : ''">
                <CardsProduto :style="!display.xs? 'ml-9' : 'mr-4'" v-if="appStore.isHome == true"
                    :produtos="produtosFiltrados" />
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
import { useDisplay } from 'vuetify';

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
            display: useDisplay(),
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
            // Home page should show all products from all users, but filtered by category
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

.banner-card {
    width: 95%;
    height: 30vh;
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
    margin-top: 15px;
}

.v-col {
    margin-bottom: 15px;
}

.v-navigation-drawer .v-list-item {
    font-weight: 500;
}

.v-main {
    background-color: #f4f4f4;
}

/* Responsive styles */
@media (min-width: 600px) {
    .banner-card {
        width: 90%;
        height: 35vh;
    }

    .v-row {
        margin-top: 20px;
    }
}

@media (min-width: 960px) {
    .banner-card {
        width: 80vw;
        height: 35vh;
    }

    .v-row {
        margin-top: 30px;
    }
}

@media (max-width: 599px) {
    .v-container {
        padding: 8px !important;
    }

    .v-col {
        padding: 8px !important;
        margin-bottom: 8px;
    }
}
</style>
