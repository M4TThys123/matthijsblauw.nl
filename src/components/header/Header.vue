<template>
  <header class="blur">
    <nav>
      <router-link to="/" class="logo__link" @click="closeNav">
        <div class="personal__logo">Matthijs Blauw</div>
      </router-link>

      <div class="nav__menu" :class="{ 'nav__menu--open': isNavOpen }">
        <ul class="nav__link--list" :class="{ 'nav__list--open': isNavOpen }">
          <li class="nav__item">
            <router-link to="/projecten" class="nav__link nav__link--anchor" @click="closeNav">Projecten</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/werkervaring" class="nav__link nav__link--anchor" @click="closeNav">Werkervaring</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/charts" class="nav__link nav__link--anchor" @click="closeNav">Charts</router-link>
          </li>
          <li class="nav__item">
            <a href="mailto:matthijs.blauw@gmail.com" class="nav__link nav__link--anchor nav__link--anchor-primary" @click="closeNav">Contact</a>
          </li>
        </ul>
      </div>

      <HamburgerMenu @click="toggleNav" :is-nav-open="isNavOpen" class="menu__trigger"></HamburgerMenu>
    </nav>
  </header>
</template>

<script>
import HamburgerMenu from "@/components/header/HamburgerMenu.vue";
export default {
  name: "HeaderComponent",
  components: {
    HamburgerMenu
  },
  data() {
    return {
      isNavOpen: false,
    }
  },
  methods: {
    closeNav() {
      this.isNavOpen = false;
      document.body.classList.remove('no-scroll');
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
      if (this.isNavOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    },
  },
}
</script>

<style scoped>
header {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  padding: 0 24px;
  transition: all 0.3s ease;
}

.blur {
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

nav {
  height: 70px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo__link {
  z-index: 1001;
  text-decoration: none;
}

.personal__logo {
  font-size: 20px;
  color: var(--color-blue);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.nav__link--list {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__item {
  margin: 0;
}

.nav__link--anchor {
  color: #444;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 200ms ease;
}

.nav__link--anchor:hover {
  color: #14539A;
  background-color: rgba(20, 83, 154, 0.06);
}

.nav__link--anchor-primary {
  background-color: #14539A;
  color: #fff;
  padding: 10px 22px;
  border-radius: 50px;
  margin-left: 4px;
}

.nav__link--anchor-primary:hover {
  background-color: #0e3f7a;
  color: #fff;
}

.menu__trigger {
  display: none;
  z-index: 1001;
  cursor: pointer;
}

/* Mobile nav overlay */
@media screen and (max-width: 768px) {
  .menu__trigger {
    display: block;
  }

  .nav__link--list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    visibility: hidden;
  }

  .nav__list--open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav__item {
    opacity: 0;
    transform: translateY(20px);
    animation: none;
  }

  .nav__list--open .nav__item {
    animation: fadeInUp 0.4s ease forwards;
  }

  .nav__list--open .nav__item:nth-child(1) { animation-delay: 0.1s; }
  .nav__list--open .nav__item:nth-child(2) { animation-delay: 0.15s; }
  .nav__list--open .nav__item:nth-child(3) { animation-delay: 0.2s; }
  .nav__list--open .nav__item:nth-child(4) { animation-delay: 0.25s; }
  .nav__list--open .nav__item:nth-child(5) { animation-delay: 0.3s; }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav__link--anchor {
    font-size: 28px;
    font-weight: 700;
    padding: 16px 24px;
    color: #242424;
  }

  .nav__link--anchor:hover {
    color: #14539A;
    background-color: transparent;
  }

  .nav__link--anchor-primary {
    margin-top: 16px;
    font-size: 18px;
    padding: 14px 36px;
  }
}
</style>
