<template>
  <section class="p2">
    <Home />
  </section>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
// Set based on your logic or CMS data:
isDark.value = true // or false
useHeaderPadding.value = false

definePageMeta({
  pageTitle: 'Home'
})
</script> 