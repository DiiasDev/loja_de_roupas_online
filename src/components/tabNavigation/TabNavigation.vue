<template>
    <v-row>
        <v-col cols="12" lg="4" xl="4" md="6" class="d-flex justify-center colsTab">
            <div class="custom-tabs-container">
                <div class="tabs-wrapper">
                    <v-tabs v-model="categoriaSelecionada" background-color="transparent"
                        slider-color="var(--secondary)" centered class="custom-tabs"
                        :mobile-breakpoint="0" :show-arrows="isMobileOrTablet">
                        <v-tab v-for="categoria in categorias" :key="categoria" :value="categoria"
                            @click="selecionarCategoria(categoria)" class="custom-tab">
                            {{ categoria }}
                        </v-tab>
                    </v-tabs>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { useAppStore } from '../../store/app.ts';
import './styles.css'

export default {
    name: 'TabNavigation',
    props: {
        value: {
            type: String,
            default: 'Camisa'
        }
    },
    data() {
        return {
            categorias: ['Camisa', 'Calça', 'Bermuda', 'Vestido', 'Jaquetas/Moletons'],
            categoriaSelecionada: this.value,
            windowWidth: window.innerWidth
        }
    },
    watch: {
        value(newValue) {
            this.categoriaSelecionada = newValue;
        }
    },
    computed: {
        Appstore() {
            return useAppStore();
        },
        isMobileOrTablet() {
            return this.windowWidth < 960;
        }
    },
    methods: {
        selecionarCategoria(cat) {
            this.categoriaSelecionada = cat;
            this.$emit('input', cat);
            this.$emit('change', cat);
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>