<template>
    <v-row>
        <v-col>

        </v-col>
    </v-row>
</template>

<script>
import { useAppStore } from '../store/app.ts'
export default {
    name: 'HomeVue',
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

    }
}
</script>