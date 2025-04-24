import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        modalLogin: false,
    }),
    getters: {},
    actions: {},
});
