<template>
  <div class="menu-svg">
    <div class="wrapper">
      <img 
        v-if="!props.item || props.item === 'BEATS (ABOUT)'"
        :src="'/images/menu-1.svg'"
        alt="About"
      />
      <img 
        v-if="!props.item || props.item === 'RHYMES (WHAT)'"
        :src="'/images/menu-2.svg'"
        alt="What"
      />
      <img 
        v-if="!props.item || props.item === 'LIFE (SUSTAINABILITY)'"
        :src="'/images/menu-3.svg'"
        alt="Sustainability"
      />
      <img 
        v-if="!props.item || props.item === 'PRESS'"
        :src="'/images/menu-4.svg'"
        alt="Press"
      />
      <img 
        v-if="!props.item || props.item === 'PLAYLIST'"
        :src="'/images/menu-5.svg'"
        alt="Playlists"
      />
      <img 
        v-if="!props.item || props.item === 'EATS'"
        :src="'/images/menu-6.svg'"
        alt="Eats"
      />
      <img 
        v-if="!props.item || props.item === 'CONTACT'"
        :src="'/images/menu-7.svg'"
        alt="Contact"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.menu-svg {
  width: 100%;
}

.menu-svg img {
  width: 100%;
  height: auto;
}
</style> 