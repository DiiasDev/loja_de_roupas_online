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

        <!-- CATEGORIAS -->
        <v-row class="mb-4" justify="center">
            <v-chip v-for="categoria in categorias" :key="categoria" class="ma-2" text-color="white"
                outlined @click="selecionarCategoria(categoria)"
                :class="{ 'active-chip': categoria === categoriaSelecionada }">
                {{ categoria }}
            </v-chip>
        </v-row>

        <!-- LISTAGEM DE PRODUTOS -->
        <v-row>
            <v-col v-for="produto in produtosFiltrados" :key="produto.id" cols="12" sm="6" md="4" lg="3">
                <div class="card animate__animated animate__fadeInUp">
                    <div class="d-flex justify-space-between align-center mb-2">
                        <strong style="color: var(--text-primary); font-size: 1.1rem;">
                            {{ produto.nome }}
                        </strong>
                        <v-chip small color="secondary" text-color="white">
                            {{ produto.categoria }}
                        </v-chip>
                    </div>
                    <v-img :src="produto.imagem" aspect-ratio="1" class="mb-3" style="border-radius: 8px;"></v-img>
                    <p style="color: var(--text-secondary);">{{ produto.descricao }}</p>
                    <p class="mt-2" style="color: var(--primary); font-weight: bold;">
                        R$ {{ produto.preco }}
                    </p>

                    <v-btn color="primary" small class="mr-2" @click="editarProduto(produto)">
                        ✏️ Editar
                    </v-btn>
                    <v-btn color="error" small outlined @click="excluirProduto(produto.id)">
                        🗑️ Excluir
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'productsPage',
    data() {
        return {
            categorias: ['Todos', 'Camisa', 'Calça', 'Bermuda', 'Vestido', 'Acessórios'],
            categoriaSelecionada: 'Todos',
            produtos: [
                {
                    id: 1,
                    nome: 'Camisa Casual Azul',
                    categoria: 'Camisa',
                    descricao: 'Camisa 100% algodão, confortável e estilosa.',
                    preco: '89,90',
                    imagem: 'https://via.placeholder.com/300x300?text=Camisa+Azul'
                },
                {
                    id: 2,
                    nome: 'Calça Jeans Slim',
                    categoria: 'Calça',
                    descricao: 'Jeans escuro com corte moderno e confortável.',
                    preco: '129,90',
                    imagem: 'https://via.placeholder.com/300x300?text=Calça+Jeans'
                },
                // ... mais produtos
            ]
        };
    },
    computed: {
        produtosFiltrados() {
            if (this.categoriaSelecionada === 'Todos') return this.produtos;
            return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
        }
    },
    methods: {
        selecionarCategoria(cat) {
            this.categoriaSelecionada = cat;
        },
        criarProduto() {
            // Lógica para abrir modal ou redirecionar
            alert('Função de criar produto');
        },
        editarProduto(produto) {
            // Lógica de edição
            alert(`Editar produto: ${produto.nome}`);
        },
        excluirProduto(id) {
            this.produtos = this.produtos.filter(p => p.id !== id);
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
}

.body {
  margin-left: 80px; /* ou o valor correspondente à largura da sua sidebar */
}
</style>
