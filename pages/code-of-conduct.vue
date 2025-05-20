<template>
  <PageTemplate title="Code of Conduct">
    <p>Our commitment to ethical business practices and responsible corporate behavior. Our Code of Conduct covers business ethics and integrity, anti-corruption and bribery, fair competition, human rights and labor standards, environmental responsibility, data protection and privacy, conflicts of interest, and reporting and whistleblowing.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Code of Conduct'
})
</script> 