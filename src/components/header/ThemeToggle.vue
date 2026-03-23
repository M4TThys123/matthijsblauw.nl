<template>
  <button
    class="theme-toggle"
    :class="{ 'theme-toggle--dark': isDark }"
    @click="toggle"
    :aria-label="isDark ? 'Schakel naar licht thema' : 'Schakel naar donker thema'"
    :title="isDark ? 'Licht thema' : 'Donker thema'"
  >
    <span class="theme-toggle__track">
      <span class="theme-toggle__thumb">
        <svg
          class="theme-toggle__icon theme-toggle__icon--sun"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg
          class="theme-toggle__icon theme-toggle__icon--moon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </span>
  </button>
</template>

<script>
const STORAGE_KEY = 'matthijsblauw-theme';

export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDark: false,
    };
  },
  mounted() {
    this.isDark = this.getInitialTheme();
    this.applyTheme(this.isDark);

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.onSystemThemeChange);
  },
  beforeUnmount() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.onSystemThemeChange);
    }
  },
  methods: {
    getInitialTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    applyTheme(dark) {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    },
    toggle() {
      this.isDark = !this.isDark;
      this.applyTheme(this.isDark);
      localStorage.setItem(STORAGE_KEY, this.isDark ? 'dark' : 'light');
    },
    onSystemThemeChange(e) {
      if (localStorage.getItem(STORAGE_KEY) === null) {
        this.isDark = e.matches;
        this.applyTheme(this.isDark);
      }
    },
  },
};
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
}

.theme-toggle__track {
  position: relative;
  width: 52px;
  height: 28px;
  background: #e2e8f0;
  border-radius: 14px;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  padding: 0 3px;
}

.theme-toggle--dark .theme-toggle__track {
  background: #334155;
}

.theme-toggle__thumb {
  position: relative;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(0);
}

.theme-toggle--dark .theme-toggle__thumb {
  transform: translateX(24px);
  background: #1e293b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.theme-toggle__icon {
  width: 14px;
  height: 14px;
  position: absolute;
  transition: opacity 0.2s ease, transform 0.3s ease;
}

.theme-toggle__icon--sun {
  color: #f59e0b;
  opacity: 1;
  transform: rotate(0deg);
}

.theme-toggle--dark .theme-toggle__icon--sun {
  opacity: 0;
  transform: rotate(-90deg);
}

.theme-toggle__icon--moon {
  color: #94a3b8;
  opacity: 0;
  transform: rotate(90deg);
}

.theme-toggle--dark .theme-toggle__icon--moon {
  opacity: 1;
  transform: rotate(0deg);
}
</style>
