<template>
  <PageTemplate title="Conflict Minerals Policy">
    <p>Our commitment to responsible sourcing of minerals and preventing the use of conflict minerals in our supply chain. Our approach includes due diligence on mineral sourcing, supplier engagement and assessment, traceability and chain of custody, third-party audits and verification, regular reporting and disclosure, and continuous improvement initiatives.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Conflict Minerals Policy'
})
</script> 