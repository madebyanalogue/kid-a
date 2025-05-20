<template>
  <SectionHero section="1"/>

  <!-- HEADLINE -->
  <section>
    <div class="wrapper"> 
      <div class="py6">
        <div class="grid text-center grid-center-items">
          <div class="col-span-12 col-span-9-md">
            <div class="h2">Kid-A was founded in 2019 by Adam Toms and Andy Silcock. With probably a bit too much experience in telco and consumer electronics, it was clear to them that there was an opportunity to change the way a small part of a huge industry worked. With Phil Roberson and Ollie Smith joining soon after the Kid-A band were ready to start figuring out the melody.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- IMAGE [CONSTRAINED HEIGHT] -->
  <section>
    <div class="wrapper">
      <div class="">
          <NuxtImg src="/images/about-1.jpg" alt="About 1" style="width:auto;max-height: 100svh;margin:0 auto;" />
      </div>
    </div>
  </section>
  
  <!-- NESTED -->
  <section>
    <div class="wrapper">
      <div class="relative py6">
        <div class="cover object-fit-child show-md">
          <NuxtImg src="/images/about-2.jpg" alt="About 2" />
        </div>
        <div class="hide-md">
          <NuxtImg src="/images/about-2.jpg" alt="About 2" />
        </div>
        <div class="grid">
          <div class="col-span-12 col-span-6-md col-start-4-md medium white p2">
            <div class="grid">
              <div class="col-span-2">
                <NuxtImg src="/images/certified.svg" />
              </div>
            </div>
            <div class="py2"></div>
            <div class="h4 rte"><p>We love music and to absolutely no one’s surprise, we named the company after Radiohead’s game changer of an album because we wanted Kid-A to be like that album: fearless about change, disruptive and most essentially, brilliant.</p><p>As of 2025 we are a thriving business, proud to be one of the first B Corporations in our industry and a registered Social Enterprise with a deep commitment to sustainability and doing things better (not perfect).</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid middle-xs">
        <div class="col-span-12 col-span-6-md">
          <NuxtImg src="/images/about-3.jpg" alt="About 4" />
        </div>
        <div class="col-span-12 col-span-6-md p3-md">
          <div class="h4 rte"><p>In March 2025 we were listing in the top 30 (30th to be precise!) fastest growing companies in Europe according to the FT and Statista. This is a pretty fantastic and shows that you can grow fast and do the right things.</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid middle-xs grid-reverse">
        <div class="col-span-12 col-span-6-md">
          <NuxtImg src="/images/about-4.jpg" alt="About 4" />
        </div>
        <div class="col-span-12 col-span-6-md p3-md">
          <div class="h4 rte"><p>Our company vision is all about unlocking human potential, by being loving, optimistic, free thinking and disciplined.<br/><br/>Our company mission is to simply be the best at what we do and be the agent of change for our clients.<br/><br/>We are Kid-A.</p></div>
        </div>
      </div>
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