<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
<div class="body">
  <div class="header">
    <Header />
  </div>
  
  <div class="content">
    <RouterView />
  </div>
</div>
</template>

<style lang="scss" scoped>
</style>
