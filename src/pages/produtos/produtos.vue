<template>
    <v-container fluid class="body">
        <v-row>
            <v-col cols="12" class="text-center mb-2">
                <h1 style="color: var(--text-primary); font-weight: bold;">
                    🛍️ Produtos da Loja
                </h1>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">
                    Explore, adicione ou edite produtos por categoria.
                </p>
                <v-btn color="primary" dark class="my-4" @click="criarProduto">
                    ➕ ADICIONAR PRODUTO
                </v-btn>
                
                <TabNavigation v-model="categoriaSelecionada" @change="onCategoriaChange"/>
            </v-col>
        </v-row>

        <v-row>
           <CardsProduto :produtos="produtosFiltrados" />
        </v-row>
        <modalCadastroProduto />
    </v-container>
</template>

<script>
import { useAppStore } from '../../store/app.ts';
import modalCadastroProduto from '../../components/modals/cadastroProduto.vue';
import TabNavigation from '../../components/tabNavigation/TabNavigation.vue'
import CardsProduto from '../../components/cardsProduto/CardsProduto.vue'
export default {
    name: 'productsPage',
    components: {
        modalCadastroProduto,
        TabNavigation,
        CardsProduto
    },
    data() {
        return {
            categoriaSelecionada: 'Camisa',
        };
    },
    mounted() {
        this.Appstore.loadProductsFromStorage();
    },
    computed: {
        produtosFiltrados() {
            return this.Appstore.productsSaved.filter(p => {
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
        Appstore() {
            return useAppStore()
        }
    },
    methods: {
        onCategoriaChange(categoria) {
            this.categoriaSelecionada = categoria;
        },
        criarProduto() {
            this.Appstore.modalCadastroProduct = true;
            this.Appstore.isEditing = false;
            this.Appstore.selectedProduct = null;
        },
    }
};
</script>


<style scoped>
.body {
    margin-left: 80px;
    background: var(--background);
    min-height: 100vh;
    color: var(--text-primary);
    transition: background 0.3s, color 0.3s;
}
</style>