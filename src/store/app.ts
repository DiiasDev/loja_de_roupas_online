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
    modalCarrinho: false,
    modalSuporte: false,
    modalCadastroProduct: false,
    isPerfil: false,
    isAbout: false,
    isDark: false,
    isLight: true,
    isHome: true,
    isProduct: false,
    productsSaved: [],
    categories: ['Todos','Camisa','Calça','Bermuda','Vestido', 'Jaquetas/Moletons'],
    idProduct: 1,
    productName: '',
    categoriaProduct: [], // Changed from string to array
    descricaoProduct: '',
    precoProduct: '',
    urlImageProduct: ''
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
    },

    addProduct() {
      if (!this.idProduct ||
        !this.productName.trim() ||
        !Array.isArray(this.categoriaProduct) || this.categoriaProduct.length === 0 || // Check array instead of using trim
        !this.descricaoProduct.trim() ||
        !this.precoProduct.trim() ||
        !this.urlImageProduct.trim()) {

        console.log('Erro: Todos os campos devem ser preenchidos');
        return false;
      }

      try {
        const product = {
          idProduct: this.idProduct += 1,
          productName: this.productName,
          categoriaProduct: this.categoriaProduct,
          descricaoProduct: this.descricaoProduct,
          precoProduct: this.precoProduct,
          urlImageProduct: this.urlImageProduct
        }

        this.productsSaved.push(product);
        localStorage.setItem('Produtos', JSON.stringify(this.productsSaved));
        console.log('Produto salvo:', JSON.parse(localStorage.getItem('Produtos')));
        return true;
      } catch (error) {
        console.log('Falha ao salvar produto', error)
      }
    },

    showProduct(){
      try{
        if(this.product){
           JSON.parse(localStorage.getItem('Produtos'))
           console.log('PRODUTOS:', JSON.parse(localStorage.getItem('Produtos')))
        }
      } catch(error){
        console.log('Erro ao mostrar produto', error)
      }
    } 
  },
});
