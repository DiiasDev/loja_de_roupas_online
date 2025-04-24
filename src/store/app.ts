import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    modalCadastro: false,
    user: (() => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return Array.isArray(storedUser) ? storedUser : [];
      } catch {
        return [];
      }
    })(),
    isLoged: JSON.parse(localStorage.getItem('isLoged') || 'false'),
  }),
  getters: {},
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('isLoged', JSON.stringify(this.isLoged));
    },
    addUser(newUser) {
      this.user.push(newUser);
      this.saveToLocalStorage();
    },
    setIsLoged(status) {
      this.isLoged = status;
      this.saveToLocalStorage();
    }
  },
});
