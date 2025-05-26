import { useAsyncData } from '#app'
import { useRoute } from 'vue-router'
import { isDark, useHeaderPadding } from './usePageUi'
import { watch, computed } from 'vue'

// Default page settings
const defaultSettings = {
  darkMode: false,
  headerPadding: true
}

// Helper to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

export const usePageSettings = () => {
  const route = useRoute()
  // Always recompute slug from the current route
  const pageSlug = computed(() => route.path.replace(/^\//, '') || 'index')

  const { data: pageData, pending, error } = useAsyncData(
    () => `page-${pageSlug.value}`,
    async () => {
      try {
        console.log('[usePageSettings] Fetching page data for:', {
          slug: pageSlug.value,
          path: route.path
        });
        
        const result = await $fetch('/api/sanity', {
          params: {
            type: 'page',
            identifier: pageSlug.value,
            identifierType: 'slug'
          }
        })
        
        console.log('[usePageSettings] Received page data:', {
          hasData: !!result,
          title: result?.title,
          hideFooter: result?.hideFooter,
          darkMode: result?.darkMode,
          headerPadding: result?.headerPadding,
          fullData: result
        });
        
        // Set initial values based on Sanity data or defaults
        if (result && Object.keys(result).length > 0) {
          useHeaderPadding.value = result.headerPadding !== undefined ? !!result.headerPadding : defaultSettings.headerPadding
          isDark.value = result.darkMode !== undefined ? !!result.darkMode : defaultSettings.darkMode
        } else {
          useHeaderPadding.value = defaultSettings.headerPadding
          isDark.value = defaultSettings.darkMode
        }
        
        return result
      } catch (err) {
        console.error('[usePageSettings] Error fetching page settings:', err)
        // Set defaults on error
        useHeaderPadding.value = defaultSettings.headerPadding
        isDark.value = defaultSettings.darkMode
        return null
      }
    },
    {
      watch: [() => route.path],
      immediate: true,
      server: true
    }
  )

  // Watch for page data changes and update settings
  watch(() => pageData.value, (newData) => {
    if (newData) {
      isDark.value = newData.darkMode ?? false
      useHeaderPadding.value = newData.headerPadding ?? true
    }
  }, { immediate: true })

  // Only modify DOM in browser environment
  watch(() => isDark.value, (newValue) => {
    if (isBrowser) {
      if (newValue) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
    }
  }, { immediate: true })

  return {
    page: pageData,
    isDark,
    useHeaderPadding,
    pending,
    error
  }
} 