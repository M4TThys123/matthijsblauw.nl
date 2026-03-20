<template>
  <section>
    <section v-if="isLoading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </section>


    <section>
      <div v-for="project in projects" :key="project.uid">

        <PrismicImage :field="project.data.project_image" />

        <div v-html="asHTML(project.data.project_title)"></div>
        <div v-html="asHTML(project.data.sub_title)"></div>

        <div v-html="asHTML(project.data.project_paragraph)"></div>

        <p> {{ project.data.github_link}}</p>
        <p> {{ project.data.website_link}}</p>
      </div>
    </section>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';
import { asHTML } from '@prismicio/helpers'
import { PrismicImage } from '@prismicio/vue'

export default {
  name: "PrismicData",
  components: {
    PrismicImage
  },
  data() {
    return {
      projects: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    asHTML,
    async fetchProjects() {
      try {
        const apiEndpoint = 'https://portfolio-matthijs.cdn.prismic.io/api/v2';
        const api = await Prismic.api(apiEndpoint);
        const response = await api.query(Prismic.Predicates.at('document.type', 'projects'));

        this.projects = response.results;
        console.log(this.projects)

        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching data from Prismic:', error);
      }
    },
  },
};
</script>

<style scoped>

</style>