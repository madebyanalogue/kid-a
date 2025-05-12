<template>
  <!-- <VisibleGrid /> -->
  <Header />
  <main :style="{ paddingTop: mainPaddingVar }">
    <NuxtPage />
  </main>
  <Footer />
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
//import VisibleGrid from '~/components/VisibleGrid.vue';
import { useDarkMode } from '~/composables/useDarkMode.js';
import { useFavicon } from '~/composables/useFavicon.js';
import { useHeaderPadding } from '~/composables/usePageUi.js';
import { computed } from 'vue';

const mainPaddingVar = computed(() =>
  useHeaderPadding.value ? 'var(--header-height)' : 'var(--pad-2)'
);

const { isDark } = useDarkMode();
useFavicon(isDark);
</script>
