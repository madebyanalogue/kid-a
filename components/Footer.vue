<template>
  <BackToTop />
  <footer class="dark py2">
    <div class="wrapper">


      <div class="grid grid-1 gap-2">

        <!-- Row 1: 4 columns -->
        <div class="grid grid-1 grid-sm-2 grid-md-4 h5">
          <div class="">
            <div class="logo">
              <Logo />
            </div>
          </div>
          <div class="">
            <ul class="circle--active circle--hover">
              <li v-for="item in mainMenu" :key="item.to">
                <NuxtLink :to="item.to" :class="{ active: route.path === item.to }">{{ item.text }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="circle--active circle--hover">
              <li v-for="item in footerMenu" :key="item.to">
                <NuxtLink :to="item.to" :class="{ active: route.path === item.to }">{{ item.text }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="">
            <div class="rte uppercase">
              <div v-for="item in contactInfo" :key="item.label">
                <div v-html="item.value.replace(/\n/g, '<br>')"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: 1/4, 1/2, 1/4 -->
        <div class="grid grid-1 grid-sm-2 grid-md-4 h5">

          <div class="">
            <div class="flex flex-column flex-bottom fullheight">
              <img src="/logos/logo-11.png" alt="Logo" style="width:25%;min-width:70px;" />
            </div>
          </div>
          
          <div class="col-span-2-md">
            <div class="flex flex-column flex-bottom fullheight">
              <div class="grid grid-1 gap-1">
                <SocialIcons />
                <div class="">© {{ new Date().getFullYear() }} Kid-A All Rights Reserved.</div>
              </div>
            </div>
          </div>

          <div class="">
            <div class="flex flex-column flex-bottom fullheight">
              <img src="/logos/logo-12.png" alt="Logo" style="width:100%;max-width:360px;" />
            </div>
          </div>
              
        </div>

        <!-- Row 3: 10 logos -->
        <div class="flex justify-center logos-row py1 gap-2">
          <img
            v-for="(logo, i) in logos"
            :key="i"
            :src="logo"
            alt="Logo"
            style=""
          />
        </div>


      </div>
    </div>
  </footer>
</template>

<script setup>
import { mainMenu, footerMenu } from '~/composables/useMainMenu.js';
import { useRoute } from 'vue-router';
const route = useRoute();
const logos = [
  '/logos/logo-01.png',
  '/logos/logo-02.png',
  '/logos/logo-03.png',
  '/logos/logo-04.png',
  '/logos/logo-05.png',
  '/logos/logo-06.png',
  '/logos/logo-07.png',
  '/logos/logo-08.png',
  '/logos/logo-09.png',
  '/logos/logo-10.png'
]
</script>

<style scoped>
footer {
  background: var(--black);
  color: var(--white);
}

.logos-row {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 768px) {
.logos-row {
  justify-content: space-between;
}
}
.logos-row > * {
  height: calc(var(--pad-3) * 1);
  width: auto;
}
</style> 