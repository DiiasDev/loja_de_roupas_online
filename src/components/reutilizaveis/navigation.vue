<template>
  <v-layout>
    <!-- Desktop navigation -->
    <v-navigation-drawer v-if="!isMobile" expand-on-hover rail app
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

    <v-main>
      <v-container>
        <template>
          <SobreLoja v-if="appStore.isAbout == true" />
        </template>
        <CarrinhoDeCompras />
        <modalSuporte />
      </v-container>
    </v-main>

    <!-- Mobile menu bottom sheet -->
    <v-bottom-sheet v-model="mobileDrawerOpen" v-if="isMobile" class="mobile-menu-sheet">
      <v-card class="mobile-menu-card">
        <v-card-item class="mobile-user-profile">
          <v-avatar size="60" class="mr-4">
            <v-img :src="perfil.profileImage || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="User Avatar"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="pa-0">{{ perfil.name || 'Usuário' }}</v-card-title>
            <v-card-subtitle class="pa-0">{{ perfil.email || 'exemplo@email.com' }}</v-card-subtitle>
          </div>
        </v-card-item>
        
        <v-divider class="my-2"></v-divider>
        
        <v-container>
          <v-row>
            <v-col cols="4" class="text-center" v-for="(item, index) in menuItems" :key="index">
              <v-btn variant="text" @click="executeAction(item.action)" class="mobile-menu-btn" width="100%" height="80">
                <v-col class="pa-0">
                  <v-icon size="large" :color="getActiveColor(item.value)">{{ item.icon }}</v-icon>
                  <div class="text-caption mt-1">{{ item.title }}</div>
                </v-col>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        
        <v-divider class="my-2"></v-divider>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="primary" @click="mobileDrawerOpen = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>

    <!-- Mobile bottom navigation bar -->
    <v-bottom-navigation 
      v-if="isMobile" 
      :model-value="true"
      color="primary" 
      grow>
      <v-btn @click="inicio" :value="appStore.isHome">
        <v-icon>mdi-home</v-icon>
        <span class="text-caption">Início</span>
      </v-btn>
      
      <v-btn @click="redirecionaProduct" :value="appStore.isProduct">
        <v-icon>mdi-package-variant</v-icon>
        <span class="text-caption">Produtos</span>
      </v-btn>
      
      <v-btn @click="openCarrinho" :value="appStore.modalCarrinho">
        <v-icon>mdi-cart</v-icon>
        <span class="text-caption">Carrinho</span>
      </v-btn>
      
      <v-btn @click="redireciona" :value="appStore.isPerfil">
        <v-icon>mdi-account</v-icon>
        <span class="text-caption">Perfil</span>
      </v-btn>
      
      <v-btn @click="toggleMobileNav">
        <v-icon>mdi-menu</v-icon>
        <span class="text-caption">Menu</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
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
      profileCheckInterval: null,
      windowWidth: window.innerWidth,
      mobileDrawerOpen: false,
      menuItems: [
        { title: 'Início', icon: 'mdi-home', action: 'inicio', value: 'isHome' },
        { title: 'Produtos', icon: 'mdi-package-variant', action: 'redirecionaProduct', value: 'isProduct' },
        { title: 'Perfil', icon: 'mdi-account', action: 'redireciona', value: 'isPerfil' },
        { title: 'Carrinho', icon: 'mdi-cart', action: 'openCarrinho', value: 'modalCarrinho' },
        { title: 'Sobre a Loja', icon: 'mdi-information', action: 'redirecionaAbout', value: 'isAbout' },
        { title: 'Suporte', icon: 'mdi-face-agent', action: 'openModalSuporte', value: 'modalSuporte' },
        { title: 'Mudar Tema', icon: () => this.currentIcon, action: 'changeTheme', value: 'theme' },
      ]
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
    
    // Add window resize event listener for responsive behavior
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    // Clean up event listeners when component is destroyed
    window.removeEventListener('user-profile-updated', this.refreshUserData);
    window.removeEventListener('storage', this.refreshUserData);
    window.removeEventListener('resize', this.onResize);
    
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
    },
    isMobile() {
      return this.windowWidth < 768; // Breakpoint for mobile devices
    }
  },
  methods: {
    getActiveColor(value) {
      if (value === 'theme') {
        return 'primary';
      }
      
      return this.appStore[value] ? 'primary' : '';
    },
    executeAction(action) {
      if (typeof this[action] === 'function') {
        this[action]();
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    toggleMobileNav() {
      this.mobileDrawerOpen = !this.mobileDrawerOpen;
    },
    openCarrinho() {
      this.appStore.modalCarrinho = true;
      if (this.isMobile) {
        this.mobileDrawerOpen = false;
      }
    },
    openModalSuporte() {
      this.appStore.modalSuporte = true;
      if (this.isMobile) {
        this.mobileDrawerOpen = false;
      }
    },
    inicio() {
      this.appStore.isHome = true;
      this.appStore.isPerfil = false;
      this.appStore.isAbout = false;
      this.appStore.isProduct = false;
      if (this.isMobile) {
        this.mobileDrawerOpen = false;
      }
    },
    redireciona() {
      this.appStore.isPerfil = true;
      this.appStore.isProduct = false;
      this.appStore.isHome = false;
      this.appStore.isAbout = false;
      if (this.isMobile) {
        this.mobileDrawerOpen = false;
      }
    },
    redirecionaProduct() {
      this.appStore.isProduct = true;
      this.appStore.isAbout = false;
      this.appStore.isHome = false;
      this.appStore.isPerfil = false;
      if (this.isMobile) {
        this.mobileDrawerOpen = false;
      }
    },
    redirecionaAbout() {
      this.appStore.isAbout = true;
      this.appStore.isHome = false;
      this.appStore.isPerfil = false;
      this.appStore.isProduct = false;
      if (this.isMobile) {
        this.mobileDrawerOpen = false;
      }
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
      
      if (this.isMobile) {
        this.mobileDrawerOpen = false;
      }
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

/* Mobile menu styling */
.mobile-menu-sheet {
  z-index: 1000 !important;
}

.mobile-menu-card {
  border-radius: 16px 16px 0 0 !important;
  padding: 16px 8px !important;
  background-color: var(--nav-bg) !important;
}

.mobile-user-profile {
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background-color: var(--nav-hover) !important;
}

.v-bottom-navigation {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1) !important;
  background-color: var(--nav-bg) !important;
  border-top: 1px solid var(--nav-border) !important;
  height: 64px !important;
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  width: 100% !important;
}

.v-bottom-navigation .v-btn {
  min-width: 0 !important;
  padding: 0 8px !important;
}

.v-bottom-navigation .v-btn .v-icon {
  margin-bottom: 2px !important;
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

/* Layout adjustments */
.v-container {
  padding: 0px;
  background-color: transparent !important;
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .v-main {
    padding-bottom: 64px !important;
  }
}

/* Mantendo outras propriedades importantes */
.v-layout {
  height: 100%;
}
</style>