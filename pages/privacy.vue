<template>
  <PageTemplate title="Privacy Policy">
    <p>How we collect, use, and protect your personal information. Our privacy policy covers information we collect, how we use your information, information sharing and disclosure, data security and protection, your rights and choices, cookies and tracking technologies, international data transfers, and updates to this policy.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Privacy Policy'
})
</script> 