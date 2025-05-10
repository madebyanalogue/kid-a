<template>
  <section class="p-fluid">
    <h1>What</h1>
    <p>This is the RHYMES (WHAT) page.</p>
  </section>
</template>

<script setup>
import { isDark } from '~/composables/usePageUi.js'
isDark.value = false

definePageMeta({
  pageTitle: 'Rhymes (What)'
})
</script> 