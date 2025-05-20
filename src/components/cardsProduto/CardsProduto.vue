<template>
    <v-col v-for="produto in produtos" :key="produto.idProduct" cols="12" sm="6" md="4" lg="3">
        <div class="card animate__animated animate__fadeInUp">
            <div class="d-flex justify-space-between align-center mb-2">
                <strong style="color: var(--text-primary); font-size: 1.1rem;">
                    {{ produto.productName }}
                </strong>
            </div>
            <v-img :src="produto.urlImageProduct" aspect-ratio="1" class="mb-3" style="border-radius: 8px;"></v-img>

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

            <!-- <v-btn color="primary" small class="mr-2" @click="editarProduto(produto)">
                ✏️ Editar
            </v-btn> -->
            <v-btn color="error" small outlined @click="excluirProduto(produto.idProduct)">
                🗑️ Excluir
            </v-btn>
        </div>
    </v-col>
</template>

<script>
import { useAppStore } from '../../store/app.ts';

export default {
    name: 'CardsProduto',
    props: {
        produtos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    },
    computed: {
        Appstore() {
            return useAppStore()
        }
    },
    methods: {
        excluirProduto(id) {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                this.Appstore.productsSaved = this.Appstore.productsSaved.filter(produto => produto.idProduct !== id);

                localStorage.setItem('Produtos', JSON.stringify(this.Appstore.productsSaved));
            }
        },

        // editarProduto(produto) {
        //     this.Appstore.selectedProduct = produto;

            
        //     this.Appstore.modalCadastroProduct = true;
        // },

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
}
</script>

<style scoped>
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

.v-btn {
    opacity: 0.8;
}

.v-btn:hover {
    opacity: 1;
}
</style>