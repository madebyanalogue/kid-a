import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useHeaderScroll(menuOpen) {
  const isHeaderVisible = ref(true)
  const lastScrollY = ref(0)
  const scrollThreshold = 50 // minimum scroll amount before hiding header

  const handleScroll = () => {
    // Don't handle scroll if menu is open
    if (menuOpen.value) return

    const currentScrollY = window.scrollY
    
    // Only trigger if we've scrolled more than the threshold
    if (Math.abs(currentScrollY - lastScrollY.value) < scrollThreshold) {
      return
    }

    // Hide header when scrolling down, show when scrolling up
    isHeaderVisible.value = currentScrollY < lastScrollY.value || currentScrollY < 100
    
    lastScrollY.value = currentScrollY
  }

  // Watch menu state to handle body scroll
  watch(menuOpen, (isOpen) => {
    if (isOpen) {
      // Save current scroll position
      lastScrollY.value = window.scrollY
      // Disable body scroll
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${lastScrollY.value}px`
    } else {
      // Re-enable body scroll
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      // Restore scroll position
      window.scrollTo(0, lastScrollY.value)
    }
  })

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    // Ensure scroll is re-enabled if component is unmounted while menu is open
    if (menuOpen.value) {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  })

  return {
    isHeaderVisible
  }
} 