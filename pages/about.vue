<template>
  <section class="p-fluid">
    <h1>About</h1>
    <p>This is the BEATS (ABOUT) page.</p>
  </section>
</template>

<script setup>
import { isDark } from '~/composables/usePageUi.js'
isDark.value = false

definePageMeta({
  pageTitle: 'Beats (About)'
})
</script> 