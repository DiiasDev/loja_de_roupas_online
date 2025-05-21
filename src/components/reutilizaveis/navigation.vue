<template>
  <v-navigation-drawer expand-on-hover rail permanent app
    style="position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto;">
    <v-list>
      <v-list-item :prepend-avatar="perfil.profileImage" :subtitle="perfil.email" :title="perfil.name">
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list density="compact">
      <v-list-item @click="inicio" class="homeIcon" prepend-icon="mdi-home" title="Início" value="home" />
      <v-list-item @click="redirecionaProduct" prepend-icon="mdi-package-variant" title="Cadastrar Produtos"
        value="Cadastrar Produtos" />
      <v-list-item @click="redireciona" prepend-icon="mdi-account" title="Meu Perfil" value="profile" />
      <v-list-item @click="openCarrinho" prepend-icon="mdi-cart" title="Carrinho" value="cart" />
      <v-list-item @click="redirecionaAbout" prepend-icon="mdi-information" title="Sobre a Loja" value="about" />
      <v-list-item @click="openModalSuporte" prepend-icon="mdi-face-agent" title="Suporte" value="support" />
      <v-list-item @click="changeTheme" :prepend-icon="currentIcon" title="Mudar Tema" value="Mudar Tema" />

    </v-list>
  </v-navigation-drawer>
  <v-container>
    <template>
      <SobreLoja v-if="appStore.isAbout == true" />
    </template>
    <CarrinhoDeCompras />
    <modalSuporte />
  </v-container>

</template>

<script>
import { useAppStore } from '../../store/app.ts'
import CarrinhoDeCompras from '../modals/carrinhoDeCompras.vue'
import modalSuporte from '../modals/suporte.vue'
import SobreLoja from '../../pages/SobreLoja.vue'

export default {
  name: 'NavigationVue',
  components: {
    CarrinhoDeCompras,
    modalSuporte,
    SobreLoja,
  },
  data() {
    return {
      icon: {
        light: 'mdi-moon-waning-crescent',
        dark: 'mdi-white-balance-sunny'
      },
      perfil: {
        name: '',
        email: '',
        profileImage: ''
      },
      userDataWatcher: null,
      profileCheckInterval: null
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    this.appStore.isLight = savedTheme === 'light';
    this.appStore.isDark = savedTheme === 'dark';

    console.log("Tema carregado:", savedTheme);

    this.getData()
    
    // Setup event listener for profile updates
    window.addEventListener('user-profile-updated', this.refreshUserData);
    
    // Setup storage event listener to detect changes across tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'user') {
        this.refreshUserData();
      }
    });

    // Check for updates more frequently
    this.profileCheckInterval = setInterval(this.checkForProfileUpdates, 1000); // Check every second
    
    // Add mutation observer to detect DOM changes that might indicate profile updates
    this.setupMutationObserver();
  },
  beforeUnmount() {
    // Clean up event listeners when component is destroyed
    window.removeEventListener('user-profile-updated', this.refreshUserData);
    window.removeEventListener('storage', this.refreshUserData);
    
    // Clear interval
    if (this.profileCheckInterval) {
      clearInterval(this.profileCheckInterval);
    }
    
    // Disconnect mutation observer if it exists
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  },
  computed: {
    appStore() {
      return useAppStore();
    },
    currentIcon() {
      return this.appStore.isLight ? this.icon.light : this.icon.dark;
    }
  },
  methods: {
    openCarrinho() {
      this.appStore.modalCarrinho = true
    },
    openModalSuporte() {
      this.appStore.modalSuporte = true
    },
    inicio() {
      this.appStore.isHome = true;
      this.appStore.isPerfil = false;
      this.appStore.isAbout = false;
      this.appStore.isProduct = false
    },
    redireciona() {
      this.appStore.isPerfil = true;
      this.appStore.isProduct = false;
    },
    redirecionaProduct() {
      this.appStore.isProduct = true
      this.appStore.isAbout = false;
      this.appStore.isHome = false;
      this.appStore.isPerfil = false;
    },
    redirecionaAbout() {
      this.appStore.isAbout = true;
      this.appStore.isHome = false;
      this.appStore.isPerfil = false;
      this.appStore.isProduct = false;
    },
    changeTheme() {
      const htmlElement = document.documentElement;

      let theme = htmlElement.getAttribute('data-theme');

      console.log("Tema atual:", theme);

      if (theme === 'dark') {
        this.appStore.isLight = true;
        this.appStore.isDark = false;
        theme = 'light';

      } else {
        this.appStore.isLight = false;
        this.appStore.isDark = true;
        theme = 'dark';
      }

      htmlElement.setAttribute('data-theme', theme);

      localStorage.setItem('theme', theme);

    },
    setupMutationObserver() {
      // Create a mutation observer to detect DOM changes that might indicate profile updates
      this.mutationObserver = new MutationObserver((mutations) => {
        // Check if any mutation involves elements that might be related to profile updates
        const shouldUpdate = mutations.some(mutation => {
          return mutation.target.closest('.edit-profile-modal') || 
                 mutation.target.closest('.profile-card');
        });
        
        if (shouldUpdate) {
          this.debounceRefresh();
        }
      });
      
      // Start observing the document with the configured parameters
      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    },
    
    // Use localStorage with a timestamp to detect changes
    checkForProfileUpdates() {
      const currentData = localStorage.getItem('user');
      if (currentData) {
        try {
          const parsedData = JSON.parse(currentData);
          const userData = Array.isArray(parsedData) ? parsedData[0] : parsedData;
          
          // Check if name, email or profile image has changed
          if (this.perfil.name !== userData.name || 
              this.perfil.email !== userData.email || 
              this.perfil.profileImage !== userData.profileImage) {
            console.log('Profile data changed, updating navigation');
            this.perfil = { ...userData };
          }
        } catch (e) {
          console.error('Error checking profile updates:', e);
        }
      }
    },
    
    // Debounce refresh to prevent too many updates
    debounceRefresh: (function() {
      let timeout = null;
      return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.refreshUserData();
        }, 300); // 300ms debounce
      };
    })(),
    
    refreshUserData() {
      console.log('Refreshing user data in navigation');
      this.getData();
    },
    
    getData() {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedData = JSON.parse(userData);
          this.perfil = Array.isArray(parsedData) ? parsedData[0] : parsedData;

          // Check if profile image is a large data URL and possibly truncate it
          if (this.perfil.profileImage && this.perfil.profileImage.length > 1024 * 50) { // If larger than ~50KB
            console.warn('Profile image is very large, consider optimizing it');
          }

          console.log('Dados do perfil carregados');
        } else {
          console.log('Nenhum dado de usuário encontrado no localStorage');
          // Set default values if no user data exists
          this.perfil = {
            name: 'Usuário',
            email: 'exemplo@email.com',
            profileImage: ''
          };
        }
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        // Set default values on error
        this.perfil = {
          name: 'Usuário',
          email: 'exemplo@email.com',
          profileImage: ''
        };
      }
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer {
  background-color: var(--nav-bg) !important;
  border-right: 1px solid var(--nav-border) !important;
  box-shadow: var(--nav-shadow) !important;
}

.v-list-item {
  color: var(--nav-text) !important;
  transition: all 0.3s ease !important;
}

.v-list-item:hover {
  background-color: var(--nav-hover) !important;
}

.v-list-item.active {
  background-color: var(--nav-active) !important;
  color: white !important;
}

.v-list-item__prepend>.v-icon {
  color: var(--nav-icon) !important;
}

.v-divider {
  border-color: var(--nav-border) !important;
}

.v-list-item__title {
  font-weight: 500 !important;
  font-size: 0.95rem !important;
}

.v-list-item__subtitle {
  color: var(--text-secondary) !important;
  font-size: 0.8rem !important;
}

/* Avatar container styling */
.v-list-item:first-child {
  padding: 1rem !important;
  margin-bottom: 0.5rem !important;
}

.v-list-item:first-child .v-avatar {
  border: 2px solid var(--primary) !important;
}

/* Mantendo outras propriedades importantes */
.v-main {
  height: 0%;
  padding: 0px;
}

.v-layout {
  padding: 0px;
}

.v-container {
  padding: 0px;
  background-color: transparent !important;
}

/* Remover completamente ou comentar a classe homeIcon que não é mais necessária */
/* .homeIcon{
  margin-right: 1rem;
  padding-right: 1rem;
} */
</style>