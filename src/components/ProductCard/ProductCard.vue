<template>
  <v-card class="product-card" elevation="3" data-cy="product-card">
    <div class="product-card__image-wrap">
      <v-img :src="product.image" :alt="product.title" height="200" contain class="product-card__image" />
    </div>

    <v-card-item>
      <v-chip size="small" color="primary" variant="tonal" class="mb-2" data-cy="product-category">
        {{ categoryName }}
      </v-chip>
      <v-card-title class="product-card__title" data-cy="product-title">
        {{ product.title }}
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="product-card__price" data-cy="product-price">{{ formattedPrice }}</div>
      <div v-if="product.rating" class="product-card__rating">
        <v-rating :model-value="product.rating.rate" density="compact" size="small" half-increments readonly color="amber" />
        <span>({{ product.rating.count }})</span>
      </div>
    </v-card-text>

    <v-spacer />

    <v-card-actions>
      <v-btn variant="tonal" color="primary" data-cy="detail-button" @click="showDetail = true">
        Ver detalle
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        :color="isFavorite ? 'secondary' : undefined"
        :aria-label="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        data-cy="favorite-button"
        @click="onToggleFavorite"
      >
        <v-icon :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'" />
      </v-btn>
    </v-card-actions>

  
    <v-dialog v-model="showDetail" max-width="600">
      <v-card>
        <v-card-title class="product-card__dialog-title">{{ product.title }}</v-card-title>
        <v-card-text>
          <v-img :src="product.image" :alt="product.title" height="220" contain class="mb-4" />
          <p class="mb-3">{{ product.description }}</p>
          <strong>{{ formattedPrice }}</strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="showDetail = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./ProductCard.js"></script>
<style src="./ProductCard.css"></style>