<template>
  <v-row class="profile-row" align="start" justify="center">
    <v-col cols="12" md="10" lg="8" xl="6" style="max-height: 4px !important;">
      <navgation />

      <v-card class="profile-card">
        <v-card-title class="profile-title">
          Meu Perfil
        </v-card-title>

        <v-card-text class="profile-info">
          <v-row>

            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-avatar size="150" class="profile-avatar">
                <v-img :src="dados.profileImage || 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/cristiano-ronaldo-al-nassr-contrato-e1739188302718.jpg?w=1200&h=1200&crop=1'" alt="Foto do Usuário"></v-img>
              </v-avatar>
            </v-col>


            <v-col cols="12" md="8">
              <div class="profile-details">
                <h3>Bem-vindo(a), {{ dados.name }}! 👋</h3>
                <p><strong>Email:</strong> {{ dados.email }}</p>
                <p><strong>Telefone:</strong> {{ formatPhoneNumber(dados.phone) || '(XX) XXXXX-XXXX' }}</p>
                <p><strong>Endereço:</strong> {{ dados.address || 'Rua Exemplo, 123, Bairro, Cidade, Estado' }}</p>
                <p><strong>Última Compra:</strong> 20/04/2025</p>

                <div class="button-group">
                  <v-btn color="primary" @click="dialogOpen = true" class="mt-4">Editar Perfil ✏️</v-btn>
                  <v-btn @click="exit" color="secondary" class="mt-4" >Sair 🚪</v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <!-- Modal de Edição de Perfil -->
      <v-dialog v-model="dialogOpen" max-width="600px">
        <v-card class="edit-profile-modal">
          <v-card-title class="modal-title">Editar Perfil</v-card-title>
          <v-card-text class="modal-content">
            <v-form ref="form">
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-avatar size="150" class="profile-avatar mb-4">
                    <v-img :src="previewImage || 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/cristiano-ronaldo-al-nassr-contrato-e1739188302718.jpg?w=1200&h=1200&crop=1'" alt="Foto do Usuário"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn color="primary" @click="triggerFileInput">
                    Alterar Foto
                  </v-btn>
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    style="display: none"
                    @change="handleFileUpload"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedUser.name"
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedUser.email"
                    label="Email"
                    required
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedUser.phone"
                    label="Telefone"
                    placeholder="(XX) XXXXX-XXXX"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedUser.address"
                    label="Endereço"
                    placeholder="Rua, número, bairro, cidade, estado"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="modal-actions">
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialogOpen = false" class="cancel-btn">Cancelar</v-btn>
            <v-btn color="primary" @click="saveProfile" class="save-btn">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { useAppStore } from '../store/app.ts'
import navgation from '../components/reutilizaveis/navigation.vue';

export default {
  components: {
    navgation
  },
  name: 'MeuPerfil',
  data() {
    return {
      dados: {
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        profileImage: ''
      },
      profile: '',
      dialogOpen: false,
      editedUser: {
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        profileImage: ''
      },
      previewImage: null
    };
  },
  mounted(){
    this.getData()
  },
  computed: {
    appStore() {
      return useAppStore();
    },
  },
  methods: {
    getData(){
      this.dados = JSON.parse(localStorage.getItem('user'));
      if (this.dados) {
        if (Array.isArray(this.dados) && this.dados.length > 0) {
          this.dados = this.dados[0];
        }
        // Inicializar o objeto editedUser com os dados atuais
        this.editedUser = { ...this.dados };
        this.previewImage = this.dados.profileImage || null;
        return;
      }
    },
    formatPhoneNumber(phone) {
      if (!phone) return null;
      const cleanedNumber = phone.replace(/\D/g, '');
      if (cleanedNumber.length < 10) return phone; 
      return `(${cleanedNumber.substring(0, 2)}) ${cleanedNumber.substring(2, 7)}-${cleanedNumber.substring(7, 11)}`;
    },
    editProfile(){
      this.dialogOpen = true;
      this.editedUser = { ...this.dados };
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      if (!file.type.includes('image/')) {
        alert('Por favor, selecione uma imagem válida.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        this.editedUser.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    saveProfile() {
      if (!this.editedUser.name || !this.editedUser.email || !this.editedUser.phone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      this.dados = { ...this.editedUser };
      
      let users = JSON.parse(localStorage.getItem('user'));
      if (Array.isArray(users) && users.length > 0) {
        users[0] = this.dados;
      } else {
        users = [this.dados];
      }
      
      localStorage.setItem('user', JSON.stringify(users));
      
      this.$nextTick(() => {
        this.getData();
      });
      
      this.dialogOpen = false;
      
      this.$nextTick(() => {
        this.$emit('profile-updated');
        this.showSnackbar('Perfil atualizado com sucesso!');
      });
    },
    
    showSnackbar(message) {
      alert(message);
    },
    exit(){
      this.appStore.isHome = true
      this.appStore.isLoged = false
      this.appStore.isPerfil = false
    }
  }
}
</script>

<style scoped>
body{
  overflow-y: hidden !important;
}

html{
  overflow-y: hidden !important;
}

.profile-row {
  background-color: var(--background);
}

.profile-card {
  background-color: var(--card-bg);
  box-shadow: var(--card-shadow);
  border-radius: 15px;
  padding: 20px;
  margin-top: 30px;
  transition: all 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-hover-shadow);
  background-color: var(--card-highlight);
}

.profile-title {
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 20px;
}


.profile-title {
  font-size: 2.2rem;
  color: var(--text-primary);
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.profile-info {
  padding: 20px;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.profile-details {
  padding-left: 20px;
  padding-right: 20px;
}

.profile-details p {
  margin: 12px 0;
}

.profile-image {
  border-radius: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 180px;
  object-fit: cover;
}

.button-group {
  display: flex;
  gap: 15px;
}

.v-btn {
  font-weight: 500;
  border-radius: 25px;
}

.v-btn.primary {
  background-color: var(--primary);
  color: var(--text-text);
}

.v-btn.secondary {
  background-color: var(--surface);
  color: var(--text-primary);
}

.v-btn:hover {
  opacity: 0.9;
}

.edit-profile-modal {
  background-color: var(--modal-bg) !important;
  border: 1px solid var(--modal-border);
  box-shadow: var(--modal-shadow);
  border-radius: 15px;
  overflow: hidden;
}

.modal-title {
  background-color: var(--modal-header);
  color: var(--text-text);
  padding: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.modal-content {
  padding: 25px;
  color: var(--text-primary);
}

.modal-content .v-text-field {
  margin-bottom: 12px;
}

.modal-content .v-text-field >>> .v-input__slot {
  background-color: var(--surface) !important;
  color: var(--text-primary) !important;
}

.modal-content .v-text-field >>> label {
  color: var(--text-secondary) !important;
}

.modal-content .v-text-field >>> input {
  color: var(--text-primary) !important;
}

.modal-actions {
  padding: 15px 25px;
  border-top: 1px solid var(--modal-border);
}

.cancel-btn {
  color: var(--text-primary) !important;
  border: 1px solid var(--modal-border) !important;
}

.save-btn {
  background-color: var(--primary) !important;
  color: var(--text-text) !important;
}

/* Adicionar estilos para o modal de edição */
.profile-avatar {
  border: 2px solid var(--primary);
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  margin-bottom: 20px;
}

.v-dialog {
  border-radius: 15px;
}

@media (max-width: 600px) {
  .profile-image {
    width: 120px;
    height: 120px;
  }

  .profile-title {
    font-size: 1.8rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
    padding: 15px;
  }
  
  .modal-content {
    padding: 15px;
  }
}
</style>
