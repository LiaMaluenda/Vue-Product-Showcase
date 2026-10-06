# Vue Product Showcase

Catálogo de productos SPA hecho con **Vue 3 + Vue CLI**, que consume **FakeStoreAPI** con **Axios**, centraliza el estado con **Vuex** (módulos `products`, `filters`, `favorites`), usa **Vuetify 3** para un diseño responsive con modo claro/oscuro y se prueba con **Jest** (unitarias) y **Cypress** (E2E).

## Requisitos
- Node.js 18 o superior (recomendado: versión LTS)
- Vue CLI 5: `npm install -g @vue/cli`

## Instalación y uso
npm install                      # instala dependencias
npm run serve                    # modo desarrollo en http://localhost:8080
npm run build                    # versión optimizada en /dist
npm run test:unit                # pruebas unitarias (Jest)
npm run test:e2e                 # prueba E2E (Cypress, ventana interactiva)
npm run test:e2e -- --headless   # prueba E2E sin ventana

## Estructura
- src/main.js: arranque (Vue + Vuex + Vuetify)
- src/App.vue / App.js / App.css: componente raíz
- src/plugins/vuetify.js: configuración de Vuetify y temas
- src/services/api.js: cliente Axios para FakeStoreAPI
- src/utils/formatters.js: categorías en español y precios en pesos chilenos
- src/store/: store raíz y módulos products, filters, favorites
- src/components/: AppHeader, AppFooter, ProductList, ProductCard (cada uno con .vue + .js + .css)
- tests/unit/: ProductCard.spec.js, ProductList.spec.js
- tests/e2e/specs/filtros.cy.js: prueba E2E
- public/data/: JSON locales que usa la prueba E2E
- .env.e2e: activa los datos locales en modo e2e

## Decisiones técnicas
- **`<script setup>` en cada componente + separación .vue / .js / .css:** cada `.vue` tiene un `<script setup>` breve que importa su lógica desde el `.js` del mismo nombre, escrita como composable de Composition API (`useProductList`, `useProductCard`, `useAppHeader`, `useAppFooter`); los estilos llegan con `<style src>`. Así se cumple el uso de `<script setup>` sin mezclar plantilla, lógica y estilos (`<script setup>` no admite el atributo `src`, por eso la lógica se importa).
- **Header y Footer se llaman AppHeader y AppFooter:** la guía de estilo de Vue recomienda nombres de dos palabras para no chocar con las etiquetas HTML `<header>` y `<footer>`.
- **Ciclos de vida:** `onMounted` en `useProductList` dispara la carga de productos; `onMounted` en `useAppHeader` recupera el tema guardado.
- **Vuex con módulos namespaced:** el consumo de la API vive en la acción `products/fetchProducts`; el getter `filteredProducts` combina categoría, búsqueda y favoritos.
- **ProductCard es presentacional:** recibe `product` e `isFavorite` con `defineProps` y emite `toggle-favorite` con `defineEmits`; así es fácil de reutilizar y de probar.
- **Vuex en Composition API:** los componentes usan `useStore()` de Vuex y `useTheme()` de Vuetify dentro de sus composables.
- **Pruebas E2E con JSON local:** `npm run test:e2e` levanta la app en modo `e2e` (archivo `.env.e2e`), y en ese modo `api.js` lee `public/data/products.json` y `categories.json` en vez de FakeStoreAPI. Así la prueba no depende de internet y siempre ve los mismos 6 productos.
- **Vuetify 3:** grilla responsive (cols/sm/md/lg), componentes accesibles y tema claro/oscuro guardado en localStorage.
- **Español y pesos chilenos:** las categorías se traducen con un diccionario y los precios (USD en la API) se convierten a CLP con un valor de referencia fijo (USD_TO_CLP = 950) y formato es-CL. Los títulos de FakeStoreAPI se muestran en su idioma original.
- **¿Nuxt o Quasar?** No se migró: es una SPA de catálogo sin necesidad de SEO/SSR (Nuxt) ni de app móvil o de escritorio inmediata (Quasar). Vue CLI + Vuetify cubre el alcance con menos complejidad; si se necesita app móvil, Quasar sería el siguiente paso.

## Evidencias
Capturas de `npm run test:unit`, `npm run test:e2e -- --headless` y de la app (claro, oscuro, móvil, error) en la carpeta `docs/`.