<template>
  <v-app class="body">
    <LoginVue v-if="appStore.isLoged == false" />

    <template v-else>
      <MeuPerfil v-if="appStore.isPerfil" />
      <HomeVue v-else />
    </template>

    <footer v-if="appStore.isLoged == false" class="d-flex justify-center footer">
      <p>&copy; DiiasDev</p>
    </footer>
  </v-app>
</template>

<script>
import { useAppStore } from './store/app.ts'
import LoginVue from './components/paginas/login.vue'
import HomeVue from './components/paginas/home.vue'
import MeuPerfil from './components/paginas/meuPerfil.vue'


export default {
  name: 'App',

  components: {
    LoginVue,
    HomeVue,
    MeuPerfil
  },

  computed: {
    appStore() {
      return useAppStore();
    },
  }
}
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1976D2;
  color: white;
  text-align: center;
  padding: 10px 0;
}

.v-main {
  padding-bottom: 60px;
}

.body {
  background-image: linear-gradient(to right top, #3fcdff, #36a4d6, #2d7cac, #225782, #143559);
}

</style>
