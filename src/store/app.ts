import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    modalCadastro: false,
    user: [], 
    isLoged: false,
  }),
  getters: {},
  actions: {
  },
});
