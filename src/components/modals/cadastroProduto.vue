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
                                required></v-text-field>
                            
                            <!-- Campo de upload de arquivo -->
                            <v-file-input
                                v-model="imageFile"
                                label="🖼️ Upload de Imagem"
                                accept="image/*"
                                prepend-icon="mdi-camera"
                                @change="handleFileUpload"
                                show-size
                                required
                            ></v-file-input>

                            <v-img :src="imagePreview" max-height="200" contain class="mt-4"
                                v-if="imagePreview"></v-img>
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
            erroValidacao: null,
            imageFile: null, // To store the file object
            imagePreview: null // To preview uploaded file
        }
    },
    computed: {
        Appstore() {
            return useAppStore()
        }
    }, 
    methods: {
        handleFileUpload(fileInput) {
            // Clear previous data
            this.imagePreview = null;
            this.Appstore.urlImageProduct = '';
            
            console.log("File input received:", fileInput);
            
            // If no file is selected or it's cleared
            if (!fileInput) {
                console.log("No file selected");
                return;
            }
            
            // Vuetify 3 file input can return various formats
            // Need to extract the actual File object
            let file = null;
            
            if (fileInput instanceof File) {
                // Single file
                file = fileInput;
            } else if (Array.isArray(fileInput) && fileInput.length > 0) {
                // Array of files (first one)
                file = fileInput[0];
            } else if (fileInput && fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
                // Event object with files
                file = fileInput.target.files[0];
            }
            
            if (!file || !(file instanceof File)) {
                console.error("Could not extract valid file from:", fileInput);
                this.erroValidacao = "Formato de arquivo inválido. Por favor, tente novamente.";
                return;
            }
            
            console.log("Processing file:", file.name, file.type, file.size);
            
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                    this.Appstore.urlImageProduct = e.target.result;
                    console.log("Image loaded successfully");
                };
                reader.onerror = (error) => {
                    console.error("FileReader error:", error);
                    this.erroValidacao = "Erro ao processar a imagem. Por favor, tente novamente.";
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error("Error handling file:", error);
                this.erroValidacao = "Erro ao processar o arquivo. Verifique se é uma imagem válida.";
            }
        },
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
            
            // Verificando se temos uma imagem no store
            if (!imagem || !imagem.trim()) {
                return 'O upload de uma imagem é obrigatório.'
            }

            return null // Sem erros
        },
        submitForm() {
            // Verificar se a imagem foi carregada no Appstore
            if (this.imagePreview && !this.Appstore.urlImageProduct) {
                this.Appstore.urlImageProduct = this.imagePreview;
            }
            
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
        }, 
        resetForm() {
            const store = this.Appstore
            store.productName = ''
            store.categoriaProduct = []
            store.descricaoProduct = ''
            store.precoProduct = ''
            store.urlImageProduct = ''
            this.imageFile = null
            this.imagePreview = null
        }
    }
}
</script>
