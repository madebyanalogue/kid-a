<template>
  <header ref="headerRef" :class="['header-bar', 'flex', 'flex-row', 'flex-center', 'px2', 'py2', { dark: menuDark, 'menu-active': menuOpen, 'header-hidden': !isHeaderVisible }]">
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
    <div v-else class="logo-center" :style="{ zIndex: 1, position: 'relative' }">
      <div class="logo">
        <Logo />
      </div>
    </div>
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
            class="flex flex-col flex-center fullscreen-menu"
            :style="{ paddingBottom: navStyle.fontSize }"
          >
            <li
              v-for="item in navItems"
              :key="item.text"
            >
              <template v-if="item.to?.page && item.to.page.slug?.current">
                <NuxtLink
                  :to="`/${item.to.page.slug.current}`"
                  @click.native="closeMenu"
                  :style="navStyle"
                  class="menu-link"
                >
                  <span class="menu-text">{{ item.text }}</span>
                  <div class="menu-image-wrapper">
                    <template v-if="item.image?.asset?.url">
                      <NuxtImg :src="item.image.asset.url" :alt="item.text" />
                    </template>
                    <template v-else-if="item.image?.asset?._ref">
                      <NuxtImg :src="$urlFor(item.image).url()" :alt="item.text" />
                    </template>
                  </div>
                </NuxtLink>
              </template>
              <template v-else-if="item.to?.url">
                <a
                  :href="item.to.url"
                  target="_blank"
                  rel="noopener"
                  @click="closeMenu"
                  :style="navStyle"
                  class="menu-link"
                >
                  <span class="menu-text">{{ item.text }}</span>
                  <div class="menu-image-wrapper">
                    <template v-if="item.image?.asset?.url">
                      <NuxtImg :src="item.image.asset.url" :alt="item.text" />
                    </template>
                    <template v-else-if="item.image?.asset?._ref">
                      <NuxtImg :src="$urlFor(item.image).url()" :alt="item.text" />
                    </template>
                  </div>
                </a>
              </template>
            </li>
            <li v-if="!navItems.length || navItems.every(item => !(item.to?.page && item.to.page.slug?.current) && !item.to?.url)" style="color: #fff; opacity: 0.7; font-size: 16px; text-align: center;">
              No menu items found or items are missing required fields.
            </li>
          </ul>
        </transition>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from '#app';
import { useHeaderScroll } from '~/composables/useHeaderScroll';
import Logo from '~/components/Logo.vue';
import { NuxtImg } from '#components'
import imageUrlBuilder from '@sanity/image-url'
import { useMenu } from '~/composables/useMenu';

// Sanity image URL builder
const builder = imageUrlBuilder({ projectId: '8n513ygd', dataset: 'production' })
const $urlFor = (source) => builder.image(source)

let darkTimeout = null;

// Fetch main menu from Sanity (same as Footer)
const { mainMenu } = useMenu();

const route = useRoute();
const navItems = computed(() => mainMenu?.value?.items || []);
const menuOpen = ref(false);
const menuDark = ref(false);
const menuBgVisible = ref(false);
const headerRef = ref(null);
const headerHeight = ref(0);
const menuHeight = ref(0);
const resizeKey = ref(0);

const { isHeaderVisible } = useHeaderScroll(menuOpen)

// Simple computed property for page title
const pageTitle = computed(() => {
  // First check route meta (for older pages)
  if (route.meta.pageTitle) {
    return route.meta.pageTitle;
  }
  
  // For newer pages, try to get the title from the current path
  const path = route.path;
  if (path && path !== '/') {
    // Convert path to title case (e.g., '/conflict-minerals' -> 'Conflict Minerals')
    const title = path
      .split('/')
      .filter(Boolean)
      .map(word => word.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
      .join(' ');
    return title;
  }
  
  // Default to 'Home' for the root path
  if (path === '/') {
    return 'Home';
  }
  
  return '';
});

const updateHeights = () => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight;
    menuHeight.value = Math.max(0, window.innerHeight - headerHeight.value);
    console.log('Heights updated:', {
      headerHeight: headerHeight.value,
      menuHeight: menuHeight.value,
      windowHeight: window.innerHeight
    });
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
    showMenuItems.value = true;
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
  }, 0);
}
function onMenuAfterLeave() {
  setTimeout(() => {
    menuDark.value = false;
  }, 0); // increased delay for further dark mode fade-out
}
const navStyle = computed(() => {
  resizeKey.value;
  const itemCount = navItems.value?.length || 0;
  let fontSize;
  
  console.log('Debug values:', {
    windowWidth: window.innerWidth,
    menuHeight: menuHeight.value,
    itemCount,
    navItems: navItems.value
  });

  if (window.innerWidth < 1024) {
    fontSize = '10vw';
  } else {
    // Ensure menuHeight has a value, default to window height if not set
    const height = menuHeight.value || window.innerHeight;
    fontSize = `${Math.max(24, Math.floor(height / (itemCount * 1.2)))}px`;
  }
  
  const style = {
    fontSize,
    lineHeight: 1,
  };
  console.log('navStyle computed:', style);
  return style;
});
const isHome = computed(() => route.path === '/');
function handleResize() {
  updateHeights();
  resizeKey.value++;
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
  nextTick(updateHeights);

  // Watch for title changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.target.tagName === 'TITLE') {
        console.log('[Header] Title changed to:', document.title);
      }
    });
  });

  const titleElement = document.querySelector('title');
  if (titleElement) {
    observer.observe(titleElement, { childList: true });
  }

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    observer.disconnect();
  });
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: transform 0.3s ease, background 0.3s, color 0.3s;
  background: transparent;
  justify-content: space-between;
  align-items: start;
}
.header-bar.dark {
  color: var(--color-text, #fff);
  background: transparent;
}
.header-bar.header-hidden {
  transform: translateY(-100%);
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
  transition: background 0.3s ease .3s, color 0.3s;
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
  gap:0px;
}
.fullscreen-menu li {
  width: 100%;
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
.header-bar.menu-active {
  background: transparent;
  color: var(--white);
}


.menu-svg {
  width: 100%;
}

.menu-svg img {
  width: 100%;
  height: auto;
}

/* Replacing the previous CSS rule for .header-bar.no-transform-transition */
.header-bar.no-transform-transition {
  transition: none !important;
  transition: background 0.3s, color 0.3s !important;
}

.menu-link {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.menu-text {
  visibility: hidden;
  display: block;
  white-space: nowrap;
}

.menu-image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-image-wrapper img {
  width: 100%;
  height: 80%;
  object-fit: contain;
}
</style> 