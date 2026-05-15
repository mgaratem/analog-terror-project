<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let rafId: number

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const count = 30 + Math.floor(Math.random() * 25)
  for (let i = 0; i < count; i++) {
    // Peso hacia la parte inferior (como en VHS real)
    const t = Math.pow(Math.random(), 0.6)
    const y = t * canvas.height
    const w = 15 + Math.random() * 350
    const x = Math.random() * canvas.width
    const opacity = 0.04 + Math.random() * 0.28
    const h = Math.random() < 0.75 ? 1 : 2

    ctx.fillStyle = `rgba(255,255,255,${opacity})`
    ctx.fillRect(x, y, w, h)
  }

  // Banda de estática densa ocasional (tracking error)
  if (Math.random() < 0.04) {
    const bandY = Math.random() * canvas.height
    const bandH = 3 + Math.random() * 12
    for (let y = bandY; y < bandY + bandH; y++) {
      for (let x = 0; x < canvas.width; x += 2 + Math.random() * 6) {
        const opacity = Math.random() * 0.35
        ctx.fillStyle = `rgba(255,255,255,${opacity})`
        ctx.fillRect(x, y, 1 + Math.random() * 4, 1)
      }
    }
  }

  rafId = requestAnimationFrame(() => draw(canvas, ctx))
}

const resize = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  resize(canvas)
  window.addEventListener('resize', () => resize(canvas))
  draw(canvas, ctx)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <div class="vhs" aria-hidden="true">
    <canvas ref="canvasRef" class="vhs__static" />
    <div class="vhs__scanlines" />
    <div class="vhs__noise" />
    <div class="vhs__tracking" />
    <div class="vhs__vignette" />
    <div class="vhs__flicker" />
  </div>
</template>

<style scoped>
.vhs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.vhs__static {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.vhs__scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.38) 2px,
    rgba(0, 0, 0, 0.38) 4px
  );
}

.vhs__noise {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  opacity: 0.09;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: noise-shift 0.12s steps(1) infinite;
}

.vhs__tracking {
  position: absolute;
  inset: 0;
  animation: tracking 6s steps(1) infinite;
}

.vhs__vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%),
    linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 75%, rgba(0,0,0,0.5) 100%);
}

.vhs__flicker {
  position: absolute;
  inset: 0;
  animation: flicker 0.08s steps(1) infinite;
}

@keyframes noise-shift {
  0%   { transform: translate(0,   0  ); }
  20%  { transform: translate(-4%, 3% ); }
  40%  { transform: translate(3%, -4% ); }
  60%  { transform: translate(-3%, 4% ); }
  80%  { transform: translate(4%, -3% ); }
  100% { transform: translate(0,   0  ); }
}

@keyframes tracking {
  0%   { background: none; transform: none; filter: none; }
  88%  { background: none; transform: none; filter: none; }
  89%  {
    background:
      linear-gradient(transparent 24%, rgba(255,255,255,0.08) 24.3%, rgba(255,255,255,0.08) 25%, transparent 25.3%),
      linear-gradient(transparent 58%, rgba(255,255,255,0.05) 58.2%, transparent 58.8%);
    transform: translateX(6px) skewY(0.5deg);
    filter: brightness(1.1);
  }
  90%  {
    background: linear-gradient(transparent 24%, rgba(255,255,255,0.03) 24.3%, transparent 25%);
    transform: translateX(-5px) skewY(-0.3deg);
    filter: none;
  }
  91%  { background: none; transform: none; filter: none; }
  96%  { background: none; transform: none; filter: none; }
  97%  {
    background: linear-gradient(transparent 74%, rgba(255,255,255,0.07) 74.4%, transparent 75%);
    transform: translateX(4px);
  }
  98%  { background: none; transform: none; }
  100% { background: none; transform: none; }
}

@keyframes flicker {
  0%   { background: rgba(0,0,0,0.05); }
  25%  { background: rgba(0,0,0,0.09); }
  50%  { background: rgba(0,0,0,0.03); }
  75%  { background: rgba(0,0,0,0.07); }
  100% { background: rgba(0,0,0,0.05); }
}
</style>
