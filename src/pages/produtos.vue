<template>
    <v-container fluid class="body">
        <v-row>
            <v-col cols="12" class="text-center mb-6">
                <h1 style="color: var(--text-primary); font-weight: bold;">
                    🛍️ Produtos da Loja
                </h1>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">
                    Explore, adicione ou edite produtos por categoria.
                </p>
                <v-btn color="primary" dark class="my-4" @click="criarProduto">
                    ➕ Adicionar Produto
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="mb-4" justify="center">
            <v-chip v-for="categoria in Appstore.categories" :key="categoria" class="ma-2" text-color="white" outlined
                @click="selecionarCategoria(categoria)" :class="{ 'active-chip': categoria === categoriaSelecionada }">
                {{ categoria }}
            </v-chip>
        </v-row>

        <v-row>
            <v-col v-for="produto in Appstore.productsSaved" :key="produto.id" cols="12" sm="6" md="4" lg="3">
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
                            <v-chip v-for="(cat, index) in produto.categoriaProduct" :key="index" x-small
                                class="mr-1 mb-1 category-chip" :color="getCategoryColor(cat)" text-color="white">
                                {{ cat }}
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
            categorias: ['Todos', 'Camisa', 'Calça', 'Bermuda', 'Vestido', 'Acessórios'],
            categoriaSelecionada: 'Todos',
        };
    },
    computed: {
        produtosFiltrados() {
            if (this.categoriaSelecionada === 'Todos') return this.produtos;
            return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
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
        getCategoryColor(category) {
            const colorMap = {
                'Todos': '#607D8B',
                'Camisa': '#2196F3',
                'Calça': '#4CAF50',
                'Bermuda': '#FF9800',
                'Vestido': '#E91E63',
                'Jaquetas/Moletons': '#9C27B0',
                'Acessórios': '#795548'
            };
            return colorMap[category] || '#607D8B';
        }
    }
};
</script>

<style scoped>
.active-chip {
    background-color: var(--secondary) !important;
    color: white !important;
}

.animate__animated {
    animation-duration: 0.7s;
    animation-fill-mode: both;
}

.card {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: var(--card-bg, white);
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
    height: 22px !important;
    transition: transform 0.2s;
}

.category-chip:hover {
    transform: translateY(-2px);
}

.body {
    margin-left: 80px;
}
</style>
