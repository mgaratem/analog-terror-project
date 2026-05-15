<template>
  <div class="view">
    <VhsOverlay />
    <GlitchText text="Te está buscando..." tag="h1" :intensity="0.1" />
  </div>
</template>

<script setup lang="ts">
import VhsOverlay from '@/components/VhsOverlay.vue'
import GlitchText from '@/components/GlitchText.vue'
</script>

<style scoped>
.view {
  width: 100vw;
  height: 100vh;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: clamp(1.4rem, 4.5vw, 3.2rem);
  font-weight: normal;
  color: #e8e8e8;
  text-align: center;
  padding: 0 1rem;
}
</style>
