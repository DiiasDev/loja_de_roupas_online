<template>
    <v-container class="sobre-loja">
        <v-row>
            <v-col cols="12" md="6">
                <h1 class="title">Sobre a NOVAWEAR</h1>
                <p class="description">
                    Bem-vindo à NOVAWEAR, sua loja virtual de roupas masculinas e femininas. Nossa missão é oferecer
                    produtos de alta qualidade, com designs modernos e confortáveis, para que você se sinta confiante
                    em qualquer ocasião.
                </p>
                <p class="description">
                    Trabalhamos com dedicação para trazer as últimas tendências da moda diretamente para você, com
                    praticidade e segurança. Explore nossa coleção e descubra o que há de melhor no mundo da moda.
                </p>
            </v-col>
            <v-col cols="12" md="6">
                <v-img src="@/assets/novawear.png" alt="Logo NOVAWEAR" class="logo" />
            </v-col>
        </v-row>
        <v-row>
            <v-col :class="display.xs ? 'pb-8 mb-8' : ''" cols="12" md="6">
                <h2 class="subtitle">Conecte-se conosco:</h2>
                <ul v-if="display.xs" class="social-links">
                    <v-row style=" gap: 1rem;">
                        <li>
                            <v-icon color="blue">mdi-linkedin</v-icon>
                            <a href="https://www.linkedin.com/in/gabriel-dias-8a8209255/" target="_blank">Linkedin</a>
                        </li>
                        <li>
                            <v-icon color="black">mdi-github</v-icon>
                            <a href="https://github.com/DiiasDev" target="_blank">GitHub</a>
                        </li>
                        <li>
                            <v-icon color="pink">mdi-instagram</v-icon>
                            <a href="https://www.instagram.com/diiassf/?next=%2F" target="_blank">Instagram</a>
                        </li>
                    </v-row>

                </ul>

                <ul v-else class="social-links">
                    <li>
                        <v-icon color="blue">mdi-linkedin</v-icon>
                        <a href="https://www.linkedin.com/in/gabriel-dias-8a8209255/" target="_blank">Linkedin</a>
                    </li>
                    <li>
                        <v-icon color="black">mdi-github</v-icon>
                        <a href="https://github.com/DiiasDev" target="_blank">GitHub</a>
                    </li>
                    <li>
                        <v-icon color="pink">mdi-instagram</v-icon>
                        <a href="https://www.instagram.com/diiassf/?next=%2F" target="_blank">Instagram</a>
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAppStore } from '../store/app.ts';
import { useDisplay } from 'vuetify';
export default {
    name: "SobreLoja",
    data() {
        return {
            display: useDisplay()
        }
    },
    computed: {
        appStore() {
            return useAppStore()
        }
    },
    methods: {
    }
};
</script>

<style scoped>
.sobre-loja {
    background: var(--background);
    color: var(--text-primary);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    transition: background 0.3s, color 0.3s;
}

.title {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 1rem;
    transition: color 0.3s;
}

.description {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--text-text);
    margin-bottom: 1rem;
    transition: color 0.3s;
}

.logo {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    transition: box-shadow 0.3s;
}

.subtitle {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 1rem;
    transition: color 0.3s;
}

.social-links {
    list-style: none;
    padding: 0;
}

.social-links li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.social-links v-icon {
    margin-right: 0.5rem;
    color: var(--primary);
    transition: color 0.3s;
}
</style>