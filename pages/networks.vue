<template>
  <PageTemplate title="Networks">
    <p>Our commitment to sustainability and ethical business practices is reflected in our network of partners and certifications. We are proud members of B Corporation, UN Global Compact, Science Based Targets Initiative, Carbon Disclosure Project, and EcoVadis.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Networks'
})
</script> 