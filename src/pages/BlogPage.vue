<template>
  <div class="blog-page" style="margin-top: 100px;">
    <div class="row-class">
      <h1 class="section__title">Mijn <span class="text--blue">Updates</span></h1>
      <p class="blog-page__intro">Wat ik bouw, leer en deel — updates over mijn projecten en development journey.</p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="blog-page__loading">
      <span class="blog-page__spinner"></span>
      Posts laden...
    </div>

    <!-- Posts -->
    <div class="blog-page__grid">
      <article
        v-for="post in allPosts"
        :key="post.id"
        class="blog-card"
        :class="{ 'blog-card--open': openPost === post.id }"
        @click="togglePost(post.id)"
      >
        <div class="blog-card__header">
          <div class="blog-card__meta">
            <time class="blog-card__date">{{ post.date }}</time>
            <span v-if="post.tag" class="blog-card__tag">{{ post.tag }}</span>
          </div>
          <h2 class="blog-card__title">{{ post.title }}</h2>
          <p class="blog-card__excerpt">{{ post.excerpt }}</p>
          <span class="blog-card__toggle">
            <i :class="openPost === post.id ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"></i>
          </span>
        </div>

        <transition name="expand">
          <div v-if="openPost === post.id" class="blog-card__body" @click.stop>
            <div v-if="post.html" v-html="post.html" class="blog-card__content"></div>
            <div v-else class="blog-card__content">
              <div v-for="(section, i) in post.sections" :key="i">
                <h3 v-if="section.heading">{{ section.heading }}</h3>
                <p v-if="section.text">{{ section.text }}</p>
                <ul v-if="section.list">
                  <li v-for="(item, j) in section.list" :key="j">{{ item }}</li>
                </ul>
                <img
                  v-if="section.image"
                  :src="section.image"
                  :alt="section.imageAlt || section.heading || ''"
                  class="blog-card__image"
                />
              </div>

              <!-- Image gallery -->
              <div v-if="post.images && post.images.length" class="blog-card__gallery">
                <img
                  v-for="(img, k) in post.images"
                  :key="k"
                  :src="img.src"
                  :alt="img.alt || ''"
                  class="blog-card__image"
                  @click.stop="openImage(img.src)"
                />
              </div>
            </div>
          </div>
        </transition>
      </article>
    </div>

    <!-- Lightbox -->
    <transition name="fade">
      <div v-if="lightboxSrc" class="blog-lightbox" @click="lightboxSrc = null">
        <img :src="lightboxSrc" alt="" class="blog-lightbox__image" />
        <button class="blog-lightbox__close" @click="lightboxSrc = null">
          <i class="bx bx-x"></i>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import { asHTML } from '@prismicio/helpers';

const PRISMIC_ENDPOINT = 'https://portfolio-matthijs.cdn.prismic.io/api/v2';

export default {
  name: 'BlogPage',

  data() {
    return {
      isLoading: true,
      openPost: null,
      lightboxSrc: null,
      prismicPosts: [],
      // Statische posts als fallback / voorbeeld
      staticPosts: [
        {
          id: 'static-1',
          date: '23 maart 2026',
          tag: 'Portfolio',
          title: 'Portfolio v4 — Grote upgrade live!',
          excerpt: 'Dark mode, GSAP animaties, live GitHub data, contactformulier en meer.',
          sections: [
            {
              heading: 'Wat is er nieuw?',
              text: 'Vandaag heb ik mijn portfolio een flinke upgrade gegeven. De hele site draait nu op Vue 3 met Tailwind CSS, en er zijn een hoop nieuwe features bijgekomen.',
            },
            {
              heading: 'Dark / Light Mode',
              text: 'Een volledig dark theme met 30+ CSS variabelen. De toggle detecteert automatisch je systeemvoorkeur en onthoudt je keuze. Alle componenten zijn aangepast — van header tot footer.',
            },
            {
              heading: 'GSAP Scroll Slider',
              text: 'Op de homepage staat nu een horizontale project slider die reageert op je scroll positie. Gebouwd met GSAP ScrollTrigger — de sectie "plakt" vast terwijl de kaarten van rechts naar links schuiven. Op mobile wordt het een verticale stack.',
            },
            {
              heading: 'Live GitHub Statistieken',
              list: [
                'Commits per maand chart haalt nu live data op van de GitHub API',
                'MarqueeTrack toont dynamisch: totale commits, branches, en repo\'s',
                'StatsSection combineert Bulbmanager (privé) + GitHub (publiek) data',
                'Periode filter: laatste 1, 2, 3 jaar of alles',
              ],
            },
            {
              heading: 'Contact Pagina',
              text: 'Een volledige contactpagina met split layout: links contactgegevens + social links, rechts een formulier met validatie. Gekoppeld aan Formspree voor email aflevering.',
            },
            {
              heading: 'Overige verbeteringen',
              list: [
                'Page transitions — fade-up animatie bij elke navigatie',
                'Active route indicator in de header',
                'Sliding marquee met statistieken',
                'Animated counters die optellen bij scrollen',
                'Titel consistent: "Fullstack Developer, Digital Designer & AI Engineer"',
              ],
            },
          ],
        },
        {
          id: 'static-2',
          date: '20 maart 2026',
          tag: 'Development',
          title: 'Portfolio v4 gebouwd — Vue 3, Tailwind & Chart.js',
          excerpt: 'De basis van mijn nieuwe portfolio: 8 interactieve charts, 4 pagina\'s en een volledig nieuw design.',
          sections: [
            {
              heading: 'Nieuw fundament',
              text: 'Mijn portfolio is volledig opnieuw opgebouwd met Vue 3, Tailwind CSS en Vue Router. De oude Bootstrap versie is vervangen door een moderne stack met betere performance en meer flexibiliteit.',
            },
            {
              heading: 'Interactieve data visualisaties',
              list: [
                '8 Chart.js componenten: commits per maand, carrière tijdlijn, skills radar, en meer',
                'Echte data uit mijn git history — 653+ commits, 150+ branches',
                'Skills groei chart van 2019 tot 2026',
                'Furora-style machine monitoring demo',
              ],
            },
            {
              heading: 'Pagina\'s',
              list: [
                'Homepage met hero, tech stack en hobbies',
                'Projecten pagina met Prismic CMS en tech filters',
                'Werkervaring pagina met tijdlijn en charts',
                'Statistieken pagina met alle 8 charts in een grid',
              ],
            },
          ],
        },
      ],
    };
  },

  computed: {
    allPosts() {
      // Prismic posts eerst (nieuwste bovenaan), dan statische posts
      const prismic = this.prismicPosts.map(post => ({
        id: post.id,
        date: this.formatDate(post.first_publication_date),
        tag: post.data.tag?.[0]?.text || post.data.tag || '',
        title: post.data.title?.[0]?.text || post.data.title || 'Untitled',
        excerpt: post.data.excerpt?.[0]?.text || post.data.excerpt || '',
        html: asHTML(post.data.body || post.data.content || []),
      }));

      return [...prismic, ...this.staticPosts];
    },
  },

  created() {
    this.fetchPrismicPosts();
  },

  methods: {
    asHTML,

    togglePost(id) {
      this.openPost = this.openPost === id ? null : id;
    },

    openImage(src) {
      this.lightboxSrc = src;
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
        'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    },

    async fetchPrismicPosts() {
      try {
        const api = await Prismic.api(PRISMIC_ENDPOINT);
        const response = await api.query(
          Prismic.Predicates.at('document.type', 'blog_post'),
          { orderings: '[document.first_publication_date desc]', pageSize: 50 }
        );
        this.prismicPosts = response.results || [];
      } catch (e) {
        // Prismic blog type doesn't exist yet — that's fine, show static posts
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.blog-page__intro {
  text-align: center;
  margin-bottom: 40px;
  color: var(--color-text-muted);
  font-size: 16px;
}

.blog-page__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px;
  color: var(--color-text-muted);
  font-size: 14px;
}

.blog-page__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Grid */
.blog-page__grid {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 12px 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Card */
.blog-card {
  background: var(--color-surface);
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 2px 12px var(--color-card-shadow);
  border-left: 4px solid transparent;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.blog-card:hover {
  box-shadow: 0 4px 20px var(--color-card-shadow-hover);
  transform: translateY(-2px);
}

.blog-card--open {
  border-left-color: var(--color-blue);
  cursor: default;
}

/* Header */
.blog-card__header {
  position: relative;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.blog-card__date {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 600;
}

.blog-card__tag {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  background: var(--color-hover);
  color: var(--color-blue);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.blog-card__title {
  font-size: 20px;
  color: var(--color-text);
  text-align: left;
  margin-bottom: 6px;
  line-height: 1.3;
}

.blog-card__excerpt {
  font-size: 15px;
  color: var(--color-text-secondary);
  text-align: left;
  line-height: 1.5;
}

.blog-card__toggle {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  color: var(--color-text-muted);
  transition: transform 0.3s ease;
}

/* Expand transition */
.expand-enter-active {
  transition: max-height 0.4s ease, opacity 0.3s ease;
  overflow: hidden;
}

.expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to {
  max-height: 2000px;
  opacity: 1;
}

/* Body / Content */
.blog-card__body {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.blog-card__content h3 {
  font-size: 17px;
  color: var(--color-blue);
  text-align: left;
  margin: 20px 0 8px;
}

.blog-card__content h3:first-child {
  margin-top: 0;
}

.blog-card__content p {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  text-align: left;
  margin-bottom: 8px;
}

.blog-card__content ul {
  padding-left: 20px;
  margin: 8px 0;
}

.blog-card__content li {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  text-align: left;
  list-style-type: disc;
  margin-bottom: 4px;
}

/* Images */
.blog-card__image {
  width: 100%;
  border-radius: 10px;
  margin: 12px 0;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card__image:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 16px var(--color-card-shadow-hover);
}

/* Gallery */
.blog-card__gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.blog-card__gallery .blog-card__image {
  margin: 0;
  height: 200px;
  object-fit: cover;
}

/* Lightbox */
.blog-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 24px;
}

.blog-lightbox__image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  object-fit: contain;
}

.blog-lightbox__close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 36px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.blog-lightbox__close:hover {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-card {
    padding: 20px;
  }

  .blog-card__title {
    font-size: 18px;
    padding-right: 30px;
  }

  .blog-card__gallery {
    grid-template-columns: 1fr;
  }

  .blog-card__gallery .blog-card__image {
    height: 180px;
  }
}
</style>
