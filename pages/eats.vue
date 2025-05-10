<template>
  <section class="p-fluid">
    <h1>Eats</h1>
    <p>This is the EATS page.</p>
  </section>
</template>

<script setup>
import { isDark } from '~/composables/usePageUi.js'
isDark.value = false

definePageMeta({
  pageTitle: 'Eats'
})
</script> 