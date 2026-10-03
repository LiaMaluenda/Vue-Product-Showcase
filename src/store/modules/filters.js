export default {
  namespaced: true,

  state: () => ({
    category: 'all',
    search: '',
    onlyFavorites: false
  }),

  mutations: {
    SET_CATEGORY (state, value) { state.category = value },
    SET_SEARCH (state, value) { state.search = value || '' },
    SET_ONLY_FAVORITES (state, value) { state.onlyFavorites = value },
    RESET (state) {
      state.category = 'all'
      state.search = ''
      state.onlyFavorites = false
    }
  },

  actions: {
    setCategory ({ commit }, value) { commit('SET_CATEGORY', value) },
    setSearch ({ commit }, value) { commit('SET_SEARCH', value) },
    setOnlyFavorites ({ commit }, value) { commit('SET_ONLY_FAVORITES', value) },
    resetFilters ({ commit }) { commit('RESET') }
  }
}