import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const axios = require('axios').default

export default new Vuex.Store({
  state: {
    productos: []
  },
  getters: {
    tenProducts(state){
      return state.productos.slice(0,10)
    },
    productsForID: (state) => (id) =>{
      const producto = state.productos.filter(producto => producto.id === id)
      return producto
    },
    productsForBrandAndDescription: (state) => (palabra) =>{
      const reg = new RegExp(palabra, "g"); 
      const producto1 = state.productos.filter(producto => producto.brand.match(reg))
      const producto2 = state.productos.filter(producto => producto.description.match(reg))
      const set = new Set([...producto1,...producto2])
      const producto = []
      for (const product of set) {
        producto.push(product)
      }
      return producto
    }
  }
  ,
  mutations: {
    loadProducts(state){
      const emptyProduct = []
      const newProductos = JSON.parse(JSON.stringify(emptyProduct))
      axios.get('https://ramenonline-bed7f.firebaseio.com/productos.json').then(response=>{
         return response.data
      }).then(data => {
        for (const key in data) {
          newProductos.push(data[key])
        }
      })
      state.productos = newProductos
    }
  },
  actions: {
    loadProducts(context) {
      context.commit('loadProducts')
    }
  },
  modules: {
  }
})
