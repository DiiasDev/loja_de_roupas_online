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
                  :src="dados.profileImage || 'https://cdn-icons-png.flaticon.com/512/5987/5987462.png'"
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

      <!-- Add the UserProductsList component -->
    </v-col>
  </v-row>
</template>

<script>
import { useAppStore } from '../store/app.ts'
import { useDisplay } from 'vuetify';
import navgation from '../components/reutilizaveis/navigation.vue';

export default {
  components: {
    navgation,
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
  padding-bottom: 80px;
  margin-bottom: 20px;
}

.profile-card {
  background-color: var(--card-bg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  padding: 30px;
  transition: all 0.4s ease;
  max-width: 100%;
  overflow-x: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.profile-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  background-color: var(--card-highlight);
}

.profile-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--primary), transparent, var(--primary));
  z-index: -1;
  border-radius: 19px;
  background-size: 300% 300%;
  animation: gradientBorder 8s ease infinite;
  opacity: 0.5;
}

@keyframes gradientBorder {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.profile-title {
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, var(--primary), #6c5ce7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.profile-info {
  padding: 15px;
  font-size: 1.15rem;
  color: var(--text-secondary);
}

.profile-details {
  padding-left: 15px;
  padding-right: 15px;
}

.profile-details p {
  margin: 15px 0;
  word-break: break-word;
  transition: all 0.3s;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.03);
  border-left: 3px solid var(--primary);
}

.profile-details p strong {
  color: var(--primary);
  font-weight: 600;
}

.user-welcome {
  word-break: break-word;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--text-primary);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
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
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.profile-btn {
  min-width: 140px;
  height: 44px;
  letter-spacing: 0.5px;
  font-weight: 600;
  text-transform: none;
  font-size: 1.05rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.profile-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.profile-btn:active {
  transform: translateY(0);
}

.v-btn {
  font-weight: 600;
  border-radius: 12px;
}

.v-btn.primary {
  background: linear-gradient(135deg, var(--primary), #6c5ce7) !important;
  color: white;
}

.v-btn.secondary {
  background: linear-gradient(135deg, #f2f2f2, #e0e0e0) !important;
  color: var(--text-primary);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.profile-avatar {
  border: 3px solid var(--primary);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.profile-avatar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.profile-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Edit Profile Modal Styles */
.edit-profile-modal {
  background-color: var(--modal-bg) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 95vw;
  margin: 0 auto;
}

.modal-title {
  background: linear-gradient(135deg, var(--primary), #6c5ce7);
  color: white;
  padding: 25px;
  font-weight: 700;
  letter-spacing: 0.8px;
  font-size: 1.8rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-content {
  padding: 30px;
  color: var(--text-primary);
}

.modal-content .v-text-field {
  margin-bottom: 15px;
}

.modal-content .v-text-field>>>.v-input__slot {
  background-color: var(--surface) !important;
  color: var(--text-primary) !important;
  border-radius: 12px;
  padding: 5px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.modal-content .v-text-field>>>.v-input__slot:focus-within {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-color: var(--primary);
  transform: translateY(-1px);
}

.modal-content .v-text-field>>>label {
  color: var(--text-secondary) !important;
  font-weight: 500;
}

.modal-content .v-text-field>>>input {
  color: var(--text-primary) !important;
  font-size: 1.05rem;
}

.modal-actions {
  padding: 20px 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.02);
}

.cancel-btn {
  color: var(--text-primary) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  margin-right: 12px;
  margin-bottom: 8px;
  background: linear-gradient(to bottom, #f5f5f5, #e0e0e0) !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.cancel-btn:hover {
  background: linear-gradient(to bottom, #e0e0e0, #d5d5d5) !important;
}

.save-btn {
  background: linear-gradient(135deg, var(--primary), #6c5ce7) !important;
  color: white !important;
  margin-bottom: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
}

.v-dialog {
  border-radius: 20px;
}

.responsive-dialog {
  margin: 0 10px;
}

/* Add spacing for bottom navigation */
.bottom-spacer {
  height: 80px;
  width: 100%;
}

/* Media queries for better responsiveness */
@media (max-width: 959px) {
  .profile-details {
    padding-left: 0;
    padding-right: 0;
  }
  
  .profile-card {
    padding: 25px 20px;
  }
  
  .profile-title {
    font-size: 2.3rem;
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
  
  .user-welcome {
    font-size: 1.6rem;
  }
  
  .modal-title {
    padding: 20px;
    font-size: 1.6rem;
  }
}

@media (max-width: 600px) {
  .profile-card {
    padding: 20px 15px;
    border-radius: 15px;
  }

  .profile-title {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  .profile-info {
    padding: 5px;
    font-size: 1rem;
  }
  
  .profile-details p {
    padding: 6px 8px;
    margin: 10px 0;
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
    padding: 15px;
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
  
  .profile-card {
    padding: 15px 10px;
  }
  
  .profile-details p {
    font-size: 0.9rem;
  }
}
</style>
