<template>
  <v-app class="body">
    <NavigationVue v-if="!appStore.isLoged == false" />
    <LoginVue class="overflow" v-if="appStore.isLoged == false" />

    <template v-else>
      <MeuPerfil v-if="appStore.isPerfil" />
      <HomeVue v-if="appStore.isHome" />
      <SobreLoja v-if="appStore.isAbout" />
      <productsPage v-if="appStore.isProduct" />
    </template>

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
  },

  computed: {
  },

  methods: {
    initializeTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.appStore.isLight = savedTheme === 'light';
      this.appStore.isDark = savedTheme === 'dark';
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
