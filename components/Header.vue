<template>
  <header ref="headerRef" :class="['header-bar', 'flex', 'flex-row', 'flex-center', 'px2', 'py1', { dark: menuOpen }]">
    <div class="header-left">
      <div class="circle--heading" :style="{ zIndex: menuOpen ? 1004 : 1, position: 'relative' }">
        <span class="circle"></span>
        <span class="page-title">{{ menuOpen ? 'Menu' : pageTitle }}</span>
      </div>
    </div>
    <NuxtLink
      v-if="!isHome || menuOpen"
      to="/"
      class="logo-center"
      :style="{ zIndex: menuOpen ? 1003 : 1, position: 'relative' }"
      @click="menuOpen ? closeMenu() : null"
    >
      <Logo />
    </NuxtLink>
    <div class="header-right flex flex-row flex-center">
      <button class="hamburger" @click="toggleMenu" aria-label="Open menu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>
    <transition name="menu-fade-slide">
      <div
        v-if="menuOpen"
        class="mobile-menu dark"
        :style="{ paddingTop: `${headerHeight}px`, height: '100vh' }"
      >
        <ul class="flex flex-col flex-center fullscreen-menu" :style="{ paddingBottom: navStyle.fontSize }">
          <li v-for="item in navItems" :key="item.text">
            <NuxtLink :to="item.to" @click.native="closeMenu" :style="navStyle">{{ item.text }}</NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import Logo from '~/components/Logo.vue';
import { mainMenu } from '~/composables/useMainMenu.js';
const route = useRoute();
const navItems = mainMenu;
const menuOpen = ref(false);
const headerRef = ref(null);
const headerHeight = ref(0);
const menuHeight = ref(0);
const resizeKey = ref(0);
const updateHeights = () => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight;
    menuHeight.value = window.innerHeight - headerHeight.value;
    document.body.style.setProperty('--header-height', `${headerHeight.value}px`);
  }
};
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  nextTick(updateHeights);
};
const closeMenu = () => (menuOpen.value = false);
const pageTitle = computed(() => route.meta.pageTitle || '');
const navStyle = computed(() => {
  resizeKey.value;
  const itemCount = navItems.length;
  let fontSize;
  if (window.innerWidth < 1024) {
    fontSize = '10vw';
  } else {
    fontSize = `${Math.max(24, Math.floor(menuHeight.value / (itemCount * 1.2)))}px`;
  }
  return {
    fontSize,
    lineHeight: 1,
  };
});
const isHome = computed(() => route.path === '/');
function handleResize() {
  updateHeights();
  resizeKey.value++;
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
  nextTick(updateHeights);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
watch(menuOpen, (open) => {
  if (open) nextTick(updateHeights);
});
watch(() => route.path, () => {
  nextTick(updateHeights);
});
</script>

<style scoped>


.header-bar {
  justify-content: space-between;
  align-items: start;
  transition: background 0.3s, color 0.3s;
}
.header-bar.dark {
 
  color: var(--color-text, #fff);
}
.header-left, .header-right {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
}

.logo-center {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  z-index: 1003;
  position: relative;
}
.header-left {
  justify-content: flex-start;
}
.header-right {
  justify-content: flex-end;
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
  height: 2px;
  background: currentColor;
  border-radius: 0px;
  transition: all 0.3s;
}
.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}
.mobile-menu {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #000;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, color 0.3s;
  /* top and height set dynamically */
}
.menu-fade-slide-enter-active, .menu-fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.menu-fade-slide-enter-from, .menu-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.menu-fade-slide-enter-to, .menu-fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fullscreen-menu {
  width: 100vw;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style> 