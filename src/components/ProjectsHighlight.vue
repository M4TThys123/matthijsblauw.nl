<template>
  <section class="projects-highlight" ref="sectionRef">
    <!-- Loading -->
    <div v-if="isLoading" class="projects-highlight__loading">
      <span class="projects-highlight__spinner"></span>
      Projecten laden...
    </div>

    <!-- Horizontal scroll area (desktop) — titel zit IN de sticky view -->
    <div v-if="projects.length" class="projects-highlight__sticky" ref="stickyRef">
      <div class="projects-highlight__sticky-inner">
        <!-- Header inside sticky -->
        <div class="projects-highlight__header">
          <h2 class="section__title" style="margin-bottom: 0;">
            Uitgelichte <span class="text--blue">projecten</span>
          </h2>
          <router-link to="/projecten" class="projects-highlight__link">
            Bekijk alle projecten
            <i class="bx bx-right-arrow-alt"></i>
          </router-link>
        </div>

        <div class="projects-highlight__track" ref="trackRef">
        <div
          class="project-card"
          v-for="(project, index) in projects"
          :key="index"
        >
          <router-link :to="project.link" class="project-card__inner">
            <div
              class="project-card__image"
              :style="{ backgroundImage: 'url(' + project.image + ')' }"
            ></div>
            <div class="project-card__overlay"></div>
            <div class="project-card__content">
              <h3 class="project-card__title">{{ project.name }}</h3>
              <p v-if="project.description" class="project-card__description">
                {{ project.description }}
              </p>
              <div class="project-card__tags">
                <span
                  class="project-card__tag"
                  v-for="tech in project.tech"
                  :key="tech"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
        </div>
      </div>
    </div>

    <!-- Mobile header (buiten sticky) -->
    <div v-if="projects.length" class="projects-highlight__mobile-header">
      <h2 class="section__title" style="margin-bottom: 0;">
        Uitgelichte <span class="text--blue">projecten</span>
      </h2>
      <router-link to="/projecten" class="projects-highlight__link">
        Bekijk alle projecten
        <i class="bx bx-right-arrow-alt"></i>
      </router-link>
    </div>

    <!-- Mobile: vertical stack -->
    <div v-if="projects.length" class="projects-highlight__mobile">
      <div
        class="project-card project-card--mobile"
        v-for="(project, index) in projects"
        :key="'mobile-' + index"
      >
        <router-link :to="project.link" class="project-card__inner">
          <div
            class="project-card__image"
            :style="{ backgroundImage: 'url(' + project.image + ')' }"
          ></div>
          <div class="project-card__overlay"></div>
          <div class="project-card__content">
            <h3 class="project-card__title">{{ project.name }}</h3>
            <p v-if="project.description" class="project-card__description">
              {{ project.description }}
            </p>
            <div class="project-card__tags">
              <span
                class="project-card__tag"
                v-for="tech in project.tech"
                :key="tech"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Prismic from 'prismic-javascript';

gsap.registerPlugin(ScrollTrigger);

const PRISMIC_ENDPOINT = 'https://portfolio-matthijs.cdn.prismic.io/api/v2';

export default {
  name: "ProjectsHighlight",

  data() {
    return {
      scrollTriggerInstance: null,
      isLoading: true,
      projects: [],
    };
  },

  mounted() {
    this.fetchProjects();
  },

  beforeUnmount() {
    this.destroyScrollAnimation();
  },

  methods: {
    toSlug(text) {
      return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    },
    getHighResImage(url) {
      if (!url) return '';
      // Vervang de Prismic resize params voor hogere resolutie (1550x1000, 2x van 775x500)
      return url.replace(/&w=\d+&h=\d+/, '&w=1550&h=1000');
    },
    async fetchProjects() {
      try {
        const api = await Prismic.api(PRISMIC_ENDPOINT);
        const response = await api.query(
          Prismic.Predicates.at('document.type', 'projects'),
          { pageSize: 6, orderings: '[document.last_publication_date desc]' }
        );

        this.projects = (response.results || []).map(project => {
          const name = project.data.project_title?.[0]?.text || 'Untitled';
          const slug = project.uid || this.toSlug(name) || project.id;
          return {
            id: project.id,
            name,
            description: project.data.project_paragraph?.[0]?.text || '',
            tech: (project.data.sub_title?.[0]?.text || '').split(/[,·|]/).map(t => t.trim()).filter(Boolean),
            image: this.getHighResImage(project.data.project_image?.url || ''),
            link: `/projecten/${slug}`,
          };
        });
      } catch (e) {
        this.projects = [];
      }

      this.isLoading = false;
      this.$nextTick(() => {
        this.initScrollAnimation();
      });
    },

    initScrollAnimation() {
      const sticky = this.$refs.stickyRef;
      const track = this.$refs.trackRef;

      if (!sticky || !track) return;

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          this.scrollTriggerInstance = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: sticky,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => "+=" + (track.scrollWidth - window.innerWidth),
              invalidateOnRefresh: true,
            },
          });
        },

        "(max-width: 767px)": () => {
          gsap.set(track, { x: 0 });
        },
      });
    },

    destroyScrollAnimation() {
      if (this.scrollTriggerInstance) {
        if (this.scrollTriggerInstance.scrollTrigger) {
          this.scrollTriggerInstance.scrollTrigger.kill();
        }
        this.scrollTriggerInstance.kill();
        this.scrollTriggerInstance = null;
      }

      const sticky = this.$refs.stickyRef;
      if (sticky) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === sticky) {
            st.kill();
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.projects-highlight {
  position: relative;
  overflow: hidden;
}

/* Header (inside sticky) */
.projects-highlight__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 64px 16px;
}

/* Mobile header (outside sticky) */
.projects-highlight__mobile-header {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 30px 16px 16px;
  text-align: center;
}

.projects-highlight__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-blue);
  font-weight: 700;
  font-size: 16px;
  transition: gap 300ms ease, opacity 300ms ease;
}

.projects-highlight__link:hover {
  gap: 12px;
  opacity: 0.8;
}

.projects-highlight__link svg {
  transition: transform 300ms ease;
}

.projects-highlight__link:hover svg {
  transform: translateX(4px);
}

/* Loading */
.projects-highlight__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 60px;
  color: var(--color-text-muted);
  font-size: 14px;
}

.projects-highlight__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  animation: ph-spin 0.6s linear infinite;
}

@keyframes ph-spin {
  to { transform: rotate(360deg); }
}

/* Sticky / Track (Desktop) */
.projects-highlight__sticky {
  display: none;
  height: 100vh;
  overflow: hidden;
}

.projects-highlight__sticky-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 20px 0;
}

.projects-highlight__track {
  display: flex;
  gap: 32px;
  padding: 0 64px;
  will-change: transform;
}

/* Project Card */
.project-card {
  flex-shrink: 0;
  width: 520px;
  height: 335px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.project-card__inner {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px var(--color-card-shadow);
  transition: transform 400ms ease, box-shadow 400ms ease;
}

.project-card__inner:hover {
  transform: scale(1.03);
  box-shadow: 0 16px 48px var(--color-card-shadow-hover);
}

.project-card__image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-color: var(--color-placeholder);
  transition: transform 500ms ease;
}

.project-card__inner:hover .project-card__image {
  transform: scale(1.08);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0.1) 100%
  );
  transition: background 400ms ease;
}

.project-card__inner:hover .project-card__overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

.project-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px 24px;
  z-index: 2;
  transition: transform 400ms ease;
}

.project-card__inner:hover .project-card__content {
  transform: translateY(-8px);
}

.project-card__title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  text-align: left;
  line-height: 1.2;
}

.project-card__description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
  line-height: 1.4;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 400ms ease, max-height 400ms ease;
}

.project-card__inner:hover .project-card__description {
  opacity: 1;
  max-height: 60px;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-card__tag {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: var(--color-blue);
  border-radius: 20px;
  text-align: center;
  line-height: 1.4;
}

/* Mobile: vertical stack */
.projects-highlight__mobile {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px 48px;
  max-width: 500px;
  margin: 0 auto;
}

.project-card--mobile {
  width: 100%;
  height: 240px;
}

.project-card--mobile .project-card__description {
  opacity: 1;
  max-height: 60px;
}

/* Responsive */
@media (min-width: 768px) {
  .projects-highlight__sticky {
    display: block;
  }

  .projects-highlight__mobile {
    display: none;
  }

  .projects-highlight__mobile-header {
    display: none;
  }
}

@media (max-width: 767px) {
  .projects-highlight__header {
    display: none;
  }

  .projects-highlight__mobile-header {
    display: flex;
  }
}

@media (min-width: 1200px) {
  .project-card {
    width: 600px;
    height: 387px;
  }

  .projects-highlight__track {
    gap: 40px;
    padding: 0 80px;
  }

  .projects-highlight__header {
    padding: 0 80px 20px;
  }
}

@media (max-width: 480px) {
  .project-card--mobile {
    height: 220px;
  }

  .project-card__title {
    font-size: 20px;
  }
}
</style>
