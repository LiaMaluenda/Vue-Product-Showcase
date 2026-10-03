// Prueba unitaria 2: si la API falla, <ProductList> muestra el mensaje de error.
import { mount, flushPromises } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ProductList from '@/components/ProductList/ProductList.vue'
import products from '@/store/modules/products'
import filters from '@/store/modules/filters'
import favorites from '@/store/modules/favorites'
import * as api from '@/services/api'


jest.mock('@/services/api')

const vuetify = createVuetify({ components, directives })

function buildStore () {
  return createStore({ modules: { products, filters, favorites } })
}

describe('ProductList.vue', () => {
  it('muestra una alerta de error cuando la API falla', async () => {
    api.getProducts.mockRejectedValue(new Error('Network Error'))
    api.getCategories.mockResolvedValue([])

    const wrapper = mount(ProductList, {
      global: { plugins: [buildStore(), vuetify] }
    })

    await flushPromises() 

    const alert = wrapper.find('[data-cy="error"]')
    expect(alert.exists()).toBe(true)
    expect(alert.text()).toContain('No pudimos cargar los productos')
    expect(wrapper.find('[data-cy="product-card"]').exists()).toBe(false)
  })
})