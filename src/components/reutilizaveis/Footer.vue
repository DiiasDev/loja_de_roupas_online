<template>
    <footer v-if="appStore.isLoged == false" class="d-flex justify-center footer">
        <p>&copy; DiiasDev</p>
    </footer>
</template>

<script>
import { useAppStore } from '../../store/app.ts'

export default {
    name: 'FooterPage',
    computed: {
        appStore() {
            return useAppStore();
        },
    }
}
</script>

<style scoped>
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

html{
    overflow-y: hiddend !important;
}

.v-application{
    overflow-y: hidden !important;

}
</style>