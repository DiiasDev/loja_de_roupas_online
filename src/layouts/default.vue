<template>
  <v-app :theme="theme">
    <v-layout>
      <!-- Assuming you have some navigation drawer or sidebar -->
      
      <!-- Main content -->
      <v-main>
        <router-view />
      </v-main>
      
      <!-- Bottom navigation - only visible on mobile -->
      <v-bottom-navigation
        v-show="$vuetify.display.mobile || $vuetify.display.sm"
        color="primary"
        grow
        app
        fixed
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
  </v-app>
</template>

<script>
import { useAppStore } from '../store/app';

export default {
  name: 'DefaultLayout',
  computed: {
    theme() {
      return useAppStore().theme;
    }
  },
}
</script>

<style>
/* Add any global styles you need */
@media (max-width: 960px) {
  .v-main {
    padding-bottom: 56px !important; /* Account for bottom navigation height */
  }
}
</style>
