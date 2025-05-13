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

                            <v-text-field v-model="produto.id" label="🆔 ID do Produto" type="number"
                                required></v-text-field>
                            <v-text-field v-model="produto.nome" label="📦 Nome do Produto" required></v-text-field>
                            <v-text-field v-model="produto.categoria" label="🗂️ Categoria" required></v-text-field>
                            <v-textarea v-model="produto.descricao" label="📝 Descrição" required></v-textarea>
                            <v-text-field v-model="produto.preco" label="💰 Preço" prefix="R$" type="text"
                                required></v-text-field>
                            <v-text-field v-model="produto.imagem" label="🖼️ URL da Imagem" required></v-text-field>

                            <v-img :src="produto.imagem" max-height="200" contain class="mt-4"
                                v-if="produto.imagem"></v-img>
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
            produto: {
                id: null,
                nome: '',
                categoria: '',
                descricao: '',
                preco: '',
                imagem: ''
            },
            snackbar: false,
            erroValidacao: null
        }
    },
    computed: {
        Appstore() {
            return useAppStore()
        }
    },
    methods: {
        validarProduto() {
            const { id, nome, categoria, descricao, preco, imagem } = this.produto

            if (!id || isNaN(Number(id))) {
                return 'O campo 🆔 ID deve ser um número válido.'
            }
            if (!nome.trim()) return 'O campo 📦 Nome é obrigatório.'
            if (!categoria.trim()) return 'O campo 🗂️ Categoria é obrigatório.'
            if (!descricao.trim()) return 'O campo 📝 Descrição é obrigatório.'
            if (!preco.trim() || isNaN(Number(preco.replace(/[^0-9.,]/g, '').replace(',', '.')))) {
                return 'O campo 💰 Preço deve conter um valor numérico válido.'
            }
            if (!imagem.trim()) return 'O campo 🖼️ URL da Imagem é obrigatório.'

            return null // Sem erros
        },

        submitForm() {
            const erro = this.validarProduto()

            if (erro) {
                this.erroValidacao = erro
                return
            }

            // Sem erro: prossegue
            this.erroValidacao = null
            console.log('✅ Produto cadastrado:', this.produto)

            this.snackbar = true

            setTimeout(() => {
                this.Appstore.modalCadastroProduto = false
                this.resetForm()
            }, 1000)
        },

        resetForm() {
            this.produto = {
                id: null,
                nome: '',
                categoria: '',
                descricao: '',
                preco: '',
                imagem: ''
            }
        }
    }
}
</script>
