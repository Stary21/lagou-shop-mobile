<template>
  <home-nav />
  <home-main class="home-main" />
  <layout-footer />
</template>
<script setup>
import HomeMain from './components/HomeMain.vue'
import HomeNav from './components/HomeNav.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>
<style lang="scss" scoped>
.home-main {
  background-color: #f7f7f7;
  padding: 50px 0;
}
</style>
