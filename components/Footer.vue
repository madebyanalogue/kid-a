<template>
  <BackToTop />
  <footer class="dark py2">
    <div class="wrapper">


      <div class="grid grid-1 gap-2">

        <!-- Row 1: 4 columns -->
        <div class="grid grid-1 grid-sm-2 grid-md-4 h5">
          <div class="">
            <div class="logo">
              <Logo />
            </div>
          </div>
          <div class="">
            <ul class="circle--active circle--hover uppercase">
              <li v-if="mainMenuPending" class="menu-status">
                Loading main menu...
              </li>
              <li v-else-if="mainMenuError" class="menu-status">
                Error loading main menu: {{ mainMenuError.message }}
              </li>
              <template v-else>
                <li 
                  v-for="item in mainMenuItems" 
                  :key="item._key"
                  class="menu-item"
                >
                  <NuxtLink
                    v-if="item.to?.page?.slug?.current"
                    :to="`/${item.to.page.slug.current}`"
                    :class="{ active: route.path === `/${item.to.page.slug.current}` }"
                  >
                    {{ item.text }}
                  </NuxtLink>
                  <a
                    v-else-if="item.to?.url"
                    :href="item.to.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.text }}
                  </a>
                  <span v-else class="menu-text">{{ item.text }}</span>
                </li>
                <li v-if="!mainMenuItems.length" class="menu-status">
                  No main menu items found.
                </li>
              </template>
            </ul>
          </div>
          <div class="">
            <ul class="circle--active circle--hover uppercase">
              <li v-if="footerMenuPending" class="menu-status">
                Loading footer menu...
              </li>
              <li v-else-if="footerMenuError" class="menu-status">
                Error loading footer menu: {{ footerMenuError.message }}
              </li>
              <template v-else>
                <li 
                  v-for="item in footerMenuItems" 
                  :key="item._key"
                  class="menu-item"
                >
                  <NuxtLink
                    v-if="item.to?.page?.slug?.current"
                    :to="`/${item.to.page.slug.current}`"
                    :class="{ active: route.path === `/${item.to.page.slug.current}` }"
                  >
                    {{ item.text }}
                  </NuxtLink>
                  <a
                    v-else-if="item.to?.url"
                    :href="item.to.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.text }}
                  </a>
                  <span v-else class="menu-text">{{ item.text }}</span>
                </li>
                <li v-if="!footerMenuItems.length" class="menu-status">
                  No footer menu items found.
                </li>
              </template>
            </ul>
          </div>
          <div class="">
            <div class="rte uppercase">
              <div v-for="item in contactInfo" :key="item.label">
                <div v-html="item.value.replace(/\n/g, '<br>')"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: 1/4, 1/2, 1/4 -->
        <div class="grid grid-1 grid-sm-2 grid-md-4 h5">

          <!-- CERTIFICATION -->
          <div class="">
            <div class="flex flex-column flex-bottom fullheight">
              <template v-if="certificationLogo">
                <div class="w-full h-full flex items-end">
                  <NuxtImg
                    :src="certificationLogo"
                    alt="Certification Logo"
                    class="w-auto certification-logo object-contain"
                    loading="lazy"
                  />
                </div>
              </template>
            </div>
          </div>

          <!-- SOCIALS & COPYRIGHT -->
          <div class="col-span-2-md">
            <div class="flex flex-column flex-bottom fullheight">
              <div class="grid grid-1 gap-1">
                <SocialIcons :linkedinUrl="linkedinUrl" />
                <div class="">© {{ new Date().getFullYear() }} Kid-A All Rights Reserved.</div>
              </div>
            </div>
          </div>

          <!-- FT CREDIT -->
          <div class="">
            <div class="flex flex-column flex-bottom fullheight">
              <template v-if="ftCreditLogo">
                <div class="w-full h-full flex items-end">
                  <NuxtImg
                    :src="ftCreditLogo"
                    alt="FT Credit Logo"
                    class="w-auto object-contain ftcredit-logo"
                    loading="lazy"
                  />
                </div>
              </template>
            </div>
          </div>
              
        </div>

        <!-- LOGOS -->
        <div class="flex justify-center logos-row py1 gap-2">
          <NuxtImg
            v-for="(logo, i) in logos"
            :key="i"
            :src="logo"
            :alt="`Footer logo ${i + 1}`"
            class="h-[calc(var(--pad-3)*1)] w-auto object-contain"
            width="auto"
            height="auto"
            loading="lazy"
          />
        </div>


      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSiteSettings } from '~/composables/useSiteSettings';
import { useMenu } from '~/composables/useMenu';
import imageUrlBuilder from '@sanity/image-url'
import { computed } from 'vue';

// Sanity image URL builder
const builder = imageUrlBuilder({ projectId: '8n513ygd', dataset: 'production' })
const $urlFor = (source) => builder.image(source)

const route = useRoute();
const { 
  contactInfo, 
  footerLogos: logos, 
  certificationLogo, 
  ftCreditLogo,
  linkedinUrl 
} = useSiteSettings();

const { 
  mainMenu, 
  footerMenu, 
  mainMenuPending, 
  footerMenuPending, 
  mainMenuError, 
  footerMenuError 
} = useMenu();

// Computed properties for menu items
const mainMenuItems = computed(() => mainMenu?.value?.items || []);
const footerMenuItems = computed(() => footerMenu?.value?.items || []);
</script>

<style scoped>
footer {
  background: var(--black);
  color: var(--white);
}
.certification-logo {
  width:25%;
  min-width:70px;
}
.ftcredit-logo {
  width:100%;
  max-width:360px;
}
.logos-row {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 768px) {
.logos-row {
  justify-content: space-between;
}
}
.logos-row > * {
  height: calc(var(--pad-3) * 1);
  width: auto;
}
</style> 