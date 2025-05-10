<template>
  <section class="p2">
    <Home />
  </section>
</template>

<script setup>
import { isDark } from '~/composables/usePageUi.js'
// Set based on your logic or CMS data:
isDark.value = true // or false

definePageMeta({
  pageTitle: 'Home'
})
</script> 