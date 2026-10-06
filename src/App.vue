<template>
  <v-app>
    <AppHeader />

    <v-main class="app-main">
      <v-container class="app-container">
        <ProductList />
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import { AppHeader, AppFooter, ProductList } from './App.js'
</script>
<style src="./App.css"></style>
