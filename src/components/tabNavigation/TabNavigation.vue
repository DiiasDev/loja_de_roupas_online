<template>
    <v-row>
        <v-col>
            <div class="custom-tabs-container">
                <div class="tabs-wrapper">
                    <v-tabs v-model="categoriaSelecionada" background-color="transparent"
                        slider-color="var(--secondary)" centered class="custom-tabs">
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
    },
    methods:{
        selecionarCategoria(cat) {
            this.categoriaSelecionada = cat;
            this.$emit('input', cat);
            this.$emit('change', cat);
        },
    }
}
</script>