import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ProductCard from "@/components/ProductCard/ProductCard.vue";

const vuetify = createVuetify({ components, directives });

const product = {
  id: 1,
  title: "Mochila Fjallraven",
  price: 109.95,
  description: "Mochila resistente",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/mochila.jpg",
  rating: { rate: 3.9, count: 120 },
};

describe("ProductCard.vue", () => {
  it("muestra título, categoría en español y precio en pesos chilenos", () => {
    const wrapper = mount(ProductCard, {
      props: { product },
      global: { plugins: [vuetify] },
    });

    expect(wrapper.find('[data-cy="product-title"]').text()).toBe(
      "Mochila Fjallraven",
    );
    expect(wrapper.find('[data-cy="product-category"]').text()).toBe(
      "Ropa de hombre",
    );
        expect(wrapper.find('[data-cy="product-price"]').text()).toBe("$104.453");
  });
});
