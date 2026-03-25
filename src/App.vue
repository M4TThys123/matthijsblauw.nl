<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/header/Header.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    },
}
</script>

<style>
/* =============================================
   THEME: CSS Custom Properties
   ============================================= */
:root {
  /* Accent */
  --color-blue: #14539A;
  --color-blue-hover: #0e3f7a;

  /* Backgrounds */
  --color-bg: #ffffff;
  --color-bg-alt: #f8f8f8;
  --color-surface: #ffffff;

  /* Text */
  --color-text: #242424;
  --color-text-secondary: #555555;
  --color-text-muted: #888888;

  /* UI */
  --color-border: rgba(0, 0, 0, 0.06);
  --color-hover: rgba(20, 83, 154, 0.06);
  --color-header-bg: rgba(255, 255, 255, 0.85);
  --color-card-shadow: rgba(0, 0, 0, 0.1);
  --color-card-shadow-hover: rgba(0, 0, 0, 0.15);

  /* Footer */
  --color-footer-bg: #14151A;
  --color-footer-copyright: rgba(0, 0, 0, 0.2);

  /* Specific */
  --color-placeholder: #e8e8e8;
  --color-placeholder-icon: #bbbbbb;
  --color-nav-link: #444444;
  --color-hamburger: #1a1919;
  --color-overlay-bg: rgba(255, 255, 255, 0.98);
  --color-project-overlay: #1c1d25;

  /* Floating icons */
  --opacity-icon-float: 0.10;
  --opacity-icon-float-mobile: 0.07;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --color-blue: #5B9BF2;
  --color-blue-hover: #7db3ff;

  --color-bg: #121318;
  --color-bg-alt: #1a1b23;
  --color-surface: #1e2029;

  --color-text: #e8eaf0;
  --color-text-secondary: #9ca3b4;
  --color-text-muted: #6b7280;

  --color-border: rgba(255, 255, 255, 0.08);
  --color-hover: rgba(91, 155, 242, 0.12);
  --color-header-bg: rgba(18, 19, 24, 0.85);
  --color-card-shadow: rgba(0, 0, 0, 0.4);
  --color-card-shadow-hover: rgba(0, 0, 0, 0.5);

  --color-footer-bg: #0a0b0f;
  --color-footer-copyright: rgba(0, 0, 0, 0.4);

  --color-placeholder: #2a2c36;
  --color-placeholder-icon: #4a4d5a;
  --color-nav-link: #c0c5d0;
  --color-hamburger: #e8eaf0;
  --color-overlay-bg: rgba(18, 19, 24, 0.98);
  --color-project-overlay: #0d0e14;

  /* Floating icons */
  --opacity-icon-float: 0.15;
  --opacity-icon-float-mobile: 0.10;
}

/* System preference fallback (no JS / no manual choice) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-blue: #5B9BF2;
    --color-blue-hover: #7db3ff;
    --color-bg: #121318;
    --color-bg-alt: #1a1b23;
    --color-surface: #1e2029;
    --color-text: #e8eaf0;
    --color-text-secondary: #9ca3b4;
    --color-text-muted: #6b7280;
    --color-border: rgba(255, 255, 255, 0.08);
    --color-hover: rgba(91, 155, 242, 0.12);
    --color-header-bg: rgba(18, 19, 24, 0.85);
    --color-card-shadow: rgba(0, 0, 0, 0.4);
    --color-card-shadow-hover: rgba(0, 0, 0, 0.5);
    --color-footer-bg: #0a0b0f;
    --color-footer-copyright: rgba(0, 0, 0, 0.4);
    --color-placeholder: #2a2c36;
    --color-placeholder-icon: #4a4d5a;
    --color-nav-link: #c0c5d0;
    --color-hamburger: #e8eaf0;
    --color-overlay-bg: rgba(18, 19, 24, 0.98);
    --color-project-overlay: #0d0e14;
  }
}

/* =============================================
   GLOBAL RESETS & BASE STYLES
   ============================================= */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}

h1,
h2,
h5,
h6,
span {
  color: var(--color-text);
  text-align: center;
  line-height: 1.25;
}

h1 {
  font-size: 36px;
}

h3 {
  text-align: left;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
}

p {
  line-height: 1.5;
  font-size: 16px;
  color: var(--color-text-secondary);
}

button {
  border: none;
}

a {
  text-decoration: none;
  position: relative;
  transition: opacity 300ms ease;
}

i:hover {
  opacity: 0.7;
}

li {
  list-style-type: none;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.container-class {
  padding: 50px 0;
}

.row-class {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 12px;
}

.text--blue {
  color: var(--color-blue);
}

.section:nth-child(odd) {
  background-color: var(--color-bg-alt);
}

.section__title {
  margin-bottom: 20px;
  font-size: 36px;
}

/* Breakpoints */
@media (max-width: 768px) {
  .nav {
    height: 68px;
  }

  h1 {
    font-size: 28px;
  }

  .about-me__info--para {
    font-size: 18px;
  }

  .language {
    width: calc(100% / 3);
  }

  .project__description--para p {
    font-size: 14px;
  }

  .project__description {
    left: 16px;
    padding-right: 16px;
  }
}

/* =============================================
   PAGE TRANSITIONS
   ============================================= */
.page-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
}
</style>
