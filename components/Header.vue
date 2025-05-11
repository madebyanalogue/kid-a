<template>
  <header ref="headerRef" :class="['header-bar', 'flex', 'flex-row', 'flex-center', 'px2', 'py2', { dark: menuDark }]">
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
      <div class="logo">
        <Logo />
      </div>
    </NuxtLink>
    <div class="header-right flex flex-row flex-center">
      <button class="hamburger" @click="toggleMenu" aria-label="Open menu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>
    <transition name="menu-fade-slide" @after-enter="onMenuEnter" @before-leave="onMenuLeave" @after-leave="onMenuAfterLeave">
      <div
        v-if="menuBgVisible"
        class="mobile-menu dark"
        :style="{ paddingTop: `${headerHeight}px`, height: '100vh' }"
      >
        <transition name="menu-items-fade" @after-leave="onMenuItemsAfterLeave">
          <ul
            v-if="showMenuItems"
            class="flex flex-col flex-center gap-1 fullscreen-menu"
            :style="{ paddingBottom: navStyle.fontSize }"
          >
            <li
              v-for="item in navItems"
              :key="item.text"
            >
              <template v-if="item.to.startsWith('/')">
                <NuxtLink :to="item.to" @click.native="closeMenu" :style="navStyle">
                  <MenuSvg :item="item.text" />
                </NuxtLink>
              </template>
              <template v-else>
                <a :href="item.to" target="_blank" rel="noopener" @click="closeMenu" :style="navStyle">
                  <MenuSvg :item="item.text" />
                </a>
              </template>
            </li>
          </ul>
        </transition>
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
const menuDark = ref(false);
const menuBgVisible = ref(false);
const headerRef = ref(null);
const headerHeight = ref(0);
const menuHeight = ref(0);
const resizeKey = ref(0);
let darkTimeout = null;

const updateHeights = () => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight;
    menuHeight.value = window.innerHeight - headerHeight.value;
    document.body.style.setProperty('--header-height', `${headerHeight.value}px`);
  }
};
const toggleMenu = () => {
  if (!menuOpen.value) {
    // Cancel any pending close
    if (darkTimeout) {
      clearTimeout(darkTimeout);
      darkTimeout = null;
    }
    menuOpen.value = true;
    menuBgVisible.value = true;
    menuDark.value = true;
    showMenuItems.value = true; // ensure items are visible
    nextTick(updateHeights);
  } else {
    closeMenu();
  }
};
const closeMenu = () => {
  if (!menuOpen.value) return; // prevent double-close
  showMenuItems.value = false;
};
function onMenuItemsAfterLeave() {
  darkTimeout = setTimeout(() => {
    menuBgVisible.value = false;
    menuOpen.value = false;
    if (!menuOpen.value) {
      menuDark.value = false;
    }
    darkTimeout = null;
  }, 300);
}
function onMenuAfterLeave() {
  setTimeout(() => {
    menuDark.value = false;
  }, 700); // increased delay for further dark mode fade-out
}
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

// --- Menu items fade logic ---
const showMenuItems = ref(false);
function onMenuEnter() {
  setTimeout(() => {
    showMenuItems.value = true;
  }, 100); // reduced delay for faster fade in
}
function onMenuLeave() {
  showMenuItems.value = false;
}
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
  gap: 5px;
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
  left: 0;
  top: 0;
  right: 0;
  background: #000;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease 1s, color 0.3s;
  /* top and height set dynamically */
}
.menu-fade-slide-enter-active, .menu-fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.menu-fade-slide-enter-from, .menu-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(0px);
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
.menu-items-fade-enter-active, .menu-items-fade-leave-active {
  transition: opacity 0.3s;
}
.menu-items-fade-enter-from, .menu-items-fade-leave-to {
  opacity: 0;
}
.menu-items-fade-enter-to, .menu-items-fade-leave-from {
  opacity: 1;
}
li {
  transition: opacity 0.3s;
}
</style> 