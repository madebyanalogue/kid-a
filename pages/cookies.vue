<template>
  <PageTemplate title="Cookies Policy">
    <p>How we use cookies and similar technologies on our website. Our cookies policy covers what are cookies, types of cookies we use, how we use cookies, third-party cookies, cookie preferences, managing cookies, and updates to this policy.</p>
  </PageTemplate>
</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Cookies Policy'
})
</script> 