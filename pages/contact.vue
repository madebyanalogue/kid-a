<template>
  <SectionContact />
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = true
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Contact'
})
</script> 