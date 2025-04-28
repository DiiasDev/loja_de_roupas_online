<template>
  <v-app class="body">
      <LoginVue v-if="appStore.isLoged == false" />
      <HomeVue v-else />
      <MeuPerfil v-if="appStore.isPerfil == false"/>
      <footer class="d-flex justify-center footer">
            <p>&copy; DiiasDev</p>
      </footer>
  </v-app>
</template>

<script>
import {useAppStore} from './store/app.ts'
import LoginVue from './components/login.vue'
import HomeVue from './components/home.vue'
export default {
  name: 'App',

  components: {
    LoginVue,
    HomeVue
  },

  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
        appStore() {
            return useAppStore();
        },
    },
    methods:{
    }
}
</script>

<style>
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #1976D2;
    color: white;
    text-align: center;
    padding: 10px 0;
}

/* Adicionei um padding-bottom para evitar que os cards cubram o footer */
.v-main {
    padding-bottom: 60px;
}

/* html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
} */
.body{
    background-image: linear-gradient(to right top, #3fcdff, #36a4d6, #2d7cac, #225782, #143559);
}


</style>
