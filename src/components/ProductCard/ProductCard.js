// Lógica de la tarjeta: recibe un producto y avisa cuando se marca como favorito (Composition API).
import { ref, computed } from 'vue'
import { categoryLabel, formatPriceCLP } from '@/utils/formatters'

export function useProductCard (props, emit) {
  const showDetail = ref(false) // abre o cierra la ventana de detalle

  // Precio convertido a pesos chilenos
  const formattedPrice = computed(() => formatPriceCLP(props.product.price))
  // Categoría traducida al español
  const categoryName = computed(() => categoryLabel(props.product.category))

  function onToggleFavorite () {
    emit('toggle-favorite', props.product.id)
  }

  return { showDetail, formattedPrice, categoryName, onToggleFavorite }
}