<template>
  <PageTemplate title="Modern Slavery Statement">
    <p>Our commitment to preventing modern slavery and human trafficking in our operations and supply chain. Our approach includes supply chain due diligence, supplier code of conduct, employee training and awareness, risk assessment and monitoring, and reporting and remediation procedures.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Modern Slavery Statement'
})
</script> 