<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import VhsOverlay from '@/components/VhsOverlay.vue'
import GlitchText from '@/components/GlitchText.vue'
import faceImg from '@/assets/face.jpg'

const smiley = ref(false)
const faceOpacity = ref(0.08)
let smileyTimer: ReturnType<typeof setTimeout>
let faceTimer: ReturnType<typeof setTimeout>

const scheduleSmiley = () => {
  const delay = smiley.value
    ? 600 + Math.random() * 800
    : 1200 + Math.random() * 1000
  smileyTimer = setTimeout(() => {
    smiley.value = !smiley.value
    scheduleSmiley()
  }, delay)
}

const scheduleFace = () => {
  faceTimer = setTimeout(() => {
    faceOpacity.value = 0.85
    faceTimer = setTimeout(() => {
      faceOpacity.value = 0.08
      scheduleFace()
    }, 800 + Math.random() * 600)
  }, 5000 + Math.random() * 6000)
}

onMounted(() => { scheduleSmiley(); scheduleFace() })
onUnmounted(() => { clearTimeout(smileyTimer); clearTimeout(faceTimer) })
</script>

<template>
  <div class="view">
    <img class="face" :src="faceImg" :style="{ opacity: faceOpacity }" />
    <VhsOverlay />
    <GlitchText
      :text="smiley ? 'Ups, te encontró :)' : 'Ups, te encontró :('"
      tag="h1"
      :intensity="0.5"
      :protect-suffix="2"
    />
  </div>
</template>

<style scoped>
.view {
  width: 100vw;
  height: 100vh;
  background: #130a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 10000;
  filter: brightness(2.5) contrast(1.6) grayscale(1);
  mix-blend-mode: screen;
  transition: opacity 0.15s ease;
  pointer-events: none;
}

h1 {
  font-size: clamp(1.4rem, 4.5vw, 3.2rem);
  font-weight: normal;
  color: #e8d0d0;
  text-align: center;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}
</style>
