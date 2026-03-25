<template>
  <div class="fi-layer" aria-hidden="true" role="presentation">
    <div
      v-for="icon in icons"
      :key="icon.name"
      class="fi"
      :class="'fi--anim-' + icon.anim"
      :style="{
        top: icon.top + '%',
        left: icon.left + '%',
        '--fi-dur': scaledDur(icon.dur),
        '--fi-delay': icon.delay,
      }"
      v-html="icon.svg"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'FloatingIcons',
  props: {
    // Snelheid: 0.5 = dubbel zo snel, 1 = normaal, 2 = dubbel zo langzaam
    speed: { type: Number, default: 1 },
  },
  methods: {
    scaledDur(dur) {
      const seconds = parseFloat(dur);
      return (seconds * this.speed) + 's';
    },
  },
  data() {
    return {
      icons: [
        {
          name: 'code',
          svg: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
          top: 8, left: 6, dur: '6.2s', delay: '0s', anim: 'a',
        },
        {
          name: 'database',
          svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
          top: 72, left: 91, dur: '6.8s', delay: '0.3s', anim: 'b',
        },
        {
          name: 'figma',
          svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>',
          top: 15, left: 88, dur: '5.5s', delay: '0.8s', anim: 'c',
        },
        {
          name: 'brain-circuit',
          svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>',
          top: 82, left: 8, dur: '7.1s', delay: '1.5s', anim: 'd',
        },
        {
          name: 'layers',
          svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
          top: 35, left: 93, dur: '5.9s', delay: '2.1s', anim: 'a',
        },
        {
          name: 'globe',
          svg: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
          top: 45, left: 4, dur: '7.4s', delay: '2.8s', anim: 'b',
        },
        {
          name: 'terminal',
          svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
          top: 5, left: 38, dur: '4.8s', delay: '0.6s', anim: 'c',
        },
        {
          name: 'palette',
          svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
          top: 90, left: 62, dur: '6.6s', delay: '1.8s', anim: 'd',
        },
        {
          name: 'zap',
          svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
          top: 60, left: 5, dur: '5.3s', delay: '3.2s', anim: 'a',
        },
        {
          name: 'git-branch',
          svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
          top: 92, left: 30, dur: '7.8s', delay: '0.4s', anim: 'b',
        },
        {
          name: 'bar-chart',
          svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
          top: 5, left: 65, dur: '6.0s', delay: '2.4s', anim: 'c',
        },
        {
          name: 'boxes',
          svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>',
          top: 68, left: 92, dur: '5.5s', delay: '1.0s', anim: 'd',
        },
      ],
    };
  },
};
</script>

<style scoped>
.fi-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  contain: layout style;
}

.fi {
  position: absolute;
  color: var(--color-text);
  opacity: var(--opacity-icon-float, 0.10);
  will-change: transform;
  transition: opacity 0.3s ease;
}

.fi svg {
  display: block;
}

/* 4 keyframe varianten */
@keyframes fi-float-a {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-16px) rotate(6deg); }
}

@keyframes fi-float-b {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(-8deg); }
}

@keyframes fi-float-c {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(16deg); }
}

@keyframes fi-float-d {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-14px) rotate(5deg); }
}

.fi--anim-a { animation: fi-float-a var(--fi-dur) ease-in-out infinite var(--fi-delay); }
.fi--anim-b { animation: fi-float-b var(--fi-dur) ease-in-out infinite var(--fi-delay); }
.fi--anim-c { animation: fi-float-c var(--fi-dur) ease-in-out infinite var(--fi-delay); }
.fi--anim-d { animation: fi-float-d var(--fi-dur) ease-in-out infinite var(--fi-delay); }

/* Accessibility: OS voorkeur */
@media (prefers-reduced-motion: reduce) {
  .fi {
    animation: none !important;
  }
}

/* Data-motion attribuut (handmatige toggle) */
:global([data-motion="reduced"]) .fi {
  animation: none !important;
}

/* Dark mode: iets zichtbaarder */
:global([data-theme="dark"]) .fi {
  color: var(--color-blue);
}

/* Mobile: minder icons, kleiner, subtieler */
@media (max-width: 768px) {
  .fi {
    opacity: var(--opacity-icon-float-mobile, 0.07);
  }

  .fi:nth-child(n+7) {
    display: none;
  }

  .fi svg {
    transform: scale(0.75);
  }
}
</style>
