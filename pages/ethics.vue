<template>
  <PageTemplate title="Ethics">
    <p>Our commitment to ethical business practices and corporate responsibility. Our ethical framework includes corporate governance, ethical decision-making, stakeholder engagement, transparency and accountability, social responsibility, and sustainable business practices.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Ethics'
})
</script> 