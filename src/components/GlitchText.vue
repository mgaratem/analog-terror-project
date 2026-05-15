<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  tag?: string
  intensity?: number      // 0 = sutil, 1 = máximo
  protectSuffix?: number
}>(), {
  tag: 'span',
  intensity: 0,
  protectSuffix: 0
})

const displayed = ref(props.text)
const glitchEl = ref<HTMLElement | null>(null)
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?─░▒▓█▀▄'

let rafId: number
let frame = 0

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(t, 1)

watch(() => props.text, (val) => { displayed.value = val })

const tick = () => {
  const t = props.intensity

  const frameSkip = Math.round(lerp(55,  8,    t))
  const chance    = lerp(0.04, 0.38,  t)
  const animSpeed = lerp(5.0,  0.8,   t)
  const offset    = lerp(5,    14,    t)

  if (glitchEl.value) {
    glitchEl.value.style.setProperty('--spd', `${animSpeed.toFixed(2)}s`)
    glitchEl.value.style.setProperty('--off', `${offset.toFixed(1)}px`)
  }

  frame++
  if (frame % frameSkip === 0) {
    const safeEnd = props.text.length - props.protectSuffix
    displayed.value = props.text
      .split('')
      .map((char, i) => {
        if (char === ' ' || i >= safeEnd) return char
        return Math.random() < chance
          ? CHARS[Math.floor(Math.random() * CHARS.length)]
          : char
      })
      .join('')
  }

  rafId = requestAnimationFrame(tick)
}

onMounted(() => { rafId = requestAnimationFrame(() => tick()) })
onUnmounted(() => cancelAnimationFrame(rafId))
</script>

<template>
  <component
    :is="tag"
    ref="glitchEl"
    class="glitch"
    :data-text="displayed"
    style="--spd: 1.0s; --off: 8px"
  >{{ displayed }}</component>
</template>

<style scoped>
.glitch {
  position: relative;
  display: inline-block;
  letter-spacing: 0.04em;
  animation: jitter 0.1s steps(1) infinite;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  width: 100%;
}

.glitch::before {
  color: rgba(255, 255, 255, 0.75);
  animation: gb var(--spd) steps(1) infinite;
}

.glitch::after {
  color: rgba(180, 180, 180, 0.6);
  animation: ga calc(var(--spd) * 0.7) steps(1) infinite;
}

@keyframes jitter {
  0%   { transform: scaleY(1.35) translate(0,    0   ); }
  15%  { transform: scaleY(1.35) translate(-1px, 0   ); }
  30%  { transform: scaleY(1.35) translate(0,    1px ); }
  45%  { transform: scaleY(1.35) translate(1px,  0   ); }
  60%  { transform: scaleY(1.35) translate(0,   -1px ); }
  75%  { transform: scaleY(1.35) translate(-1px, 1px ); }
  90%  { transform: scaleY(1.35) translate(1px, -1px ); }
  100% { transform: scaleY(1.35) translate(0,    0   ); }
}

@keyframes gb {
  0%   { clip-path: none; transform: none; }
  60%  { clip-path: none; transform: none; }
  62%  { clip-path: polygon(0 10%, 100% 10%, 100% 28%, 0 28%); transform: translateX(calc(var(--off) * -1)); }
  65%  { clip-path: polygon(0 55%, 100% 55%, 100% 68%, 0 68%); transform: translateX(var(--off)); }
  68%  { clip-path: none; transform: none; }
  80%  { clip-path: none; transform: none; }
  82%  { clip-path: polygon(0 72%, 100% 72%, 100% 88%, 0 88%); transform: translateX(calc(var(--off) * 1.3)); }
  84%  { clip-path: polygon(0 20%, 100% 20%, 100% 35%, 0 35%); transform: translateX(calc(var(--off) * -1.5)); }
  86%  { clip-path: none; transform: none; }
  100% { clip-path: none; transform: none; }
}

@keyframes ga {
  0%   { clip-path: none; transform: none; }
  50%  { clip-path: none; transform: none; }
  52%  { clip-path: polygon(0 45%, 100% 45%, 100% 60%, 0 60%); transform: translateX(var(--off)); }
  55%  { clip-path: polygon(0 5%,  100% 5%,  100% 18%, 0 18%); transform: translateX(calc(var(--off) * -0.8)); }
  58%  { clip-path: none; transform: none; }
  85%  { clip-path: none; transform: none; }
  87%  { clip-path: polygon(0 88%, 100% 88%, 100% 98%, 0 98%); transform: translateX(calc(var(--off) * 0.9)); }
  89%  { clip-path: none; transform: none; }
  100% { clip-path: none; transform: none; }
}
</style>
