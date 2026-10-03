import { categoryLabel, formatPriceCLP } from '@/utils/formatters'

export default {
  name: 'ProductCard',

  props: {
    product: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },

  emits: ['toggle-favorite'],

  data () {
    return {
      showDetail: false
    }
  },

  computed: {
    formattedPrice () {
      return formatPriceCLP(this.product.price)
    },
    categoryName () {
      return categoryLabel(this.product.category)
    }
  },

  methods: {
    onToggleFavorite () {
      this.$emit('toggle-favorite', this.product.id)
    }
  }
}