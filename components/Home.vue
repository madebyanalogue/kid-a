<template>
  <section class="home--container">
    <div class="home--logo">
      <div class="logo"><Logo /></div>
    </div>
    <div class="container">
      <div class="media">
        <a href="/about" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">About</h3>
        </a>
      </div>
      <div class="media">
        <a href="/what" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">What</h3>
        </a>
      </div>
      <div class="media">
        <a href="/playlist" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">Playlist</h3>
        </a>
      </div>
      <div class="media">
        <a href="/contact" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">Contact</h3>
        </a>
      </div>
      <div class="media">
        <a href="/life" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">Life</h3>
        </a>
      </div>
      <div class="media">
        <a href="/press" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">Press</h3>
        </a>
      </div>
      <div class="media">
        <a href="#" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">Surprise Me</h3>
        </a>
      </div>
      <div class="media">
        <a href="#" class="media-link">
          <img src="" alt="">
          <h3 class="media-title">EATS</h3>
        </a>
      </div>
    </div>

    <div class="preload-medias">
      <img src="/images/home-1.jpg" alt="">
      <img src="/images/home-2.jpg" alt="">
      <img src="/images/home-3.jpg" alt="">
      <img src="/images/home-4.jpg" alt="">
      <img src="/images/home-5.png" alt="">
      <img src="/images/home-6.jpg" alt="">
      <img src="/images/home-7.jpg" alt="">
      <img src="/images/home-8.jpg" alt="">
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap';

let incr = 800, deltaObject = {delta: 0}, deltaTo, tl, isWheeling
const mediaArray = []
let currentCycle = 0
let trajectoryAngles = [0, 45, 90, 135, 180, 225, 270, 315]

onMounted(() => {
  document.body.classList.add('no-smooth')

  const root = document.querySelector('.home--container')
  const container = root.querySelector('.container')

  root.querySelectorAll('.preload-medias img').forEach(image => {
      mediaArray.push(image.getAttribute('src'))
  })

  const medias = root.querySelectorAll('.media')
  const mediasImg = root.querySelectorAll('.media img')

  // Set initial images
  mediasImg.forEach((img, index) => {
    img.setAttribute('src', mediaArray[index])
  })

  // QUICK TOS
  deltaTo = gsap.quickTo(deltaObject, 'delta', { duration: 2, ease: "power1" })
  const rotY = gsap.quickTo(container, "rotationY", {duration: 0.5, ease: 'power1'})
  const rotX = gsap.quickTo(container, "rotationX", {duration: 0.5, ease: 'power1'})

  medias.forEach(media => {
      updateMedia(media)
  })

  tl = gsap.timeline({
      paused: true
  })

  tl.to(medias, {
      z: 0,
      ease: "none",
      duration: 8,
      stagger: {
          each: 1,
          repeat: -1,
          onRepeat() {
              updateMedia(this.targets()[0])
          }
      }
  })
  tl.fromTo(medias, {
      opacity: 0,
      filter: "blur(20px)"
  }, {
      opacity: 1,
      filter: "blur(0px)",
      ease: "power2.inOut",
      duration: 0.6,
      stagger: {
          each: 1,
          repeat: -1,
          repeatDelay: 7.4,
          onRepeat() {
              this.targets()[0].style.opacity = "0"
              this.targets()[0].style.filter = "blur(20px)"
          }
      }
  }, '<')

  gsap.ticker.add(tick)
  window.addEventListener("wheel", handleWheel, {passive: true});
  root.addEventListener("mousemove", e => {
      const valY = (e.clientX / window.innerWidth - 0.5) * 10
      const valX = (e.clientY / window.innerHeight - 0.5) * 10

      rotY(valY)
      rotX(-valX)
  })
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateMedia(media) {
    // Get the index of the current media element
    const mediaIndex = Array.from(media.parentNode.children).indexOf(media);
    
    // If we've completed a full cycle, shuffle the angles
    if (mediaIndex === 0) {
        currentCycle++;
        if (currentCycle > 0) {
            trajectoryAngles = shuffleArray([...trajectoryAngles]);
        }
    }
    
    // Calculate angle for this item using the shuffled angles
    const angle = trajectoryAngles[mediaIndex] * (Math.PI / 180);
    
    // Calculate distance from center (random between 45% and 65% of screen size)
    const distance = (0.45 + Math.random() * 0.2) * Math.min(window.innerWidth, window.innerHeight);
    
    // Calculate position using trigonometry
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    gsap.set(media, {
        xPercent: -50,
        yPercent: -50,
        x: x,
        y: y,
    })
}

function handleWheel(e) {
    deltaTo(e.deltaY)

    window.clearTimeout(isWheeling) // Kill setTimeout
    isWheeling = setTimeout(() => { // Init setTimeout
        deltaTo(0) // Reset speed
    }, 120)
}

function tick(time, dt) {
    // deltaObject.delta varies depending on deltaTo()
    incr += deltaObject.delta / 600 + dt / 800
    tl.time(incr) // time() : go to a specific time of a timeline
}

</script>

<style scoped>

.home--logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}

.home--container {
    height: 100vh;
    perspective: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
}
.home--container .container {
    height: 100%;
    transform-style: preserve-3d;
}

.home--container .media {
    width: 24%;
    height: auto;
    position: absolute;
    transform: translateZ(-400vw);
}

.home--container .media-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.home--container .media-title {
    margin-top: calc(var(--unit) * 1);
    font-size: calc(var(--unit) * 2);
    text-align: center;
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
}

.home--container .media img {
    width: 100%;
    height: auto;
    display: block;
    box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
}

.home--container .media-link:hover img {
    transform: scale(1.05);
}

.home--container .preload-medias img {
    width: 1px;
    height: 1px;
    top: 0;
    left: 0;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
}


@media (max-width: 768px) {
    .home--container .media {
        width: 40%;
    }
}
</style> 