<template>
  <section class="grid grid-1 gap-2 p2">
    <SectionContact />
  </section>
</template>

<script setup>
import { isDark } from '~/composables/usePageUi.js'
isDark.value = true

definePageMeta({
  pageTitle: 'Contact'
})
</script> 