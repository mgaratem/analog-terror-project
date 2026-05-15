<template>
  <div class="view">
    <VhsOverlay />
    <h1>¿Tienes curiosidad?</h1>
  </div>
</template>

<script setup lang="ts">
import VhsOverlay from '@/components/VhsOverlay.vue'
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
  color: #fff;
  text-align: center;
  padding: 0 1rem;
  transform: scaleY(1.35);
  animation: jitter 0.1s steps(1) infinite;
}

@keyframes jitter {
  0%   { transform: scaleY(1.35) translate(0,    0   ); }
  20%  { transform: scaleY(1.35) translate(-1px, 0   ); }
  50%  { transform: scaleY(1.35) translate(0,    1px ); }
  80%  { transform: scaleY(1.35) translate(1px,  0   ); }
  100% { transform: scaleY(1.35) translate(0,    0   ); }
}
</style>
