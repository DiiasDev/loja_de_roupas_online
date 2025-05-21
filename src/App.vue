<template>
  <v-app class="body">
    <NavigationVue v-if="appStore.isLoged" />
    
    <template v-if="appStore.isLoged">
      <MeuPerfil v-if="appStore.isPerfil" />
      <HomeVue v-if="appStore.isHome" />
      <SobreLoja v-if="appStore.isAbout" />
      <productsPage v-if="appStore.isProduct" />
    </template>
    
    <LoginVue class="overflow" v-if="!appStore.isLoged" />

    <Footer/>
  </v-app>
</template>

<script>
import "./styles/theme.css"

import { useAppStore } from './store/app.ts'
import LoginVue from './pages/login.vue'
import HomeVue from './pages/home.vue'
import MeuPerfil from './pages/meuPerfil.vue'
import SobreLoja from './pages/SobreLoja.vue'
import Footer from './components/reutilizaveis/Footer.vue'
import NavigationVue from './components/reutilizaveis/navigation.vue'
import productsPage from './pages/produtos/produtos.vue'

export default {
  name: 'App',

  components: {
    LoginVue,
    HomeVue,
    MeuPerfil,
    SobreLoja,
    Footer,
    NavigationVue,
    productsPage
  },
  
  data() {
    return {
      appStore: useAppStore()
    }
  },

  created() {
    this.initializeTheme();
    this.checkAuthState();
    console.log('App created - Auth state:', this.appStore.isLoged, 'Current user:', this.appStore.currentUser);
  },

  mounted() {
    console.log('App mounted - Auth state:', this.appStore.isLoged, 'Current user:', this.appStore.currentUser);
  },

  methods: {
    initializeTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.appStore.isLight = savedTheme === 'light';
      this.appStore.isDark = savedTheme === 'dark';
    },
    
    checkAuthState() {
      // Check and restore authentication state
      this.appStore.checkAuthState();
      
      // Set initial page based on auth state
      if (this.appStore.isLoged) {
        console.log('User is logged in, setting default view if needed');
        // Ensure a default view is shown when logged in
        if (!this.appStore.isPerfil && !this.appStore.isAbout && 
            !this.appStore.isProduct && !this.appStore.isHome) {
          this.appStore.isHome = true;
        }
      } else {
        console.log('User is not logged in, showing login page');
      }
    }
  }
}
</script>

<style>
.v-main {
  padding-bottom: 60px;
}

.v-container {
  padding: 0;
}

html .overflow {
  overflow-y: hidden !important;
}
</style>
