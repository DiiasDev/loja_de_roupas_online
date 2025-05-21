<template>
  <v-layout>
    <v-bottom-navigation
      v-model="activeTab"
      color="primary"
      grow
      app
      class="bottom-nav"
      :class="{ 'theme--dark': isDarkMode }"
    >
      <v-btn value="home" to="/">
        <v-icon>mdi-home</v-icon>
        <span>Início</span>
      </v-btn>

      <v-btn value="products" to="/produtos">
        <v-icon>mdi-tshirt-crew</v-icon>
        <span>Produtos</span>
      </v-btn>

      <v-btn value="orders" to="/pedidos">
        <v-icon>mdi-clipboard-text</v-icon>
        <span>Pedidos</span>
      </v-btn>

      <v-btn value="settings" to="/configuracoes">
        <v-icon>mdi-cog</v-icon>
        <span>Config</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
import { useAppStore } from '../../store/app.ts';

export default {
  name: 'BottomNavigation',
  data() {
    return {
      activeTab: this.getCurrentRoute(),
    };
  },
  computed: {
    isDarkMode() {
      return useAppStore().theme === 'dark';
    }
  },
  methods: {
    getCurrentRoute() {
      const path = this.$route.path;
      if (path === '/') return 'home';
      if (path.includes('/produtos')) return 'products';
      if (path.includes('/pedidos')) return 'orders';
      if (path.includes('/configuracoes')) return 'settings';
      return 'home';
    }
  },
  watch: {
    '$route'() {
      this.activeTab = this.getCurrentRoute();
    }
  }
};
</script>

<style scoped>
.bottom-nav {
  display: none;
}

.theme--dark {
  background-color: var(--surface);
  color: var(--text-primary);
}

@media (max-width: 960px) {
  .bottom-nav {
    display: flex;
  }
}
</style>
