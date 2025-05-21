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
    currentUser: (() => {
      try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
      } catch {
        return null;
      }
    })(),
    modalCarrinho: false,
    modalSuporte: false,
    modalCadastroProduct: false,
    isPerfil: false,
    isAbout: false,
    isDark: false,
    isLight: true,
    isHome: true,
    isProduct: false,
    cart: [],
    productsSaved: (() => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('Produtos'));
        return Array.isArray(storedProducts) ? storedProducts : [];
      } catch {
        return [];
      }
    })(),
    idProduct: (() => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('Produtos')) || [];
        if (Array.isArray(storedProducts) && storedProducts.length > 0) {
          const maxId = Math.max(...storedProducts.map(p => Number(p.idProduct) || 0));
          return maxId + 1;
        }
        return 1;
      } catch {
        return 1;
      }
    })(),
    categories: ['Camisa', 'Calça', 'Bermuda', 'Vestido', 'Jaquetas/Moletons'],
    productName: '',
    categoriaProduct: [],
    descricaoProduct: '',
    precoProduct: '',
    urlImageProduct: ''
  }),
  getters: {
    isAuthenticated() {
      return this.isLoged && this.currentUser !== null;
    }
  },

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('isLoged', JSON.stringify(this.isLoged));
      
      if (this.currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    },
    addUser(newUser) {
      this.user.push(newUser);
      this.saveToLocalStorage();
    },
    setIsLoged(status) {
      this.isLoged = status;
      if (!status) {
        this.currentUser = null;
      }
      this.saveToLocalStorage();
    },
    login(userCredentials) {
      const user = this.user.find(u => 
        u.email === userCredentials.email && 
        u.password === userCredentials.password
      );
      
      if (user) {
        this.currentUser = { ...user, password: undefined };
        this.isLoged = true;
        this.saveToLocalStorage();
        return true;
      }
      
      return false;
    },
    logout() {
      this.isLoged = false;
      this.currentUser = null;
      this.saveToLocalStorage();
    },
    checkAuthState() {
      console.log('Checking auth state:', { 
        isLoged: this.isLoged, 
        hasCurrentUser: !!this.currentUser 
      });
      
      if (this.isLoged && !this.currentUser) {
        console.log('Auth state mismatch - resetting login state');
        this.isLoged = false;
        localStorage.setItem('isLoged', 'false');
      } else if (this.currentUser && !this.isLoged) {
        console.log('Current user exists but not logged in - restoring session');
        this.isLoged = true;
        localStorage.setItem('isLoged', JSON.stringify(true));
      }
    },
    addProduct() {
      if (
        !this.productName.trim() ||
        !Array.isArray(this.categoriaProduct) || this.categoriaProduct.length === 0 ||
        !this.descricaoProduct.trim() ||
        !this.precoProduct.trim() ||
        !this.urlImageProduct.trim()
      ) {
        console.log('Erro: Todos os campos devem ser preenchidos');
        return false;
      }

      try {
        const product = {
          idProduct: this.idProduct,
          productName: this.productName,
          categoriaProduct: this.categoriaProduct,
          descricaoProduct: this.descricaoProduct,
          precoProduct: this.precoProduct,
          urlImageProduct: this.urlImageProduct
        };
        this.productsSaved.push(product);
        this.idProduct++;
        localStorage.setItem('Produtos', JSON.stringify(this.productsSaved));
        console.log(`Produto cadastrado com ID: ${product.idProduct}`);
        return true;
      } catch (error) {
        console.log('Falha ao salvar produto', error);
        return false;
      }
    },
    loadProductsFromStorage() {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('Produtos'));
        if (Array.isArray(storedProducts)) {
          this.productsSaved = storedProducts;

          if (storedProducts.length > 0) {
            const maxId = Math.max(...storedProducts.map(p => Number(p.idProduct) || 0));
            this.idProduct = maxId + 1;
          } else {
            this.idProduct = 1;
          }

          console.log(`Produtos carregados. Próximo ID: ${this.idProduct}`);
        }
      } catch (error) {
        console.log('Erro ao carregar produtos do localStorage', error);
      }
    },
    showProduct() {
      try {
        if (this.product) {
          JSON.parse(localStorage.getItem('Produtos'))
          console.log('PRODUTOS:', JSON.parse(localStorage.getItem('Produtos')))
        }
      } catch (error) {
        console.log('Erro ao mostrar produto', error)
      }
    }
  },
});
