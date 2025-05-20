<template>
  <PageTemplate title="Decarbonization Plan">
    <p>Our commitment to reducing carbon emissions and achieving net-zero targets. Our decarbonization strategy includes science-based targets aligned with 1.5°C pathway, supply chain emissions reduction, renewable energy transition, circular economy initiatives, and carbon offset programs.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Decarbonization Plan'
})
</script> 