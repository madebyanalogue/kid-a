import { useAsyncData } from '#app'

export const useSiteSettings = () => {
  const { data: settings, error, pending } = useAsyncData('siteSettings', () =>
    $fetch('/api/sanity', { params: { type: 'siteSettings' } })
  )

  return {
    settings,
    error,
    pending,
    contactInfo: computed(() => settings.value?.contactInfo || []),
    footerLogos: computed(() => {
      if (!settings.value?.footerLogos) return []
      return settings.value.footerLogos
        .filter(logo => logo?.asset?.url)
        .map(logo => logo.asset.url)
    }),
    certificationLogo: computed(() => settings.value?.certificationLogo?.asset?.url),
    ftCreditLogo: computed(() => settings.value?.ftCreditLogo?.asset?.url),
    linkedinUrl: computed(() => settings.value?.linkedinUrl)
  }
} 