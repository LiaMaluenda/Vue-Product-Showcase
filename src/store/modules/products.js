import { getProducts, getCategories } from '@/services/api'

export default {
  namespaced: true,

  state: () => ({
    items: [],
    categories: [],
    loading: false,
    error: null
  }),

  getters: {
    // Productos filtrados según el módulo "filters" y "favorites".
    filteredProducts (state, getters, rootState) {
      const { category, search, onlyFavorites } = rootState.filters
      const favIds = rootState.favorites.ids
      const text = search.trim().toLowerCase()

      return state.items.filter(product => {
        const matchCategory = category === 'all' || product.category === category
        const matchText = text === '' || product.title.toLowerCase().includes(text)
        const matchFav = !onlyFavorites || favIds.includes(product.id)
        return matchCategory && matchText && matchFav
      })
    },
    isEmpty (state, getters) {
      return !state.loading && !state.error && getters.filteredProducts.length === 0
    }
  },

  mutations: {
    SET_LOADING (state, value) { state.loading = value },
    SET_ERROR (state, message) { state.error = message },
    SET_PRODUCTS (state, products) { state.items = products },
    SET_CATEGORIES (state, categories) { state.categories = categories }
  },

  actions: {
    async fetchProducts ({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const [products, categories] = await Promise.all([getProducts(), getCategories()])
        commit('SET_PRODUCTS', products)
        commit('SET_CATEGORIES', categories)
      } catch (err) {
        commit('SET_ERROR', 'No pudimos cargar los productos. Revisa tu conexión e inténtalo de nuevo.')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}