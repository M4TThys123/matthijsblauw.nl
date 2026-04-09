<template>
  <section id="projects" class="py-4">
    <div class="container-class">
      <div class="row-class">
        <h2 class="section__title">
          Hier een aantal van mijn
          <span class="text--blue">projecten</span>
        </h2>

        <div class="project__filters">
          <button
            v-for="filter in techFilters"
            :key="filter.value"
            :class="['filter__btn', { 'filter__btn--active': activeFilter === filter.value }]"
            @click="setFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>

        <section v-if="isLoading" class="flex justify-center" role="status">
          <div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <span class="hidden">Loading...</span>
        </section>

        <ul class="project__list">
          <li class="project" v-for="project in filteredProjects" :key="project.data.id">
            <div
              class="project__wrapper"
              @click="goToProject(project)"
              style="cursor: pointer;"
            >
              <PrismicImage :field="project.data.project_image" class="project__img" alt="project image"/>

              <div class="project__description">
                <div
                  v-html="asHTML(project.data.project_title)"
                  class="project__description--title"
                ></div>

                <div
                  v-html="asHTML(project.data.sub_title)"
                  class="project__description--sub-title"
                ></div>
                <div
                  v-html="asHTML(project.data.project_paragraph)"
                  class="project__description--para"
                ></div>

                <div class="project__description--links">
                  <!-- GitHub link -->
                  <a
                    v-if="project.data.github_link"
                    :href="project.data.github_link"
                    class="project__description--link"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                  >
                    <i class="bx bxl-github" />
                  </a>

                  <!-- Website link -->
                  <a
                    v-if="project.data.website_link"
                    :href="project.data.website_link"
                    class="project__description--link"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                  >
                    <i class="bx bx-link" />
                  </a>

                  <noscript>
                    <a href="https://github.com/matthijsblauw" class="project__description--link">GitHub</a>
                    <a href="https://www.matthijsblauw.nl" class="project__description--link">Website</a>
                  </noscript>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';
import { asHTML } from '@prismicio/helpers'
import { PrismicImage } from '@prismicio/vue'
export default {
  name: "ProjectsComponent",
  components: {
    PrismicImage
  },
  data() {
    return {
      projects: [],
      isLoading: true,
      techFilters: [
        { label: "Alle", value: "all" },
        { label: "Vue.js", value: "vue" },
        { label: "SvelteKit", value: "svelte" },
        { label: "Laravel", value: "laravel" },
        { label: "WordPress", value: "wordpress" },
        { label: "React", value: "react" },
        { label: "Ionic", value: "ionic" },
        { label: "AI", value: "ai" },
      ],
      activeFilter: "all",
      projectTechMap: {
        "portfolio": ["vue"],
        "ilojo": ["svelte"],
        "weather": ["svelte"],
        "steeds": ["vue"],
        "luckywear": ["vue"],
        "lucky": ["vue"],
        "floris": ["wordpress"],
        "gv-westfriesland": ["wordpress"],
        "gv westfriesland": ["wordpress"],
        "bulbmanager": ["laravel", "vue", "ai"],
        "bijfluit": ["ionic"],
        "wijn": ["ionic"],
        "e-commerce": ["react"],
        "jbe": ["vue"],
        "visitekaartje": ["svelte"],
        "profile": ["svelte"],
      },
    };
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === "all") return this.projects;
      return this.projects.filter(project => {
        const title = (project.data.project_title?.[0]?.text || "").toLowerCase();
        for (const [keyword, techs] of Object.entries(this.projectTechMap)) {
          if (title.includes(keyword) && techs.includes(this.activeFilter)) {
            return true;
          }
        }
        return false;
      });
    },
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    asHTML,
    setFilter(value) {
      this.activeFilter = value;
    },
    toSlug(text) {
      return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    },
    goToProject(project) {
      const slug = project.uid || this.toSlug(project.data.project_title?.[0]?.text || '') || project.id;
      this.$router.push({ name: 'ProjectDetail', params: { slug } });
    },
    async fetchProjects() {
      try {
        const apiEndpoint = 'https://portfolio-matthijs.cdn.prismic.io/api/v2';
        const api = await Prismic.api(apiEndpoint);
        const response = await api.query(Prismic.Predicates.at('document.type', 'projects'));

        // Sort projects based on last_publication_date
        const sortedProjects = response.results.sort((a, b) => {
          return new Date(b.last_publication_date) - new Date(a.last_publication_date);
        });

        this.projects = sortedProjects;
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching data from Prismic:', error);
      }
    },
  },
};

</script>

<style scoped>
/* PROJECTEN */
.project__img {
  width: 100%;
  transition: all 500ms ease;
}

.project__wrapper {
  display: flex;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.45);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.project__wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-project-overlay);
  opacity: 0;
  transition: opacity 450ms ease;
  z-index: 2;
}

.project:hover .project__wrapper::before {
  opacity: 0.7;
}

.project:hover .project__img {
  transform: scale(1.07);
  filter: blur(5px);
}

.project__list {
  padding-top: 40px;
  padding-left: 0 !important;

}
.project:hover .project__description {
  opacity: 1;
  transform: translateY(-50%);
}
.project__description {
  position: absolute;
  top: 50%;
  left: 32px;
  transform: translateY(100%);
  max-width: 550px;
  z-index: 3;
  opacity: 0;
  transition: transform 450ms, opacity 300ms;
}

.project__description--title{
  font-size: 38px;
  margin-bottom: 8px;
}
.project__description--para {
  margin: 16px 0;
  display: none;
}

.project__description--link {
  font-size: 30px;
  margin-right: 16px;
}

.project__description--title,
.project__description--sub-title,
.project__description--para,
.project__description--link {
  text-align: left;
  color: #fff;
}

.project__description--title :deep(*),
.project__description--sub-title :deep(*),
.project__description--para :deep(*) {
  color: #fff;
}

.project {
  margin-bottom: 80px;
}

.project:last-child {
  margin-bottom: 40px;
}

h3{
  text-align: left !important;
  color: #fff;
}

/* SM (for tablets - screens ≥ than 768px wide) */
@media (width >= 768px) {
  .project__description  {
    left: 90px!important;
  }


  .project__description--para {
    display: block;
  }

  .project__description {
    padding: 0;
    left: 0;
    width: 100%;
  }

  .project__description--title {
    font-size: 32px;
    line-height: 1;
  }

  .project__description--sub-title h4{
    margin: 12px 0;
  }
}

.project__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.filter__btn {
  padding: 8px 16px;
  border: 2px solid var(--color-blue);
  border-radius: 25px;
  background: transparent;
  color: var(--color-blue);
  font-size: 14px;
  cursor: pointer;
  transition: all 300ms ease;
  font-family: "Lato", sans-serif;
}

.filter__btn:hover {
  background: var(--color-blue);
  color: #fff;
}

.filter__btn--active {
  background: var(--color-blue);
  color: #fff;
}

</style>