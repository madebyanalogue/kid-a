<template>
  <SectionHero section="1"/>

  <section>
    <div class="wrapper"> 
      <img src="/images/about-1.jpg" alt="About 1" />
    </div>
  </section>
  
  <section>
    <div class="wrapper">
      <img src="/images/about-2.jpg" alt="About 2" />
    </div>
  </section>
  
  <section>
    <div class="wrapper">
      <img src="/images/about-3.jpg" alt="About 3" />
    </div>
  </section>
  
  <section>
    <div class="wrapper">
      <img src="/images/about-4.jpg" alt="About 4" />
    </div>
  </section>

  <section>
    <div class="wrapper">
      <img src="/images/about-5.jpg" alt="About 5" />
    </div>
  </section>
  
  

</template>

<script setup>
import { isDark } from '~/composables/usePageUi.js'
isDark.value = false
import { useHeaderPadding } from '~/composables/usePageUi.js'
useHeaderPadding.value = false

definePageMeta({
  pageTitle: 'Beats (About)'
})
</script> 