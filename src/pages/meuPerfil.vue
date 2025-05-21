<template>
  <v-row class="profile-row mb-8 pb-8" align="start" justify="center">
    <v-col cols="12" md="10" lg="8" xl="6" >
      <navgation />

      <v-card :class="display.xs ? '' : ''" class="profile-card">
        <v-card-title class="profile-title">
          Meu Perfil
        </v-card-title>

        <v-card-text class="profile-info">
          <v-row>

            <v-col cols="12" sm="4" class="d-flex justify-center align-center">
              <v-avatar size="150" class="profile-avatar">
                <v-img
                  :src="dados.profileImage || 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/cristiano-ronaldo-al-nassr-contrato-e1739188302718.jpg?w=1200&h=1200&crop=1'"
                  alt="Foto do Usuário"></v-img>
              </v-avatar>
            </v-col>


            <v-col cols="12" sm="8">
              <div class="profile-details">
                <h3 class="user-welcome">Bem-vindo(a), {{ dados.name }}! 👋</h3>
                <p><strong>Email:</strong> {{ dados.email }}</p>
                <p><strong>Telefone:</strong> {{ formatPhoneNumber(dados.phone) || '(XX) XXXXX-XXXX' }}</p>
                <p><strong>Endereço:</strong> {{ dados.address || 'Rua Exemplo, 123, Bairro, Cidade, Estado' }}</p>
                <p><strong>Última Compra:</strong> 20/04/2025</p>

                <div v-if="!display.xs" class="button-group">
                  <v-btn color="primary" @click="dialogOpen = true" class="mt-4 profile-btn">Editar Perfil
                    ✏️</v-btn>
                  <v-btn @click="exit" color="secondary" class="mt-4 profile-btn">Sair 🚪</v-btn>
                </div>
                <v-row v-else>
                  <v-col class="d-flex justify-center gap-3 flex-wrap">
                    <v-btn color="primary" @click="dialogOpen = true" class="mt-4 profile-btn">Editar Perfil
                      ✏️</v-btn>
                    <v-btn @click="exit" color="secondary" class="mt-4 profile-btn">Sair 🚪</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialogOpen" max-width="600px" class="responsive-dialog">
        <v-card class="edit-profile-modal">
          <v-card-title class="modal-title">Editar Perfil</v-card-title>
          <v-card-text class="modal-content">
            <v-form ref="form">
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-avatar size="150" class="profile-avatar mb-4">
                    <v-img
                      :src="previewImage || 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/cristiano-ronaldo-al-nassr-contrato-e1739188302718.jpg?w=1200&h=1200&crop=1'"
                      alt="Foto do Usuário"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn color="primary" @click="triggerFileInput">
                    Alterar Foto
                  </v-btn>
                  <input type="file" ref="fileInput" accept="image/*" style="display: none"
                    @change="handleFileUpload" />
                  <v-btn v-if="previewImage && previewImage !== dados.profileImage" color="error" class="ml-2"
                    @click="removePhoto">
                    Remover
                  </v-btn>
                </v-col>
                <v-col cols="12" v-if="imageError" class="text-center">
                  <v-alert type="error" dense>
                    {{ imageError }}
                  </v-alert>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedUser.name" label="Nome" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedUser.email" label="Email" required type="email"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedUser.phone" label="Telefone" placeholder="(XX) XXXXX-XXXX"
                    required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedUser.address" label="Endereço"
                    placeholder="Rua, número, bairro, cidade, estado"></v-text-field>
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

      <!-- Added spacer div for bottom navigation -->
      <div class="bottom-spacer"></div>
    </v-col>
  </v-row>
</template>

<script>
import { useAppStore } from '../store/app.ts'
import { useDisplay } from 'vuetify';
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
      previewImage: null,
      imageError: null,
      maxImageSize: 200 * 1024, // 200KB max size
      display: useDisplay(),
    };
  },
  mounted() {
    this.getData()
  },
  computed: {
    appStore() {
      return useAppStore();
    },
  },
  methods: {
    getData() {
      this.dados = JSON.parse(localStorage.getItem('user'));
      if (this.dados) {
        if (Array.isArray(this.dados) && this.dados.length > 0) {
          this.dados = this.dados[0];
        }
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
    editProfile() {
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
        this.imageError = 'Por favor, selecione uma imagem válida.';
        return;
      }

      if (file.size > 2 * 1024 * 1024) { // 2MB limit for compression
        this.imageError = 'A imagem é muito grande. Selecione uma imagem menor que 2MB.';
        return;
      }

      this.imageError = null;
      this.compressImage(file);

      this.notifyProfileUpdate();
    },

    compressImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          let width = img.width;
          let height = img.height;
          const maxSize = 300;

          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);

          const estimatedSize = Math.round((compressedDataUrl.length * 3) / 4);
          if (estimatedSize > this.maxImageSize) {
            this.imageError = 'A imagem ainda é muito grande após compressão. Tente uma imagem menor.';
            return;
          }

          this.previewImage = compressedDataUrl;
          this.editedUser.profileImage = compressedDataUrl;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removePhoto() {
      this.previewImage = null;
      this.editedUser.profileImage = null;
      this.imageError = null;

      this.notifyProfileUpdate();
    },

    saveProfile() {
      if (!this.editedUser.name || !this.editedUser.email || !this.editedUser.phone) {
        this.showSnackbar('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const tempUser = { ...this.editedUser };
      if (this.imageError) {
        tempUser.profileImage = this.dados.profileImage;
        this.showSnackbar('A imagem foi ignorada devido a limitações de tamanho.');
      }

      this.dados = { ...tempUser };

      let users = JSON.parse(localStorage.getItem('user')) || [];
      if (Array.isArray(users) && users.length > 0) {
        users[0] = this.dados;
      } else {
        users = [this.dados];
      }

      try {
        localStorage.setItem('user', JSON.stringify(users));

        this.notifyProfileUpdate();

        this.$nextTick(() => {
          this.getData();
        });

        this.dialogOpen = false;
        this.imageError = null;

        this.$nextTick(() => {
          this.notifyProfileUpdate();

          this.$emit('profile-updated');
          this.showSnackbar('Perfil atualizado com sucesso!');
        });
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        this.showSnackbar('Erro ao salvar o perfil. A imagem pode ser muito grande.');

        if (this.editedUser.profileImage && this.editedUser.profileImage !== this.dados.profileImage) {
          this.editedUser.profileImage = this.dados.profileImage;
          this.showSnackbar('A imagem não pode ser salva. Tente uma imagem menor.');
        }
      }
    },

    notifyProfileUpdate() {
      window.dispatchEvent(new CustomEvent('user-profile-updated'));
    },

    showSnackbar(message) {
      alert(message);
    },
    exit() {
      this.appStore.isHome = true
      this.appStore.isLoged = false
      this.appStore.isPerfil = false
    }
  }
}
</script>

<style scoped>
body {
  overflow-y: hidden !important;
}

html {
  overflow-y: hidden !important;
}

.profile-row {
  background-color: var(--background);
  /* padding: 0 10px; */
  padding-bottom: 80px;
  margin-bottom: 20px;
}

.profile-card {
  background-color: var(--card-bg);
  box-shadow: var(--card-shadow);
  border-radius: 15px;
  padding: 20px;
  /* margin-top: 30px; */
  transition: all 0.3s ease;
  max-width: 100%;
  overflow-x: hidden;
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

.profile-info {
  padding: 10px;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.profile-details {
  padding-left: 10px;
  padding-right: 10px;
}

.profile-details p {
  margin: 12px 0;
  word-break: break-word;
}

.user-welcome {
  word-break: break-word;
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
  flex-wrap: wrap;
}

.profile-btn {
  min-width: 130px;
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
  width: 100%;
  max-width: 95vw;
  margin: 0 auto;
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

.modal-content .v-text-field>>>.v-input__slot {
  background-color: var(--surface) !important;
  color: var(--text-primary) !important;
}

.modal-content .v-text-field>>>label {
  color: var(--text-secondary) !important;
}

.modal-content .v-text-field>>>input {
  color: var(--text-primary) !important;
}

.modal-actions {
  padding: 15px 25px;
  border-top: 1px solid var(--modal-border);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.cancel-btn {
  color: var(--text-primary) !important;
  border: 1px solid var(--modal-border) !important;
  margin-right: 8px;
  margin-bottom: 8px;
}

.save-btn {
  background-color: var(--primary) !important;
  color: var(--text-text) !important;
  margin-bottom: 8px;
}

/* Adicionar estilos para o modal de edição */
.profile-avatar {
  border: 2px solid var(--primary);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.v-dialog {
  border-radius: 15px;
}

.responsive-dialog {
  margin: 0 10px;
}

/* Add spacing for bottom navigation */
.bottom-spacer {
  height: 80px; /* Adjust the height based on your bottom navigation's height */
  width: 100%;
}

/* Media queries for better responsiveness */
@media (max-width: 959px) {
  .profile-details {
    padding-left: 0;
    padding-right: 0;
    /* margin-top: 20px; */
  }
}

@media (max-width: 768px) {
  .profile-title {
    font-size: 2rem;
  }

  .button-group {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .profile-btn {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 600px) {
  .profile-card {
    padding: 15px 10px;
  }

  .profile-title {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  .profile-info {
    padding: 5px;
    font-size: 1rem;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
  }

  .modal-title {
    font-size: 1.5rem;
    padding: 15px;
  }

  .modal-content {
    padding: 15px 10px;
  }

  .user-welcome {
    font-size: 1.3rem;
    text-align: center;
  }

  .modal-actions {
    padding: 10px;
    justify-content: center;
  }

  .cancel-btn,
  .save-btn {
    min-width: 100px;
  }
}

@media (max-width: 380px) {
  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .profile-title {
    font-size: 1.6rem;
  }
}
</style>
