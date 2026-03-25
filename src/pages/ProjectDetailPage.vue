<template>
  <div class="container-class" style="margin-top: 100px;">
    <!-- Back link -->
    <div class="detail__back-wrapper">
      <router-link to="/projecten" class="detail__back-link">
        <i class="bx bx-arrow-back"></i>
        Terug naar projecten
      </router-link>
    </div>

    <!-- Loading state -->
    <section v-if="isLoading" class="detail__loading" role="status">
      <div class="detail__spinner"></div>
      <span class="sr-only">Laden...</span>
    </section>

    <!-- 404 state -->
    <section v-else-if="!project" class="detail__not-found">
      <i class="bx bx-error-circle detail__not-found-icon"></i>
      <h1>Project niet gevonden</h1>
      <p>Dit project bestaat niet of is verwijderd.</p>
      <router-link to="/projecten" class="detail__btn detail__btn--primary">
        Bekijk alle projecten
      </router-link>
    </section>

    <!-- Project detail -->
    <article v-else class="detail">
      <!-- Image Slider (als er afbeeldingen zijn) -->
      <div v-if="projectImages.length" class="detail__slider">
        <div class="detail__slider-track" :style="{ transform: 'translateX(-' + activeSlide * 100 + '%)' }">
          <div class="detail__slider-slide" v-for="(img, i) in projectImages" :key="i">
            <img :src="img.url" :alt="img.alt || 'project image'" class="detail__slider-img" />
          </div>
        </div>

        <!-- Controls (only if multiple images) -->
        <template v-if="projectImages.length > 1">
          <button class="detail__slider-btn detail__slider-btn--prev" @click="prevSlide">
            <i class="bx bx-chevron-left"></i>
          </button>
          <button class="detail__slider-btn detail__slider-btn--next" @click="nextSlide">
            <i class="bx bx-chevron-right"></i>
          </button>
          <div class="detail__slider-dots">
            <button
              v-for="(img, i) in projectImages"
              :key="'dot-' + i"
              class="detail__slider-dot"
              :class="{ 'detail__slider-dot--active': activeSlide === i }"
              @click="activeSlide = i"
            ></button>
          </div>
        </template>
      </div>

      <!-- Gradient fallback header (als er geen afbeeldingen zijn) -->
      <div v-else class="detail__gradient-hero" :style="{ background: projectGradient }">
        <div class="detail__gradient-content">
          <div
            v-html="asHTML(project.data.project_title)"
            class="detail__gradient-title"
          ></div>
          <div class="detail__gradient-tags" v-if="projectTechs.length">
            <span class="detail__gradient-tag" v-for="tech in projectTechs" :key="tech">{{ tech }}</span>
          </div>
        </div>
        <div class="detail__gradient-pattern"></div>
      </div>

      <!-- Content -->
      <div class="detail__content">
        <div
          v-html="asHTML(project.data.project_title)"
          class="detail__title"
        ></div>

        <div
          v-html="asHTML(project.data.sub_title)"
          class="detail__subtitle"
        ></div>

        <!-- Tech tags (gekleurd met project kleur) -->
        <div v-if="projectTechs.length" class="detail__tags">
          <span
            class="detail__tag"
            v-for="tech in projectTechs"
            :key="tech"
            :style="{ color: projectColor, background: projectColor + '14', borderColor: projectColor + '30' }"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Full description -->
        <div
          v-html="asHTML(project.data.project_paragraph)"
          class="detail__description"
        ></div>

        <!-- Links -->
        <div class="detail__links">
          <a
            v-if="project.data.github_link"
            :href="project.data.github_link"
            class="detail__btn detail__btn--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bx bxl-github"></i>
            GitHub
          </a>

          <a
            v-if="project.data.website_link"
            :href="project.data.website_link"
            class="detail__btn detail__btn--primary"
            :style="{ background: projectColor }"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bx bx-link-external"></i>
            Website bekijken
          </a>
        </div>

        <!-- Live Demo (macOS browser frame) -->
        <div v-if="project.data.website_link && isDemoEnabled" class="detail__demo" :class="{ 'detail__demo--expanded': demoExpanded }">
          <div class="detail__browser">
            <!-- macOS title bar -->
            <div class="detail__browser-bar">
              <div class="detail__browser-dots">
                <span class="detail__browser-dot detail__browser-dot--red" @click="showIframe = false"></span>
                <span class="detail__browser-dot detail__browser-dot--yellow"></span>
                <span class="detail__browser-dot detail__browser-dot--green" @click="demoExpanded = !demoExpanded"></span>
              </div>
              <div class="detail__browser-url">
                <i class="bx bx-lock-alt"></i>
                {{ project.data.website_link.replace('https://', '').replace('http://', '') }}
              </div>
              <div class="detail__browser-actions">
                <a :href="project.data.website_link" target="_blank" rel="noopener noreferrer" class="detail__browser-action" title="Open in nieuw tabblad">
                  <i class="bx bx-link-external"></i>
                </a>
              </div>
            </div>

            <!-- iframe content -->
            <div v-if="showIframe" class="detail__browser-content">
              <iframe
                :src="project.data.website_link"
                class="detail__browser-iframe"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                loading="lazy"
              ></iframe>
            </div>

            <!-- Placeholder (project image als achtergrond) -->
            <div
              v-else
              class="detail__browser-placeholder"
              @click="showIframe = true"
              :style="projectImages.length ? { backgroundImage: 'url(' + projectImages[0].url + ')' } : {}"
            >
              <div class="detail__browser-placeholder-overlay">
                <i class="bx bx-play-circle"></i>
                <span>Klik om live demo te starten</span>
              </div>
            </div>
          </div>
        </div>
        </div>

      <!-- Project switcher -->
      <div v-if="otherProjects.length" class="detail__switcher">
        <h2 class="detail__switcher-title">Bekijk ook</h2>
        <div class="detail__switcher-grid">
          <router-link
            v-for="other in otherProjects"
            :key="other.id"
            :to="`/projecten/${other.id}`"
            class="detail__switcher-card"
          >
            <div
              class="detail__switcher-image"
              :style="{
                backgroundImage: other.image ? 'url(' + other.image + ')' : 'none',
                background: !other.image ? (other.color || 'var(--color-blue)') : undefined
              }"
            >
              <span v-if="!other.image" class="detail__switcher-fallback">{{ other.name.charAt(0) }}</span>
            </div>
            <div class="detail__switcher-info">
              <h3>{{ other.name }}</h3>
              <span v-if="other.subtitle" class="detail__switcher-sub">{{ other.subtitle }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Prismic from "prismic-javascript";
import { asHTML } from "@prismicio/helpers";
export default {
  name: "ProjectDetailPage",
  data() {
    return {
      project: null,
      allProjects: [],
      isLoading: true,
      activeSlide: 0,
      showIframe: false,
      demoExpanded: false,
      // Sites waar live demo beschikbaar is (jouw eigen sites)
      demoSites: [
        'matthijsblauw.nl',
        'steedsvoorwaarts.nl',
        'luckywear.nl',
        'ilojo-bar',
        'profile-card',
        // 'weather-app-plus',  // TODO: API key fixen
        // 'jbistallatie',       // TODO: moderniseren
      ],
      // Fallback kleuren per project (als er geen primary_color in Prismic staat)
      colorMap: {
        'bulbmanager': '#1C397C',
        'ilojo': '#8C0500',
        'steeds': '#398070',
        'weather': '#4889d3',
        'luckywear': '#FFA22F',
        'lucky': '#FFA22F',
        'floris': '#FFB400',
        'portfolio': '#14539A',
        'visitekaartje': '#6366f1',
        'profile': '#6366f1',
        'bijfluit': '#b45309',
        'wijn': '#b45309',
        'jbe': '#0096D7',
        'gv': '#166534',
      },
      techMap: {
        portfolio: ["Vue 3", "Tailwind", "Chart.js"],
        ilojo: ["SvelteKit", "Three.js", "GraphQL"],
        weather: ["SvelteKit", "API"],
        steeds: ["Vue.js", "Prismic CMS"],
        luckywear: ["Vue.js", "GSAP"],
        lucky: ["Vue.js"],
        floris: ["WordPress"],
        "gv-westfriesland": ["WordPress"],
        "gv westfriesland": ["WordPress"],
        bulbmanager: ["Laravel", "Vue.js", "n8n", "AI"],
        bijfluit: ["Ionic", "Vue.js"],
        wijn: ["Ionic"],
        "e-commerce": ["React"],
        jbe: ["Vue.js"],
        visitekaartje: ["SvelteKit"],
        profile: ["SvelteKit"],
      },
    };
  },
  computed: {
    projectImages() {
      if (!this.project) return [];
      const images = [];
      // Main image
      if (this.project.data.project_image?.url) {
        images.push({
          url: this.project.data.project_image.url,
          alt: this.project.data.project_title?.[0]?.text || 'project image',
        });
      }
      // Extra images (Prismic group/slices — check common field names)
      const extras = this.project.data.gallery || this.project.data.images || this.project.data.extra_images || [];
      if (Array.isArray(extras)) {
        extras.forEach(item => {
          const img = item.image || item.photo || item;
          if (img?.url) {
            images.push({ url: img.url, alt: img.alt || '' });
          }
        });
      }
      return images;
    },
    projectColor() {
      if (!this.project) return '#14539A';
      // Prismic primary_color veld (als het bestaat)
      if (this.project.data.primary_color) return this.project.data.primary_color;
      // Fallback op colorMap
      const title = (this.project.data.project_title?.[0]?.text || '').toLowerCase();
      for (const [keyword, color] of Object.entries(this.colorMap)) {
        if (title.includes(keyword)) return color;
      }
      return '#14539A';
    },
    otherProjects() {
      if (!this.project || !this.allProjects.length) return [];
      return this.allProjects
        .filter(p => p.id !== this.project.id)
        .slice(0, 3)
        .map(p => {
          const title = (p.data.project_title?.[0]?.text || '').toLowerCase();
          let color = p.data.primary_color || null;
          if (!color) {
            for (const [keyword, c] of Object.entries(this.colorMap)) {
              if (title.includes(keyword)) { color = c; break; }
            }
          }
          const name = p.data.project_title?.[0]?.text || 'Untitled';
          return {
            id: p.uid || this.toSlug(name) || p.id,
            name,
            subtitle: p.data.sub_title?.[0]?.text || '',
            image: p.data.project_image?.url || '',
            color: color || '#14539A',
          };
        });
    },
    isDemoEnabled() {
      if (!this.project?.data?.website_link) return false;
      const url = this.project.data.website_link.toLowerCase();
      return this.demoSites.some(site => url.includes(site));
    },
    projectGradient() {
      // Genereer gradient op basis van projectColor
      const hex = this.projectColor;
      // Maak een lichtere variant voor het einde van de gradient
      return `linear-gradient(135deg, ${hex} 0%, ${hex}cc 60%, ${hex}88 100%)`;
    },
    projectTechs() {
      if (!this.project) return [];
      const title = (
        this.project.data.project_title?.[0]?.text || ""
      ).toLowerCase();
      for (const [keyword, techs] of Object.entries(this.techMap)) {
        if (title.includes(keyword)) {
          return techs;
        }
      }
      return [];
    },
  },
  watch: {
    showIframe(val) {
      if (val) this.scaleIframe();
    },
    demoExpanded() {
      this.scaleIframe();
    },
  },
  created() {
    this.fetchProject();
  },
  mounted() {
    this._resizeHandler = () => this.scaleIframe();
    window.addEventListener('resize', this._resizeHandler);
  },
  beforeUnmount() {
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
    }
  },
  methods: {
    asHTML,
    scaleIframe() {
      this.$nextTick(() => {
        const content = this.$el?.querySelector('.detail__browser-content');
        const iframe = this.$el?.querySelector('.detail__browser-iframe');
        if (!content || !iframe) return;
        const scale = content.offsetWidth / 1440;
        iframe.style.transform = `scale(${scale})`;
      });
    },
    toSlug(text) {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    },
    prevSlide() {
      this.activeSlide = this.activeSlide > 0
        ? this.activeSlide - 1
        : this.projectImages.length - 1;
    },
    nextSlide() {
      this.activeSlide = this.activeSlide < this.projectImages.length - 1
        ? this.activeSlide + 1
        : 0;
    },
    async fetchProject() {
      try {
        const slug = this.$route.params.slug;
        const apiEndpoint =
          "https://portfolio-matthijs.cdn.prismic.io/api/v2";
        const api = await Prismic.api(apiEndpoint);

        // Haal alle projecten op en zoek op uid of title-slug
        const allResponse = await api.query(
          Prismic.Predicates.at('document.type', 'projects'),
          { orderings: '[document.last_publication_date desc]' }
        );

        // Zoek project op uid (Prismic slug) of gegenereerde slug van titel
        const doc = allResponse.results.find(p =>
          p.uid === slug ||
          this.toSlug(p.data.project_title?.[0]?.text || '') === slug ||
          p.id === slug
        );

        if (doc) {
          this.project = doc;
        } else {
          this.project = null;
        }

        this.allProjects = allResponse.results || [];
      } catch (error) {
        console.error("Error fetching project from Prismic:", error);
        this.project = null;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Back link */
.detail__back-wrapper {
  max-width: 800px;
  margin: 0 auto 24px;
  padding: 0 12px;
}

.detail__back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-blue);
  font-weight: 700;
  font-size: 16px;
  transition: gap 300ms ease, opacity 300ms ease;
}

.detail__back-link:hover {
  gap: 12px;
  opacity: 0.8;
}

.detail__back-link i {
  font-size: 20px;
  transition: transform 300ms ease;
}

.detail__back-link:hover i {
  transform: translateX(-4px);
}

/* Loading */
.detail__loading {
  display: flex;
  justify-content: center;
  padding: 120px 0;
}

.detail__spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 404 */
.detail__not-found {
  text-align: center;
  padding: 80px 12px;
  max-width: 500px;
  margin: 0 auto;
}

.detail__not-found-icon {
  font-size: 64px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.detail__not-found h1 {
  font-size: 28px;
  color: var(--color-text);
  margin-bottom: 8px;
}

.detail__not-found p {
  font-size: 16px;
  color: var(--color-text-muted);
  margin-bottom: 32px;
}

/* Image Slider */
.detail__slider {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  border-radius: 0 0 20px 20px;
  margin-bottom: 40px;
  background: var(--color-placeholder);
}

.detail__slider-track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.detail__slider-slide {
  flex-shrink: 0;
  width: 100%;
}

.detail__slider-img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  display: block;
}

.detail__slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: background 0.2s ease, transform 0.2s ease;
  z-index: 2;
}

.detail__slider-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.detail__slider-btn--prev {
  left: 16px;
}

.detail__slider-btn--next {
  right: 16px;
}

.detail__slider-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.detail__slider-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.detail__slider-dot--active {
  background: #fff;
  transform: scale(1.2);
}

/* Gradient fallback hero */
.detail__gradient-hero {
  position: relative;
  border-radius: 0 0 20px 20px;
  margin-bottom: 40px;
  padding: 80px 40px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.detail__gradient-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 600px;
}

.detail__gradient-title {
  font-size: 42px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.1;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.detail__gradient-title :deep(h1),
.detail__gradient-title :deep(h2),
.detail__gradient-title :deep(h3),
.detail__gradient-title :deep(p) {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}

.detail__gradient-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.detail__gradient-tag {
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
}

/* Subtle dot pattern overlay */
.detail__gradient-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: radial-gradient(circle, #fff 1px, transparent 1px);
  background-size: 24px 24px;
  z-index: 1;
}

/* Content */
.detail__content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 12px 80px;
}

.detail__title {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
  line-height: 1.2;
  text-align: left;
}

.detail__title :deep(h1),
.detail__title :deep(h2),
.detail__title :deep(h3),
.detail__title :deep(p) {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}

.detail__subtitle {
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  text-align: left;
}

.detail__subtitle :deep(h4),
.detail__subtitle :deep(p) {
  margin: 0;
  font-size: inherit;
  color: inherit;
}

/* Tags */
.detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.detail__tag {
  display: inline-block;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-blue);
  background: var(--color-bg-alt);
  border-radius: 20px;
  border: 1px solid var(--color-border);
}

/* Description */
.detail__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
  text-align: left;
}

.detail__description :deep(p) {
  margin-bottom: 16px;
  color: inherit;
}

.detail__description :deep(a) {
  color: var(--color-blue);
}

/* Link buttons */
.detail__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.detail__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  font-family: "Lato", sans-serif;
  cursor: pointer;
  transition: transform 300ms ease, box-shadow 300ms ease, opacity 300ms ease;
  text-decoration: none;
}

.detail__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--color-card-shadow);
}

.detail__btn i {
  font-size: 20px;
}

.detail__btn--primary {
  background: var(--color-blue);
  color: #fff;
}

.detail__btn--primary:hover {
  opacity: 0.9;
}

.detail__btn--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 2px solid var(--color-border);
}

.detail__btn--secondary:hover {
  border-color: var(--color-blue);
  color: var(--color-blue);
}

/* Live Demo — macOS Browser Frame */
.detail__demo {
  margin-top: 48px;
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
  transition: max-width 0.4s ease;
}

.detail__demo--expanded {
  max-width: calc(100vw - 80px) !important;
  margin-left: calc(-50vw + 50% + 40px);
  margin-right: calc(-50vw + 50% + 40px);
}

/* Browser chrome */
.detail__browser {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 40px var(--color-card-shadow);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

/* Title bar */
.detail__browser-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--color-bg-alt);
  border-bottom: 1px solid var(--color-border);
  min-height: 40px;
}

.detail__browser-dots {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.detail__browser-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.detail__browser-dot:hover {
  opacity: 0.8;
}

.detail__browser-dot--red {
  background: #ff5f57;
}

.detail__browser-dot--yellow {
  background: #febc2e;
}

.detail__browser-dot--green {
  background: #28c840;
}

.detail__browser-url {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--color-surface);
  border-radius: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.detail__browser-url i {
  font-size: 12px;
  color: var(--color-text-muted);
}

.detail__browser-actions {
  flex-shrink: 0;
}

.detail__browser-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--color-text-muted);
  font-size: 16px;
  transition: background 0.2s ease, color 0.2s ease;
}

.detail__browser-action:hover {
  background: var(--color-hover);
  color: var(--color-blue);
}

/* iframe content — 16:10 aspect ratio, geschaald als echt laptop scherm */
.detail__browser-content {
  position: relative;
  width: 100%;
  padding-top: 62.5%; /* 16:10 */
  background: #fff;
  overflow: hidden;
}

.detail__browser-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 1440px;
  height: 900px;
  border: none;
  display: block;
  transform-origin: top left;
  /* Scale wordt berekend door JS op basis van container breedte */
}

/* Placeholder — 16:10 met project afbeelding */
.detail__browser-placeholder {
  position: relative;
  width: 100%;
  padding-top: 62.5%; /* 16:10 */
  background-size: cover;
  background-position: center top;
  background-color: var(--color-bg-alt);
  cursor: pointer;
  overflow: hidden;
}

.detail__browser-placeholder-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}

.detail__browser-placeholder:hover .detail__browser-placeholder-overlay {
  background: rgba(0, 0, 0, 0.6);
}

.detail__browser-placeholder-overlay i {
  font-size: 56px;
  color: #fff;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.detail__browser-placeholder:hover .detail__browser-placeholder-overlay i {
  transform: scale(1.1);
}

.detail__browser-placeholder-overlay span {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .detail__demo--expanded {
    max-width: calc(100vw - 32px) !important;
    margin-left: calc(-50vw + 50% + 16px);
    margin-right: calc(-50vw + 50% + 16px);
  }
}

@media (max-width: 480px) {
  .detail__demo {
    display: none;
  }
}

/* Project Switcher */
.detail__switcher {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 12px 80px;
  border-top: 1px solid var(--color-border);
}

.detail__switcher-title {
  font-size: 22px;
  color: var(--color-text);
  text-align: left;
  margin-bottom: 20px;
}

.detail__switcher-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.detail__switcher-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: 0 2px 12px var(--color-card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
}

.detail__switcher-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-card-shadow-hover);
}

.detail__switcher-image {
  height: 120px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail__switcher-fallback {
  font-size: 36px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.6);
}

.detail__switcher-info {
  padding: 12px 14px;
}

.detail__switcher-info h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  text-align: left;
  line-height: 1.3;
  margin-bottom: 2px;
}

.detail__switcher-sub {
  font-size: 12px;
  color: var(--color-text-muted);
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive */
@media (max-width: 768px) {
  .detail__slider {
    border-radius: 0 0 16px 16px;
  }

  .detail__slider-img {
    height: clamp(200px, 40vw, 300px);
  }

  .detail__slider-btn {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  .detail__gradient-hero {
    padding: 60px 24px;
    min-height: 240px;
    border-radius: 0 0 16px 16px;
  }

  .detail__gradient-title {
    font-size: 32px;
  }

  .detail__switcher-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail__title {
    font-size: 28px;
  }

  .detail__subtitle {
    font-size: 16px;
  }

  .detail__content {
    padding: 0 16px 60px;
  }

  .detail__links {
    flex-direction: column;
  }

  .detail__btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .detail__title {
    font-size: 24px;
  }

  .detail__slider-img {
    height: 220px;
  }

  .detail__gradient-hero {
    padding: 48px 16px;
    min-height: 200px;
  }

  .detail__gradient-title {
    font-size: 26px;
  }

  .detail__gradient-tag {
    font-size: 11px;
    padding: 4px 12px;
  }

  .detail__switcher-grid {
    grid-template-columns: 1fr;
  }

  .detail__switcher-card {
    flex-direction: row;
  }

  .detail__switcher-image {
    width: 80px;
    height: auto;
    min-height: 80px;
    flex-shrink: 0;
  }

  .detail__switcher-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
