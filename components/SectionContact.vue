<template>
  <section class="wrapper">

    <div class="grid grid-1 grid-sm-2">
      <div class="h3 medium grid grid-1 uppercase">
        <div v-for="item in contactInfo" :key="item.label">
          <div v-html="item.value.replace(/\n/g, '<br>')"></div>
        </div>
      </div>
      <div>
        <div class="grid grid-xs-1 grid-sm-2">
          <img src="/logos/logo-12.png" alt="" />
        </div>
      </div>
    </div>

    <img src="/images/contact-1.svg" alt="Contact" />
    
  </section>
</template>

<script setup>

</script>

<style scoped>

</style> 