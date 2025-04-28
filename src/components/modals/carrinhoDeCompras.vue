<template>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-dialog
          v-model="appStore.modalCarrinho"
          max-width="500"
          transition="dialog-bottom-transition"
        >
          <v-card class="pa-4" style="background-color: #ffffff; border-radius: 12px;">
            <div class="d-flex justify-end">
              <v-btn icon @click="appStore.modalCarrinho = false" color="blue lighten-1">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
  
            <v-card-title
              class="d-flex text-h5 font-weight-bold justify-center"
              style="color: #1E88E5;"
            >
              Carrinho de Compras
            </v-card-title>
  
            <v-card-text class="mt-4">
              <p class="text-center" style="color: #555;">Seu carrinho está vazio.</p>
            </v-card-text>
  
            <v-card-actions class="d-flex flex-column mt-6">
              <v-btn
                color="blue lighten-1"
                class="mb-2"
                block
                style="color: white;"
              >
                Finalizar Compra
              </v-btn>
              <v-btn
                text
                color="blue darken-2"
                @click="appStore.modalCarrinho = false"
              >
                Continuar Comprando
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </template>
  


<script>
import { useAppStore } from '../../store/app.ts'

export default {
    name: 'CarrinhoDeCompras',
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
    methods: {
    }
}
</script>