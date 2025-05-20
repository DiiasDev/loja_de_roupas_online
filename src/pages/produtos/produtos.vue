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
            <v-col v-for="produto in produtosFiltrados" :key="produto.idProduct" cols="12" sm="6" md="4" lg="3">
                <div class="card animate__animated animate__fadeInUp">
                    <div class="d-flex justify-space-between align-center mb-2">
                        <strong style="color: var(--text-primary); font-size: 1.1rem;">
                            {{ produto.productName }}
                        </strong>
                    </div>
                    <v-img :src="produto.urlImageProduct" aspect-ratio="1" class="mb-3"
                        style="border-radius: 8px;"></v-img>

                    <div class="category-container mb-2">
                        <div class="category-label">Categorias:</div>
                        <div class="category-chips">
                            <v-chip small class="mr-1 mb-1 category-chip"
                                :color="getCategoryColor(Array.isArray(produto.categoriaProduct) ? produto.categoriaProduct[0] : produto.categoriaProduct)" 
                                text-color="white">
                                {{ formatCategoryDisplay(produto.categoriaProduct) }}
                            </v-chip>
                        </div>
                    </div>

                    <p style="color: var(--text-secondary);">{{ produto.descricaoProduct }}</p>
                    <p class="mt-2" style="color: var(--primary); font-weight: bold;">
                        R$ {{ produto.precoProduct }}
                    </p>

                    <v-btn color="primary" small class="mr-2" @click="editarProduto(produto)">
                        ✏️ Editar
                    </v-btn>
                    <v-btn color="error" small outlined @click="excluirProduto(produto.idProduct)">
                        🗑️ Excluir
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <modalCadastroProduto />
    </v-container>
</template>

<script>
import { useAppStore } from '../../store/app.ts';
import modalCadastroProduto from '../../components/modals/cadastroProduto.vue';
import TabNavigation from '../../components/tabNavigation/TabNavigation.vue'
export default {
    name: 'productsPage',
    components: {
        modalCadastroProduto,
        TabNavigation
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
            this.Appstore.modalCadastroProduct = true
        },
        editarProduto(produto) {
            alert(`Editar produto: ${produto.productName}`);
        },
        excluirProduto(id) {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                this.Appstore.productsSaved = this.Appstore.productsSaved.filter(produto => produto.idProduct !== id);

                localStorage.setItem('Produtos', JSON.stringify(this.Appstore.productsSaved));
            }
        },
     
        getCategoryColor(category) {
            const colorMap = {
                'Camisa': '#2196F3',
                'Calça': '#4CAF50',
                'Bermuda': '#FF9800',
                'Vestido': '#E91E63',
                'Jaqueta/Moletom': '#9C27B0',
                'Acessórios': '#795548'
            };
            return colorMap[category] || '#607D8B';
        },
        formatCategoryDisplay(category) {
            if (Array.isArray(category)) {
                return category[0]; 
            }
            return category;
        }
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



.v-btn {
    opacity: 0.8;
}

.v-btn:hover {
    opacity: 1;
}

.card {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    padding: 16px;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    background-color: var(--card-bg);
    height: 100%;
    color: var(--text-primary);
    border: 1px solid var(--card-border);
}

.card:hover {
    box-shadow: var(--card-hover-shadow);
    transform: translateY(-2px);
    background: var(--card-highlight);
}

.animate__animated {
    animation-duration: 0.7s;
    animation-fill-mode: both;
}

.category-container {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
}

.category-label {
    color: var(--text-secondary);
    margin-bottom: 4px;
}

.category-chips {
    display: flex;
    flex-wrap: wrap;
}

.category-chip {
    font-size: 0.75rem !important;
    height: 24px !important;
    transition: transform 0.2s;
}

.category-chip:hover {
    transform: translateY(-2px);
}
</style>