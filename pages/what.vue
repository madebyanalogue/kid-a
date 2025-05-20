<template>
  <SectionHero section="2"/>

  <!-- IMAGE -->
  <section>
    <div class="wrapper"> 
      <img src="/images/rhymes-1.jpg" alt="Rhymes 1" />
    </div>
  </section>

  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid middle-xs">
        <div class="col-span-12 col-span-6-md">
          <NuxtImg src="/images/what-1.jpg" alt="What 1" />
        </div>
        <div class="col-span-12 col-span-6-md p3-md">
          <div class="h4 rte"><p>Kid-A is an award-winning, purposeful managed services business based in Winchester in the UK. On behalf of our telco and retail clients, we help them solve problems drive performance and overall make things better and simpler. It’s genuinely more fun than that sounds.</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid middle-xs grid-reverse">
        <div class="col-span-12 col-span-6-md">
          <NuxtImg src="/images/what-2.jpg" alt="What 2" />
          <div class="grid absolute" style="transform: translateY(-20%);">
            <div class="col-span-4 col-span-3-md col-start-7-md">
              <NuxtImg src="/images/logo.svg" alt="Logo" />
            </div>
          </div>
        </div>
        <div class="col-span-12 col-span-6-md p3-md">
          <div class="h4 rte"><p>We have an extremely strong team with unparalleled commercial and operational experience across telecoms, retail and digital and partners trust us to driver overall performance of categories within their accessory and consumer electronics business. Again, this is better than it sounds! </p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid middle-xs">
        <div class="col-span-12 col-span-6-md">
          <NuxtImg src="/images/what-3.jpg" alt="What 3" />
        </div>
        <div class="col-span-12 col-span-6-md p3-md">
          <div class="h4 rte"><p>Our client list sits at the very top of UK consumer brands, namely Vodafone, Virgin Media O2 and John Lewis. On their behalf we work with numerous brands to tender product ranges and procure the right products for their customers. Not only are we focussing on delivering value for our partners, we are also working incredibly hard with them to drive their sustainability agenda and net zero aspirations.</p></div>
        </div>
      </div>
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