<template>
  <!-- <VisibleGrid /> -->
  <Header />
  <Suspense>
    <template #default>
      <main :style="{ paddingTop: mainPaddingVar }">
        <NuxtPage />
      </main>
    </template>
    <template #fallback>
      <main :style="{ paddingTop: 'var(--header-height)' }">
        <!-- Loading state uses header height to prevent layout shift -->
      </main>
    </template>
  </Suspense>
  <ClientOnly>
    <template #default>
      <Footer v-if="!page?.value?.hideFooter" />
    </template>
    <template #fallback>
      <!-- No footer during SSR -->
    </template>
  </ClientOnly>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import { useDarkMode } from '~/composables/usePageUi.js';
import { useFavicon } from '~/composables/useFavicon.js';
import { usePageSettings } from '~/composables/usePageSettings';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useHead, useRouter } from '#app'

// Initialize page settings first
const { isDark, page, useHeaderPadding } = usePageSettings();
const route = useRoute();
const router = useRouter();

// Configure router to always scroll to top
router.options.scrollBehavior = () => ({ top: 0 })

// Add class to body when on home page
watch(() => route.path, (path) => {
  if (typeof document !== 'undefined') {
    if (path === '/') {
      document.body.classList.add('hide-footer');
    } else {
      document.body.classList.remove('hide-footer');
    }
  }
}, { immediate: true });

// Add debug logging for page data and footer visibility
watch(() => page.value, (newPage) => {
  const shouldShowFooter = !newPage?.hideFooter;
  console.log('[App] Footer visibility check:', {
    hasData: !!newPage,
    title: newPage?.title,
    hideFooter: newPage?.hideFooter,
    shouldShowFooter,
    fullData: newPage
  });
}, { immediate: true });

// Compute padding after settings are initialized
const mainPaddingVar = computed(() =>
  useHeaderPadding.value ? 'var(--header-height)' : 'var(--pad-2)'
);

// Update favicon based on dark mode
useFavicon(isDark);

// Add script to head to prevent flash of light mode
useHead({
  script: [
    {
      children: `
        (function() {
          // Check if we're on a dark mode page
          const darkModePages = ['/', '/contact'];
          const isDarkModePage = darkModePages.includes(window.location.pathname);
          
          // Set dark mode class immediately if needed
          if (isDarkModePage) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.style.backgroundColor = 'var(--black)';
          }
        })();
      `,
      type: 'text/javascript'
    }
  ],
  style: [
    {
      children: `
        :root {
          --initial-bg: var(--white);
        }
        :root.dark-mode {
          --initial-bg: var(--black);
        }
        body {
          background-color: var(--initial-bg);
          transition: background-color 0.3s ease;
        }
      `
    }
  ]
})

// Log initial state for debugging
onMounted(() => {
  // Component mounted, no need for logging
  if (typeof document !== 'undefined') {
    document.body.classList.add('page-in')
    setTimeout(() => {
      document.body.classList.remove('page-in')
    }, 400)
  }
})
</script>

<style>
/* Add to your global styles */
html {
  background-color: var(--initial-bg);
}

/* Provide a safe default header height to avoid initial layout jump before JS measures */
:root {
  --header-height: 80px;
}

html.dark-mode {
  background-color: var(--black);
  color: var(--white);
}

/* Ensure smooth transition when dark mode is toggled */
html, body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Prevent layout shift during hydration */
main {
  transition: padding-top 0.3s ease;
}

/* Smooth page transitions to avoid footer pop-in */
body.page-out main {
  opacity: 0;
  transition: opacity 0.35s ease;
  min-height: 100vh; /* reserve viewport height to keep footer below fold */
}
body.page-in main {
  opacity: 1;
  transition: opacity 0.35s ease;
}

/* Hide footer during navigation; fade it in after page content */
body.page-out footer {
  opacity: 0;
  pointer-events: none;
}
body.page-in footer:not(.force-hide) {
  opacity: 1;
  transition: opacity 0.35s ease;
}

/* Hide footer fully while a page is loading to prevent flash at top */
body.page-loading footer {
  opacity: 0 !important;
  pointer-events: none;
}

/* Hide content until route finished and layout calculated */
body.page-loading main {
  opacity: 0 !important;
  visibility: hidden;
}
body.page-in main {
  visibility: visible;
}

/* Hide footer on home page */
body.hide-footer footer {
  display: none;
}
</style>
