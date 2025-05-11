<template>
  <SectionHero section="2"/>

  <section>
    <div class="wrapper"> 
      <img src="/images/rhymes-1.jpg" alt="Rhymes 1" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/rhymes-2.jpg" alt="Rhymes 2" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/rhymes-3.jpg" alt="Rhymes 3" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/rhymes-4.jpg" alt="Rhymes 4" />
    </div>
  </section>


</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Rhymes (What)'
})
</script> 