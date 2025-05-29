// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  app: {
    head: {
      // Google Fonts moved to app.vue
    }
  },
  modules: [
    '@nuxt/content', 
    '@nuxt/image', 
    '@nuxtjs/sanity'
  ],
  components: {
    dirs: [
      '~/components'
    ]
  },
  sanity: {
    projectId: '8n513ygd',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2024-03-19', // use current date (YYYY-MM-DD) to target the latest API version
  },
  css: [
    '~/assets/styles/reset.css',
    '~/assets/styles/utilities.css',
    '~/assets/styles/typography.css',
    '~/assets/styles/main.css',
  ],
  experimental: {
    componentIslands: true
  },
  routeRules: {
    '/**': { ssr: true }
  }
})