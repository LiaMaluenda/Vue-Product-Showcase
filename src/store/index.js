import { createStore } from 'vuex'
import products from './modules/products'
import filters from './modules/filters'
import favorites from './modules/favorites'

export default createStore({
  modules: {
    products,
    filters,
    favorites
  }
})