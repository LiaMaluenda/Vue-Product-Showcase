<template>
  <section class="product-list">
    <h1 class="text-h4 product-list__title">Catálogo de productos</h1>

    <!-- 1) Barra de filtros -->
    <v-card class="product-list__filters" variant="outlined">
      <v-row dense align="center">
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="category"
            :items="categoryOptions"
            item-title="label"
            item-value="value"
            label="Categoría"
            prepend-inner-icon="mdi-shape-outline"
            variant="outlined"
            density="comfortable"
            hide-details
            data-cy="category-filter"
          />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="search"
            label="Buscar por nombre"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            clearable
            hide-details
            data-cy="search-filter"
          />
        </v-col>

        <v-col cols="12" md="4" class="product-list__actions">
          <v-switch
            v-model="onlyFavorites"
            label="Solo favoritos"
            color="secondary"
            inset
            hide-details
            data-cy="favorites-filter"
          />
          <v-btn variant="text" color="primary" data-cy="reset-filters" @click="resetFilters">
            Limpiar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- 2) Estado: cargando -->
    <div v-if="loading" class="product-list__loading" data-cy="loading">
      <v-progress-circular indeterminate color="primary" size="56" />
      <p>Cargando productos...</p>
    </div>

    <!-- 3) Estado: error -->
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      title="Ocurrió un problema"
      class="product-list__message"
      data-cy="error"
    >
      <p>{{ error }}</p>
      <v-btn class="mt-3" color="error" variant="flat" data-cy="retry" @click="fetchProducts">
        Reintentar
      </v-btn>
    </v-alert>

    <!-- 4) Estado: vacío -->
    <v-alert
      v-else-if="isEmpty"
      type="info"
      variant="tonal"
      title="Sin resultados"
      text="No hay productos que coincidan con tus filtros."
      class="product-list__message"
      data-cy="empty"
    />

    <!-- 5) Estado: con datos -->
    <template v-else>
      <p class="product-list__count" data-cy="results-count">
        {{ filteredProducts.length }} producto(s) encontrados
      </p>

      <v-row>
        <v-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard
            :product="product"
            :is-favorite="isFavorite(product.id)"
            @toggle-favorite="toggleFavorite"
          />
        </v-col>
      </v-row>
    </template>
  </section>
</template>

<script setup>
import { ProductCard, useProductList } from './ProductList.js'

const {
  loading, error, filteredProducts, isEmpty, categoryOptions,
  category, search, onlyFavorites,
  isFavorite, fetchProducts, resetFilters, toggleFavorite
} = useProductList()
</script>
<style src="./ProductList.css"></style>