import { ref, watchEffect } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  watchEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  })
  return { isDark }
} 