<template>
  <v-row class="profile-row" align="start" justify="center">
    <v-col cols="12" md="10" lg="8" xl="6">
      <!-- Navegação -->
      <navgation />

      <!-- Cartão de Perfil -->
      <v-card class="profile-card">
        <v-card-title class="profile-title">
          Meu Perfil
        </v-card-title>

        <!-- Informações do Perfil -->
        <v-card-text class="profile-info">
          <v-row>

            <v-col cols="12" md="4" class="d-flex justify-center">
              <v-avatar size="150" class="profile-avatar">
                <v-img src="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/cristiano-ronaldo-al-nassr-contrato-e1739188302718.jpg?w=1200&h=1200&crop=1" alt="Foto do Usuário"></v-img>
              </v-avatar>
            </v-col>


            <!-- Detalhes do Perfil -->
            <v-col cols="12" md="8">
              <div class="profile-details">
                <h3>Bem-vindo(a), [Nome do Usuário]! 👋</h3>
                <p><strong>Email:</strong> usuario@exemplo.com</p>
                <p><strong>Telefone:</strong> (XX) XXXX-XXXX</p>
                <p><strong>Endereço:</strong> Rua Exemplo, 123, Bairro, Cidade, Estado</p>
                <p><strong>Data de Nascimento:</strong> 01/01/1990</p>
                <p><strong>Última Compra:</strong> 20/04/2025</p>

                <div class="button-group">
                  <v-btn color="primary" class="mt-4">Editar Perfil ✏️</v-btn>
                  <v-btn color="secondary" class="mt-4" @click="handleLogout">Sair 🚪</v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useAppStore } from '@/store/app.ts'
import navgation from '../components/reutilizaveis/navigation.vue';

export default {
  components: {
    navgation
  },
  name: 'MeuPerfil',
  data() {
    return {};
  },
  computed: {
    appStore() {
      return useAppStore();
    },
  },
  methods: {
    handleLogout() {
      // Lógica de logout (por exemplo, limpar sessão)
      console.log("Usuário deslogado!");
    }
  }
}
</script>

<style scoped>
/* Estilo geral da página */
.profile-row {
  min-height: 100vh;
  background-color: var(--background);
  /* Cor de fundo clara */
  padding: 20px;
}

.profile-card {
  background-color: var(--card-bg);
  /* Fundo branco, mais clean e fácil de ler */
  box-shadow: var(--card-shadow);
  /* Sombra mais forte para dar profundidade */
  border-radius: 15px;
  /* Bordas arredondadas */
  padding: 20px;
  margin-top: 30px;
  /* Adiciona margem superior para separar do topo */
  transition: all 0.3s ease;
  /* Transição suave quando o card for interagido */
}

/* Efeito de hover para quando o usuário passar o mouse sobre o card */
.profile-card:hover {
  transform: translateY(-5px);
  /* Levanta o card ao passar o mouse */
  box-shadow: var(--card-hover-shadow);
  /* Aumenta a sombra ao passar o mouse */
  background-color: var(--card-highlight);
}

/* Alteração do título do card para uma cor mais destacada */
.profile-title {
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--text-primary);
  /* Cor mais escura para contraste */
  text-align: center;
  margin-bottom: 20px;
}


/* Título do Perfil */
.profile-title {
  font-size: 2.2rem;
  color: var(--text-primary);
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

/* Informações do Perfil */
.profile-info {
  padding: 20px;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

/* Detalhes do perfil */
.profile-details {
  padding-left: 20px;
  padding-right: 20px;
}

.profile-details p {
  margin: 12px 0;
}

/* Estilo para imagem do perfil */
.profile-image {
  border-radius: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 180px;
  object-fit: cover;
}

/* Botões */
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

/* Responsividade */
@media (max-width: 600px) {
  .profile-image {
    width: 120px;
    height: 120px;
  }

  .profile-title {
    font-size: 1.8rem;
  }
}
</style>
