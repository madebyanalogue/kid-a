<template>
  <BackToTop />
  <footer class="dark py2">
    <div class="wrapper">


      <div class="grid grid-1 pad-2">

        <!-- Row 1: 4 columns -->
        <div class="grid">
          <div class="col-span-3"><Logo /></div>
          <div class="col-span-3">
            <ul>
              <li v-for="item in mainMenu" :key="item.to">
                <NuxtLink :to="item.to">{{ item.text }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="col-span-3">
            <ul>
              <li v-for="item in footerMenu" :key="item.to">
                <NuxtLink :to="item.to">{{ item.text }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="col-span-3">
            <div class="grid grid-1">
              <div v-for="item in contactInfo" :key="item.label">
                <div v-html="item.value.replace(/\n/g, '<br>')"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: 1/4, 1/2, 1/4 -->
        <div class="grid">
          <div class="col-span-3"><Logo /></div>
          <div class="col-span-6"><Logo /></div>
          <div class="col-span-3"><Logo /></div>
        </div>

        <!-- Row 3: 10 logos -->
        <div class="flex justify-center logos-row">
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
  justify-content: space-between;
}
.logos-row > * {
  height: calc(var(--pad-3) * 1);
  width: auto;
}
</style> 