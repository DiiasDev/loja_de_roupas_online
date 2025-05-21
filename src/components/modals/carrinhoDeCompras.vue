<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-dialog v-model="appStore.modalCarrinho" max-width="700" transition="dialog-bottom-transition">
        <v-card class="modal pa-4">
          <div class="d-flex justify-end">
            <v-btn icon @click="appStore.modalCarrinho = false" class="close-btn" :color="btnColor">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </div>

          <v-card-title class="modal-header d-flex text-h5 font-weight-bold justify-center align-center">
            <span class="me-2">🛒</span>
            Carrinho de Compras
          </v-card-title>

          <v-card-text class="mt-4 px-0">
            <div v-if="carrinho.length === 0" class="empty-cart">
              <v-icon size="64" color="grey lighten-1">mdi-cart-outline</v-icon>
              <p class="text-center cart-text mt-4">Seu carrinho está vazio.</p>
              <v-btn text color="primary" class="mt-4" @click="appStore.modalCarrinho = false">
                Continuar Comprando
              </v-btn>
            </div>

            <div v-else class="cart-items">
              <div class="cart-item" v-for="(item, index) in carrinho" :key="index">
                <div class="cart-item-content">
                  <div class="cart-item-image">
                    <v-img :src="item.urlImageProduct || 'https://via.placeholder.com/80'" height="80" width="80" cover
                      class="rounded-lg"></v-img>
                  </div>

                  <div class="cart-item-details">
                    <h3 class="cart-item-title">{{ item.productName }}</h3>
                    <p class="cart-item-price">R$ {{ formatPrice(item.precoProduct) }}</p>
                  </div>

                  <div class="cart-item-actions">
                    <div class="quantity-control">
                      <v-btn icon x-small @click="decrementarQuantidade(index)" :disabled="item.quantidade <= 1">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <span class="quantity-value">{{ item.quantidade || 1 }}</span>
                      <v-btn icon x-small @click="incrementarQuantidade(index)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>

                    <v-btn icon class="delete-btn" @click="removerItem(index)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>

              <v-divider class="my-4"></v-divider>

              <div class="cart-summary">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="text-subtitle-1">Subtotal:</span>
                  <span class="text-subtitle-1">R$ {{ formatPrice(subtotal) }}</span>
                </div>
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="text-subtitle-1">Frete:</span>
                  <span class="text-subtitle-1">{{ frete > 0 ? `R$ ${formatPrice(frete)}` : 'Grátis' }}</span>
                </div>
                <div class="d-flex justify-space-between align-center total-row">
                  <span class="text-h6 font-weight-bold">Total:</span>
                  <span class="text-h6 font-weight-bold">R$ {{ formatPrice(total) }}</span>
                </div>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="d-flex flex-column mt-4" v-if="carrinho.length > 0">
            <v-btn class="finish-btn mb-2" block elevation="2" @click="finalizarCompra">
              <v-icon left>mdi-cart-check</v-icon>
              Finalizar Compra
            </v-btn>
            <v-btn text class="continue-btn" @click="appStore.modalCarrinho = false">
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
      carrinho: [],
      subtotal: 0,
      frete: 0,
      total: 0
    }
  },
  mounted() {
    this.exibeCarrinho()
  },
  watch: {
    'appStore.cart': {
      handler() {
        this.exibeCarrinho();
      },
      deep: true
    },
    'appStore.modalCarrinho': function (newVal) {
      if (newVal === true) {
        this.exibeCarrinho();
      }
    }
  },
  computed: {
    appStore() {
      return useAppStore();
    },
    btnColor() {
      return this.$vuetify.theme.dark ? 'var(--modal-header)' : 'blue lighten-1'
    },
    iconColor() {
      return this.$vuetify.theme.dark ? 'var(--modal-header)' : 'blue lighten-1'
    }
  },
  methods: {
    exibeCarrinho() {
      this.carrinho = this.appStore.cart.map(item => {
        return {
          ...item,
          quantidade: item.quantidade || 1
        };
      });
      this.calcularTotal();
    },
    calcularTotal() {
      this.subtotal = this.carrinho.reduce((acc, item) => {
        const preco = typeof item.precoProduct === 'string'
          ? parseFloat(item.precoProduct.replace(',', '.'))
          : item.precoProduct;
        return acc + (preco * (item.quantidade || 1));
      }, 0);

      this.frete = this.subtotal >= 150 ? 0 : 15;
      this.total = this.subtotal + this.frete;
    },
    removerItem(index) {
      this.appStore.cart.splice(index, 1);
      localStorage.setItem('Carrinho', JSON.stringify(this.appStore.cart));
      this.calcularTotal();
    },
    incrementarQuantidade(index) {
      if (!this.carrinho[index].quantidade) {
        this.carrinho[index].quantidade = 1;
      }
      this.carrinho[index].quantidade++;
      this.atualizarCarrinho();
    },
    decrementarQuantidade(index) {
      if (this.carrinho[index].quantidade > 1) {
        this.carrinho[index].quantidade--;
        this.atualizarCarrinho();
      }
    },
    atualizarCarrinho() {
      this.appStore.cart = [...this.carrinho];
      localStorage.setItem('Carrinho', JSON.stringify(this.appStore.cart));
      this.calcularTotal();
    },
    formatPrice(price) {
      const value = typeof price === 'string'
        ? parseFloat(price.replace(',', '.'))
        : price;
      return value.toFixed(2).replace('.', ',');
    },
    finalizarCompra() {
      alert('Compra finalizada com sucesso!');
      this.appStore.cart = [];
      localStorage.setItem('Carrinho', JSON.stringify([]));
      this.appStore.modalCarrinho = false;
    }
  }
}
</script>

<style scoped>
.modal {
  background: var(--modal-bg) !important;
  border: 1px solid var(--modal-border) !important;
  box-shadow: var(--modal-shadow) !important;
  border-radius: 16px;
  color: var(--text-primary) !important;
  backdrop-filter: blur(10px);
}

.modal-header {
  color: var(--modal-header) !important;
  border-bottom: 2px solid var(--modal-border);
  padding: 1rem;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.cart-text {
  color: var(--text-secondary) !important;
  font-size: 1.1rem;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 16px;
  scrollbar-width: thin;
}

.cart-items::-webkit-scrollbar {
  width: 6px;
}

.cart-items::-webkit-scrollbar-thumb {
  background-color: var(--primary-light);
  border-radius: 10px;
}

.cart-item {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
  background-color: var(--card-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-item-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-item-image {
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--modal-border);
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.cart-item-price {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
}

.cart-item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.quantity-control {
  display: flex;
  align-items: center;
  background-color: var(--sidebar-hover);
  border-radius: 20px;
  padding: 2px 8px;
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.12));
}

.quantity-control .v-btn {
  background-color: var(--btn-bg, rgba(255, 255, 255, 0.08)) !important;
  color: var(--text-primary) !important;
}

.quantity-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0 4px;
  color: var(--text-primary) !important;
}

.delete-btn {
  color: var(--error, #ff5252) !important;
  transition: all 0.2s ease;
  background-color: var(--btn-bg, rgba(255, 255, 255, 0.08)) !important;
}

.delete-btn:hover {
  background-color: var(--btn-hover, rgba(244, 67, 54, 0.1)) !important;
}

.cart-summary {
  padding: 16px;
  background-color: var(--card-bg);
  border-radius: 12px;
  margin: 16px 0;
}

.total-row {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--modal-border);
}

.close-btn {
  color: var(--primary) !important;
  background-color: var(--btn-bg, rgba(255, 255, 255, 0.08)) !important;
}

.close-btn .v-icon {
  color: var(--text-primary) !important;
}

.finish-btn {
  background-color: var(--primary, #1976d2) !important;
  color: white !important;
  border-radius: 8px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  padding: 12px;
}

.continue-btn {
  color: var(--primary, #1976d2) !important;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  background-color: transparent !important;
}

.finish-btn:hover {
  background-color: var(--secondary) !important;
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-2px);
}

.continue-btn:hover {
  background-color: var(--sidebar-hover) !important;
  transform: translateY(-2px);
}

/* Adicionando estilos específicos para o modo escuro */
:deep(.theme--dark) {
  .quantity-control {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.12);
  }
  
  .quantity-control .v-btn {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .delete-btn {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .delete-btn:hover {
    background-color: rgba(244, 67, 54, 0.2) !important;
  }

  .cart-item {
    background-color: rgba(30, 30, 30, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .cart-summary {
    background-color: rgba(30, 30, 30, 0.8);
  }
  
  .close-btn {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
}

@media (max-width: 600px) {
  .cart-item-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item-image {
    width: 100%;
    max-width: 120px;
    margin-bottom: 8px;
  }

  .cart-item-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
  }
}
</style>