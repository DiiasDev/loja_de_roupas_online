<template>
  <v-navigation-drawer expand-on-hover rail permanent app
    style="position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto;">
    <v-list>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="user@gmail.com"
        title="Nome Sobrenome">
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list density="compact">
      <v-list-item @click="inicio" class="homeIcon" prepend-icon="mdi-home" title="Início" value="home" />
      <v-list-item @click="redirecionaProduct" prepend-icon="mdi-package-variant" title="Produtos" value="produtos" />
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
      }
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    this.appStore.isLight = savedTheme === 'light';
    this.appStore.isDark = savedTheme === 'dark';

    console.log("Tema carregado:", savedTheme);
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

      console.log("Novo tema:", theme);
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