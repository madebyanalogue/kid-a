<template>
  <SectionHero section="3"/>

  <section>
    <div class="wrapper"> 
      <img src="/images/life-1.jpg" alt="Life 1" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/life-2.jpg" alt="Life 2" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/life-3.jpg" alt="Life 3" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/life-4.jpg" alt="Life 4" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/life-5.jpg" alt="Life 5" />
    </div>
  </section>

  <section>
    <div class="wrapper"> 
      <img src="/images/life-6.jpg" alt="Life 6" />
    </div>
  </section>

</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Life'
})
</script> 