<template>
  <v-app>
    <v-main>
      <LoginVue />
    </v-main>
  </v-app>
</template>

<script>
import {useAppStore} from './store/app.ts'
import LoginVue from './components/login.vue'
export default {
  name: 'App',

  components: {
    LoginVue
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
}
</script>
