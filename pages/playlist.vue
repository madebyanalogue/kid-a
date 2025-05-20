<template>
  <SectionHero section="5"/>

  <!-- 2 COLUMN -->
  <section>
    <div class="wrapper">
      <div class="grid grid-reverse middle-xs">
        <div class="col-span-12 col-span-6-md">
          <div class="grid grid-center-items middle-xs">
            <div class="col-span-12 col-span-6-md">
              <div class="roundal">
                <NuxtImg src="/images/playlist-roundal.svg" alt="Playlist" style="width:100%;" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 col-span-6-md">
          <div class="h2 rte">Here’s our TOP 3 staff pick essential records, BBYD (Buy Before You Die)!! Keep checking as these often change depending on our mood.</div>
        </div>
      </div>
    </div>
  </section>
  
  <SectionPlaylist name="Andy"/>

  <SectionPlaylist name="Tomsy"/>

  <!-- NESTED -->
  <section>
    <div class="wrapper">
      <div class="relative py6">
        <div class="cover object-fit-child show-md">
          <NuxtImg src="/images/playlist-3.jpg" alt="Playlist 3" />
        </div>
        <div class="hide-md">
          <NuxtImg src="/images/playlist-3.jpg" alt="Playlist 3" />
        </div>
        <div class="grid">
          <div class="col-span-12 col-span-6-md col-start-4-md medium white p2 grid grid-1">

            <div class="py3"></div>
            <div class="grid">
              <div class="col-span-12 py1">
                <a href="https://open.spotify.com/playlist/7I000000000000000000000000000000?si=0000000000000000" target="_blank">
                  <div class="rte">
                    <div class="spotify-icon" style="width:calc(var(--unit) * 4);">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                    <div class="h5">OPEN SPOTIFY PLAYLIST</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="rte"><div class="h2">Our Playlist:
              Featuring Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy </div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <SectionPlaylist name="Phil"/>

</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true


definePageMeta({
  pageTitle: 'Playlist'
})
</script>

<style scoped>
.playlist {
  margin-bottom: 2rem;
}
.person {
  margin-left: 2rem;
  margin-bottom: 1rem;
}
</style> 