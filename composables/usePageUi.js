import { ref, watch } from 'vue'

// Single source of truth for dark mode
const isDark = ref(false)
export const useHeaderPadding = ref(true) // true = header height, false = pad-2

// Watch for dark mode changes and update DOM
watch(isDark, (val) => {
  console.log('Dark mode state changed:', val)
  if (typeof window !== 'undefined') {
    if (val) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.style.backgroundColor = 'var(--black)'
      console.log('Dark mode class added to document')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.style.backgroundColor = 'var(--white)'
      console.log('Dark mode class removed from document')
    }
  }
}, { immediate: true })

// Export a function to use dark mode
export function useDarkMode() {
  // Check if we're on a dark mode page on initial load
  if (typeof window !== 'undefined' && !isDark.value) {
    const darkModePages = ['/', '/contact']
    const isDarkModePage = darkModePages.includes(window.location.pathname)
    if (isDarkModePage) {
      isDark.value = true
      document.documentElement.classList.add('dark-mode')
      document.documentElement.style.backgroundColor = 'var(--black)'
    }
  }
  
  console.log('useDarkMode called, current state:', isDark.value)
  return { isDark }
}

// Export isDark ref for direct access when needed
export { isDark } 