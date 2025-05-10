<template>
  <VisibleGrid />
  <Header />
  <main>
    <NuxtPage />
  </main>
  <Footer />
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import VisibleGrid from '~/components/VisibleGrid.vue';
import { useDarkMode } from '~/composables/useDarkMode.js';
import { useFavicon } from '~/composables/useFavicon.js';

const { isDark } = useDarkMode();
useFavicon(isDark);
</script>