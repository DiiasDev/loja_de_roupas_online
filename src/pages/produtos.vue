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
                
                <div class="custom-tabs-container">
                    <div class="tabs-wrapper">
                        <v-tabs 
                            v-model="categoriaSelecionada"
                            background-color="transparent"
                            slider-color="#9c64e2"
                            centered
                            class="custom-tabs"
                        >
                            <v-tab 
                                v-for="categoria in categorias" 
                                :key="categoria"
                                :value="categoria"
                                @click="selecionarCategoria(categoria)"
                                class="custom-tab"
                            >
                                {{ categoria }}
                            </v-tab>
                        </v-tabs>
                    </div>
                </div>
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
                                :color="getCategoryColor(produto.categoriaProduct)" text-color="white">
                                {{ produto.categoriaProduct }}
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
import { useAppStore } from '../store/app.ts';
import modalCadastroProduto from '../components/modals/cadastroProduto.vue'
export default {
    name: 'productsPage',
    components: {
        modalCadastroProduto
    },
    data() {
        return {
            categorias: ['Camisa', 'Calça', 'Bermuda', 'Vestido', 'Jaquetas/Moletons'],
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
        selecionarCategoria(cat) {
            this.categoriaSelecionada = cat;
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
        getCategoryIcon(category) {
            const iconMap = {
                'Camisa': 'mdi-tshirt-crew',
                'Calça': 'mdi-pants',
                'Bermuda': 'mdi-bike',
                'Vestido': 'mdi-hanger',
                'Jaquetas/Moletons': 'mdi-jacket',
            };
            return iconMap[category] || 'mdi-tag';
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
        }
    }
};
</script>

<style scoped>
.body {
    margin-left: 80px;
    background-color: #2c0d54;
    min-height: 100vh;
    color: white;
}

/* Custom tabs styling */
.custom-tabs-container {
    margin: 20px 0;
    position: relative;
}

.tabs-wrapper {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    background: rgba(92, 36, 158, 0.3);
    border-radius: 12px;
    padding: 6px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    width: 33%;
}

.custom-tabs {
    height: 54px;
}

.custom-tab {
    min-width: 110px;
    letter-spacing: 0.5px;
    text-transform: none;
    font-weight: 500;
    font-size: 15px;
    transition: all 0.3s ease;
    opacity: 0.7;
    border-radius: 8px;
    margin: 0 4px;
    padding: 0 16px;
}

.custom-tab:hover {
    background: rgba(156, 100, 226, 0.2);
    opacity: 1;
}

.custom-tab--active {
    background: rgba(156, 100, 226, 0.3) !important;
    color: white !important;
    opacity: 1 !important;
    font-weight: 600 !important;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.v-tab--active {
    background: rgba(156, 100, 226, 0.3) !important;
    color: white !important;
    opacity: 1 !important;
    font-weight: 600 !important;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.v-tabs-slider {
    height: 3px !important;
    background-color: #9c64e2 !important;
}

.v-bottom-navigation {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
}

.v-btn {
    color: white !important;
    opacity: 0.8;
}

.v-btn:hover {
    opacity: 1;
}

/* Adjust card styles to match dark theme */
.card {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    background-color: #3a1266;
    height: 100%;
    color: white;
}

.active-chip {
    background-color: var(--secondary, #03a9f4) !important;
    color: white !important;
    font-weight: bold;
    transform: translateY(-4px);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
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
    font-size: 0.85rem;
    font-weight: 600;
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

.category-nav-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
}

.category-nav-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
</style>
