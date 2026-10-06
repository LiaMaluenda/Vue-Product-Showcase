// Lógica de la lista: lee el estado de Vuex, muestra filtros y tarjetas (Composition API).
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '../ProductCard/ProductCard.vue'
import { categoryLabel } from '@/utils/formatters'

export { ProductCard }

export function useProductList () {
  const store = useStore()

  // Datos del módulo "products"
  const loading = computed(() => store.state.products.loading)
  const error = computed(() => store.state.products.error)
  const filteredProducts = computed(() => store.getters['products/filteredProducts'])
  const isEmpty = computed(() => store.getters['products/isEmpty'])

  // Opciones del selector de categoría (incluye "Todas")
  const categoryOptions = computed(() => {
    const options = store.state.products.categories.map(cat => ({ label: categoryLabel(cat), value: cat }))
    return [{ label: 'Todas', value: 'all' }, ...options]
  })

  // Cada filtro es un "computed con get y set":
  // get = leer de Vuex, set = guardar en Vuex.
  const category = computed({
    get: () => store.state.filters.category,
    set: value => store.dispatch('filters/setCategory', value)
  })
  const search = computed({
    get: () => store.state.filters.search,
    set: value => store.dispatch('filters/setSearch', value)
  })
  const onlyFavorites = computed({
    get: () => store.state.filters.onlyFavorites,
    set: value => store.dispatch('filters/setOnlyFavorites', value)
  })

  // Acciones
  const isFavorite = id => store.getters['favorites/isFavorite'](id)
  const fetchProducts = () => store.dispatch('products/fetchProducts')
  const resetFilters = () => store.dispatch('filters/resetFilters')
  const toggleFavorite = id => store.dispatch('favorites/toggleFavorite', id)

  // Ciclo de vida: apenas la lista aparece en pantalla, pide los productos a la API.
  onMounted(() => {
    fetchProducts()
  })

  return {
    loading,
    error,
    filteredProducts,
    isEmpty,
    categoryOptions,
    category,
    search,
    onlyFavorites,
    isFavorite,
    fetchProducts,
    resetFilters,
    toggleFavorite
  }
}