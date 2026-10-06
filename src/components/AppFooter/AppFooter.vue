<template>
  <v-footer class="app-footer" border>
    <span>© {{ year }} Vue Product Showcase</span>
    <span class="app-footer__source">
      Datos de
      <a href="https://fakestoreapi.com" target="_blank" rel="noopener">FakeStoreAPI</a>
    </span>
  </v-footer>
</template>

<script setup>
import { useAppFooter } from './AppFooter.js'

const { year } = useAppFooter()
</script>
<style src="./AppFooter.css"></style>