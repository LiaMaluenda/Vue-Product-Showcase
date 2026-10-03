export default {
  namespaced: true,

  state: () => ({
    ids: []
  }),

  getters: {
    count: state => state.ids.length,
    isFavorite: state => id => state.ids.includes(id)
  },

  mutations: {
    TOGGLE (state, id) {
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(favId => favId !== id)
      } else {
        state.ids.push(id)
      }
    }
  },

  actions: {
    toggleFavorite ({ commit }, id) { commit('TOGGLE', id) }
  }
}