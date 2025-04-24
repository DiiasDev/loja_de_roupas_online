import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        modalCadastro: false,
    }),
    getters: {},
    actions: {},
});
