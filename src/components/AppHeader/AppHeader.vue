<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title class="header-title">
      <v-icon icon="mdi-storefront-outline" class="mr-2" />
      Vue Product Showcase
    </v-app-bar-title>

    <v-chip class="mr-2" variant="flat" color="secondary" data-cy="favorites-count">
      <v-icon icon="mdi-heart" start />
      {{ favoritesCount }}
    </v-chip>

    <v-btn
      icon
      :aria-label="isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
      data-cy="theme-toggle"
      @click="toggleTheme"
    >
      <v-icon :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAppHeader } from './AppHeader.js'

const { favoritesCount, isDark, toggleTheme } = useAppHeader()
</script>
<style src="./AppHeader.css"></style>