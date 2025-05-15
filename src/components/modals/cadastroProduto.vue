<template>
    <v-row>
        <v-col>
            <v-dialog v-model="Appstore.modalCadastroProduct" max-width="600" transition="dialog-bottom-transition">
                <v-card class="pa-4" :style="{
                    backgroundColor: 'var(--modal-bg)',
                    boxShadow: 'var(--modal-shadow)',
                    border: '1px solid var(--modal-border)',
                    color: 'var(--text-primary)'
                }">
                    <!-- Título do Modal -->
                    <v-card-title :style="{
                        backgroundColor: 'var(--modal-header)',
                        color: 'var(--text-text)',
                        borderRadius: '6px',
                        padding: '1rem'
                    }">
                        🛒 Cadastro de Produto
                        <v-spacer></v-spacer>
                        <v-icon @click="Appstore.modalCadastroProduct = false">mdi-close</v-icon>
                    </v-card-title>

                    <!-- Formulário -->
                    <v-form @submit.prevent="submitForm" ref="formRef">
                        <v-card-text class="mt-4">

                            <!-- Alert de Erro -->
                            <v-alert v-if="erroValidacao" type="error" class="mb-4" dense>
                                ❌ {{ erroValidacao }}
                            </v-alert>

                            <v-text-field v-model="Appstore.productName" label="📦 Nome do Produto"
                                required></v-text-field>
                            <v-select v-model="Appstore.categoriaProduct" chips label="Select"
                                :items=Appstore.categories multiple></v-select>
                            <v-textarea v-model="Appstore.descricaoProduct" label="📝 Descrição" required></v-textarea>
                            <v-text-field v-model="Appstore.precoProduct" label="💰 Preço" prefix="R$" type="text"
                                required></v-text-field> <v-text-field v-model="Appstore.urlImageProduct"
                                label="🖼️ URL da Imagem" required></v-text-field>

                            <v-img :src="Appstore.urlImageProduct" max-height="200" contain class="mt-4"
                                v-if="Appstore.urlImageProduct"></v-img>
                        </v-card-text>

                        <!-- Ações -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green" type="submit">✅ Cadastrar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>

            <!-- Snackbar de Confirmação -->
            <v-snackbar v-model="snackbar" :timeout="3000" color="success">
                🎉 Produto cadastrado com sucesso!
                <v-progress-linear indeterminate color="white" height="3" class="mt-2"></v-progress-linear>
            </v-snackbar>
        </v-col>
    </v-row>
</template>

<script>
import { useAppStore } from '../../store/app.ts'

export default {
    name: 'modalCadastroProduto',
    data() {
        return {
            snackbar: false,
            erroValidacao: null
        }
    },
    computed: {
        Appstore() {
            return useAppStore()
        }
    }, methods: {
        validarProduto() {
            const store = this.Appstore
            const id = store.idProduct
            const nome = store.productName
            const categoria = store.categoriaProduct
            const descricao = store.descricaoProduct
            const preco = store.precoProduct
            const imagem = store.urlImageProduct

            if (!id || isNaN(Number(id))) {
                return 'O campo 🆔 ID deve ser um número válido.'
            }
            if (!nome || !nome.trim()) {
                return 'O campo 📦 Nome é obrigatório.'
            }
            if (!Array.isArray(categoria) || categoria.length === 0) {
                return 'O campo 🗂️ Categoria é obrigatório.'
            }
            if (!descricao || !descricao.trim()) {
                return 'O campo 📝 Descrição é obrigatório.'
            }
            const precoNumerico = preco ? Number(preco.replace(/[^0-9.,]/g, '').replace(',', '.')) : NaN
            if (!preco || isNaN(precoNumerico)) {
                return 'O campo 💰 Preço deve conter um valor numérico válido.'
            }
            if (!imagem || !imagem.trim()) {
                return 'O campo 🖼️ URL da Imagem é obrigatório.'
            }

            return null // Sem erros
        },
        submitForm() {
            const erro = this.validarProduto()

            if (erro) {
                this.erroValidacao = erro
                return
            }

            this.erroValidacao = null

            this.Appstore.addProduct()

            console.log('✅ Produto cadastrado!')
            this.snackbar = true

            setTimeout(() => {
                this.Appstore.modalCadastroProduct = false
                this.resetForm()
            }, 1000)
        }, resetForm() {
            const store = this.Appstore
            store.productName = ''
            store.categoriaProduct = [] // Changed from '' to [] since it's an array
            store.descricaoProduct = ''
            store.precoProduct = ''
            store.urlImageProduct = ''
        }
    }
}
</script>
