<template>
    <v-main>
        <v-layout full-height>
            <v-navigation-drawer expand-on-hover rail permanent app
                style="position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto;">
                <v-list>
                    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                        subtitle="user@gmail.com" title="Nome Sobrenome">
                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon>mdi-settings</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>

                <v-divider />

                <v-list density="compact" nav>
                    <v-list-item @click="inicio" prepend-icon="mdi-home" title="Início" value="home" />
                    <v-list-item prepend-icon="mdi-package-variant" title="Produtos" value="produtos" />
                    <v-list-item @click="redireciona" prepend-icon="mdi-account" title="Meu Perfil" value="profile" />
                    <v-list-item @click="openCarrinho" prepend-icon="mdi-cart" title="Carrinho" value="cart" />
                    <v-list-item prepend-icon="mdi-information" title="Sobre a Loja" value="about" />
                    <v-list-item @click="openModalSuporte" prepend-icon="mdi-face-agent" title="Suporte"
                        value="support" />
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <v-container>
                    <CarrinhoDeCompras />
                    <modalSuporte />
                </v-container>
            </v-main>
        </v-layout>
    </v-main>

</template>

<script>
import { useAppStore } from '../../store/app.ts'
import CarrinhoDeCompras from '../modals/carrinhoDeCompras.vue'
import modalSuporte from '../modals/suporte.vue'

export default {
    name: 'NavigationVue',
    components: {
        CarrinhoDeCompras,
        modalSuporte,
    },
    data() {
        return {

        }
    },
    computed: {
        appStore() {
            return useAppStore();
        },
    },
    methods: {
        openCarrinho() {
            this.appStore.modalCarrinho = true
        },
        openModalSuporte() {
            this.appStore.modalSuporte = true
        },
        inicio() {
            this.appStore.isPerfil = false;
        },
        redireciona() {
            this.appStore.isPerfil = true;
        }
    }
}
</script>

<style scoped>
.v-navigation-drawer {
    background-color: #fafafa;
}

.v-card-title {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: white;
}

.v-card-subtitle {
    font-style: italic;
    color: #757575;
}

.v-btn {
    font-weight: 600;
}

.v-btn:hover {
    background-color: #1976D2 !important;
}

.v-row {
    margin-top: 30px;
}

.v-col {
    margin-bottom: 20px;
}

.v-navigation-drawer .v-list-item {
    font-weight: 500;
}

.v-main {
    background-color: #f4f4f4;
}

.v-main{
  height: 0%;
  padding: 0px;
}
</style>