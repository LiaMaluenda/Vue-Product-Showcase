// Lógica de la lista: lee el estado de Vuex, muestra filtros y tarjetas.
import { mapState, mapGetters, mapActions } from 'vuex'
import ProductCard from '../ProductCard/ProductCard.vue'
import { categoryLabel } from '@/utils/formatters'

export default {
  name: 'ProductList',

  components: { ProductCard },

  computed: {
    // Lee datos del módulo "products"
    ...mapState('products', ['loading', 'error', 'categories']),
    ...mapGetters('products', ['filteredProducts', 'isEmpty']),
    // Lee la función "isFavorite" del módulo "favorites"
    ...mapGetters('favorites', ['isFavorite']),

    // Opciones del selector de categoría (incluye "Todas")
    categoryOptions () {
      const options = this.categories.map(cat => ({ label: categoryLabel(cat), value: cat }))
      return [{ label: 'Todas', value: 'all' }, ...options]
    },

    // Cada filtro es un "computed con get y set":
    // get = leer de Vuex, set = guardar en Vuex.
    category: {
      get () { return this.$store.state.filters.category },
      set (value) { this.setCategory(value) }
    },
    search: {
      get () { return this.$store.state.filters.search },
      set (value) { this.setSearch(value) }
    },
    onlyFavorites: {
      get () { return this.$store.state.filters.onlyFavorites },
      set (value) { this.setOnlyFavorites(value) }
    }
  },

  methods: {
    ...mapActions('products', ['fetchProducts']),
    ...mapActions('filters', ['setCategory', 'setSearch', 'setOnlyFavorites', 'resetFilters']),
    ...mapActions('favorites', ['toggleFavorite'])
  },

  // Ciclo de vida: apenas la lista aparece en pantalla, pide los productos a la API.
  mounted () {
    this.fetchProducts()
  }
}