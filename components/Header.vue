<template>
  <header class="flex flex-row flex-center px-fluid py-fluid">
    <div class="logo">KID A</div>
    <nav class="desktop-nav">
      <ul class="flex flex-row flex-center">
        <li v-for="item in navItems" :key="item.text">
          <NuxtLink :to="item.to">{{ item.text }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <button class="hamburger" @click="toggleMenu" aria-label="Open menu">
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
    </button>
    <div v-if="menuOpen" class="mobile-menu">
      <ul class="flex flex-col flex-center fullscreen-menu">
        <li v-for="item in navItems" :key="item.text">
          <NuxtLink :to="item.to" @click.native="closeMenu" :style="navStyle">{{ item.text }}</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
const navItems = [
  { text: 'BEATS', to: '/about' },
  { text: 'RHYMES', to: '/what' },
  { text: 'LIFE', to: '/life' },
  { text: 'PRESS', to: '/press' },
  { text: 'PLAYLIST', to: '/playlists' },
  { text: 'EATS', to: '/eats' },
];
const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);
const navStyle = computed(() => {
  return {
    fontSize: `${window.innerHeight * 0.1}px`,
    lineHeight: 1.1,
  };
});
function handleResize() {
  // force update for navStyle
  navStyle.value = navStyle.value;
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.logo {
  font-weight: bold;
  font-size: 2rem;
}
.desktop-nav {
  display: none;
}
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1002;
}
.hamburger span {
  display: block;
  width: 28px;
  height: 3px;
  background: #111;
  border-radius: 2px;
  transition: all 0.3s;
}
.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
.mobile-menu {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fullscreen-menu {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
@media (min-width: 1024px) {
  .desktop-nav {
    display: block;
  }
  .hamburger, .mobile-menu {
    display: none;
  }
}
</style> 