<template>
  <SectionHero section="3"/>
  
  <!-- HEADLINE -->
  <section>
    <div class="wrapper"> 
      <div class="py6">
        <div class="grid _text-center _grid-center-items">
          <div class="col-span-12 col-span-9-md">
            <div class="h2">Sustainability & Circularity<br/><br/>When it comes to sustainability and circularity, we consider ourselves true believers. Our industry still has deep rooted in manufactuvring in countries hundreds of miles away, with single use or complex plastics and then flown to the destination. This keeps us up at night.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- IMAGE -->
  <section>
    <div class="wrapper"> 
      <div class="grid grid-end-items">
          <div class="col-span-12 col-span-9-md">
            <img src="/images/life-2.jpg" alt="Life 2" />
          </div>
        </div>
    </div>
  </section>

  <!-- NESTED -->
  <section>
    <div class="wrapper">
      <div class="relative py9">
        <div class="cover object-fit-child show-md">
          <NuxtImg src="/images/life-3.jpg" alt="life 2" />
        </div>
        <div class="hide-md">
          <NuxtImg src="/images/life-3.jpg" alt="life 2" />
        </div>
        <div class="grid grid-center-items">
          <div class="col-span-12 col-span-6-md white-text-md">
            <div class="h2">This is something we definitely wanted to change and do our very best to lead the way forward. Our accreditations such as B Corp, EcoVadis, Science based targets initiative, the Carbon Disclosure Project and our membership of the UN Global Compact have given us the credibility and the voice to make an impact on our industry.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- IMAGE -->
  <section>
    <div class="wrapper"> 
      <img src="/images/life-4.jpg" alt="Life 4" />
    </div>
  </section>

  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid grid-reverse middle-xs">
        <div class="col-span-12 col-span-6-md">
          <NuxtImg src="/images/life-5.jpg" alt="Life 5" />
        </div>
        <div class="col-span-12 col-span-6-md show-md"></div>
      </div>
    </div>
  </section>

  <!-- HEADLINE -->
  <section>
    <div class="wrapper"> 
      <div class="py6">
        <div class="grid _text-center _grid-center-items">
          <div class="col-span-12 col-span-9-md rte">
            <div class="h2">We Support – Music Declares Emergency<br/><br/>Music Declares Emergency has been harnessing the power of music to put the climate emergency on the front page of culture for five years. Our small team have created a community of support within music that encompasses all the major UK music organisations and businesses, over 4000 recording artists and a host of important individuals and change makers within UK music culture.<br/><br/>Through the NO MUSIC ON A DEAD PLANET campaign they have shifted the dynamic of climate communications by on-boarding messengers of global impact, from Billie Eilish and Radiohead to the London Symphony Orchestra and Julian Lloyd Webber. By working across the entire music ecosystem, with a presence at grass roots shows and major festivals we are shifting access to climate activism into the mainstream.</div>
            <div class="py3 padtop"><a href="#" class="button"><span>Sign Up</span><span>Sign Up</span></a></div>
          </div>
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
  pageTitle: 'Life'
})
</script> 