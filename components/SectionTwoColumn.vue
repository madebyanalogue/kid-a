<template>
  
  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid middle-xs" :class="{ 'grid-reverse': imageRight }">
        <div class="col-span-12 col-span-6-md">

          <div v-if="includeLogo && logoImage" class="py3 show-desktop"></div>

          <!-- Main Image -->
          <NuxtImg 
            v-if="mainImage" 
            :src="mainImage.asset.url" 
            :alt="mainImage.alt || 'Main image'" 
          />

          <!-- Roundal Image -->
          <div v-if="roundalImage" class="grid grid-center-items middle-xs">
            <div class="col-span-12 col-span-6-md">
              <div class="roundal">
                <NuxtImg 
                  :src="roundalImage.asset.url" 
                  :alt="roundalImage.alt || 'Roundal'" 
                  style="width:100%;" 
                />
              </div>
            </div>
          </div>

          <!-- Logo -->
          <div v-if="includeLogo && logoImage" class="grid absolute" style="transform: translateY(-20%);">
            <div class="col-span-4 col-span-3-md col-start-7-md">
              <NuxtImg 
                :src="logoImage.asset.url" 
                :alt="logoImage.alt || 'Logo'" 
              />
            </div>
          </div>
        </div>

        <!-- Text Box -->
        <div v-if="roundalImage" class="col-span-12 col-span-6-md">
          <div class="h2 rte" v-if="text">{{ text }}</div>
        </div>
        <div v-else class="col-span-12 col-span-6-md p3-md">
          <div class="h4 rte" v-if="text">{{ text }}</div>
        </div>

      </div>
    </div>
  </section>


</template>

<script setup>
import { computed, ref } from 'vue'

// Define props based on the Sanity schema
const props = defineProps({
  mainImage: {
    type: Object,
    default: null
  },
  roundalImage: {
    type: Object,
    default: null
  },
  includeLogo: {
    type: Boolean,
    default: false
  },
  logoImage: {
    type: Object,
    default: null
  },
  text: {
    type: String,
    default: ''
  },
  imageRight: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style> 