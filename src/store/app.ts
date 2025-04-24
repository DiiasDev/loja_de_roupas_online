import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    modalCadastro: false,
    user: [], 
  }),
  getters: {},
  actions: {
  },
});
