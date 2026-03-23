<template>
  <section id="techstack" class="py-4">
    <div class="container-class">
      <div class="row-class">
        <h2 class="section__title mb-6">
          Dit is mijn
          <span class="text--blue">Tech-Stack</span>
        </h2>

        <section class="technologien mb-12">
          <h3 class="tech-title">Essentiële Webtechnologieën</h3>
          <section class="language__list">
            <div class="language" v-for="tech in technologien" :key="tech.id">
              <figure class="language__img--wrapper">
                <img :src="`/images/icons/${tech.url}`" alt="" class="language__img">
              </figure>
              <span class="language__name">{{ tech.name }}</span>
            </div>
          </section>
        </section>
        <section class="tools mb-12">
          <h3 class="tech-title">Ontwerp- en Ontwikkeltools</h3>
          <section class="language__list">
            <div class="language" v-for="tool in tools" :key="tool.id">
              <figure class="language__img--wrapper">
                <img :src="`/images/icons/${tool.url}`" alt="" class="language__img">
              </figure>
              <span class="language__name">{{ tool.name }}</span>
            </div>
          </section>
        </section>
        <section class="frameworks mb-12">
          <h3>Framework</h3>
          <section class="language__list">
            <div class="language" v-for="framework in frameworks" :key="framework.id">
              <figure class="language__img--wrapper">
                <img :src="`/images/icons/${framework.url}`" alt="" class="language__img">
              </figure>
              <span class="language__name">{{ framework.name }}</span>
            </div>
          </section>
        </section>
        <section class="ai-tools mb-12">
          <h3>AI & Automation</h3>
          <section class="language__list">
            <div class="language" v-for="aiTool in aiTools" :key="aiTool.id">
              <figure class="language__img--wrapper">
                <img :src="`/images/icons/${aiTool.url}`" alt="" class="language__img">
              </figure>
              <span class="language__name">{{ aiTool.name }}</span>
            </div>
          </section>
        </section>
        <section class="libraries mb-12">
          <h3>Libraries & Packages</h3>
          <section class="language__list">
            <div class="language" v-for="library in libraries" :key="library.id">
              <figure class="language__img--wrapper">
                <img :src="`/images/icons/${library.url}`" alt="" class="language__img">
              </figure>
              <span class="language__name">{{ library.name }}</span>
            </div>
          </section>
        </section>
        <section class="platforms mb-12">
          <h3>Tools en Platforms</h3>
          <section class="language__list">
            <div class="language" v-for="platform in platforms" :key="platform.id">
              <figure class="language__img--wrapper">
                <img :src="`/images/icons/${platform.url}`" alt="" class="language__img">
              </figure>
              <span class="language__name">{{ platform.name }}</span>
            </div>
          </section>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TechStackComponent",
  data() {
    return {
      technologien: [
        {
          id: 1,
          name: "HTML",
          url: "HTML5.webp"
        },
        {
          id: 2,
          name: "CSS",
          url: "CSS.webp"
        },
        {
          id: 3,
          name: "JavaScript",
          url: "JavaScript.webp"
        },
        {
          id: 4,
          name: "TypeScript",
          url: "TypeScript.webp"
        },
        {
          id: 5,
          name: "C#",
          url: "CS.webp"
        },
        {
          id: 6,
          name: "SQL",
          url: "SQL.webp"
        },
        {
          id: 7,
          name: "PHP",
          url: "PHP.webp"
        },
        {
          id: 8,
          name: "Python",
          url: "Python.webp"
        },
      ],
      tools: [
        {
          id: 1,
          name: "Adobe XD",
          url: "Adobe_XD.webp"
        },
        {
          id: 2,
          name: "Adobe Illustrator",
          url: "Adobe_Illustrator.webp"
        },
        {
          id: 3,
          name: "Adobe Photoshop",
          url: "Adobe_Photoshop.webp"
        },
        {
          id: 4,
          name: "Webstorm",
          url: "Webstorm.webp"
        },
        {
          id: 5,
          name: "MySQL Workbench",
          url: "Workbench.webp"
        },
        {
          id: 6,
          name: "Docker Container",
          url: "Docker.webp"
        },
        {
          id: 7,
          name: "Figma",
          url: "Figma.svg"
        },
      ],
      frameworks: [
        {
          id: 1,
          name: "Svelte",
          url: "Svelte.webp"
        },
        {
          id: 2,
          name: "React",
          url: "React.webp"
        },
        {
          id: 3,
          name: "Vue.js",
          url: "Vue.webp"
        },
        {
          id: 4,
          name: ".NET",
          url: "Net.webp"
        },
        {
          id: 5,
          name: "Laravel",
          url: "Laravel.webp"
        },
        {
          id: 6,
          name: "Ionic",
          url: "Ionic.svg"
        },
      ],
      aiTools: [
        {
          id: 1,
          name: "n8n",
          url: "n8n.svg"
        },
        {
          id: 2,
          name: "Ollama",
          url: "Ollama.svg"
        },
        {
          id: 3,
          name: "Supabase",
          url: "Supabase.svg"
        },
        {
          id: 4,
          name: "Claude",
          url: "Claude.svg"
        },
        {
          id: 5,
          name: "ChatGPT",
          url: "ChatGPT.svg"
        },
      ],
      libraries: [
        { id: 1, name: "Vuetify", url: "Vuetify.svg" },
        { id: 2, name: "Three.js", url: "Threejs.svg" },
        { id: 3, name: "GSAP", url: "GSAP.svg" },
        { id: 4, name: "Bootstrap", url: "Bootstrap.svg" },
      ],
      platforms: [
        {
          id: 1,
          name: "Prismic.io",
          url: "Prismic.webp"
        },
        {
          id: 2,
          name: "Hygraph",
          url: "Hygraph.webp"
        },
        {
          id: 3,
          name: "WordPress",
          url: "WordPress.webp"
        },
        {
          id: 4,
          name: "Vercel",
          url: "Vercel.svg"
        },
        {
          id: 5,
          name: "GitHub",
          url: "GitHub.svg"
        },
      ],
    };
  }

}
</script>

<style scoped>

h3 {
  text-align: center;
  color: var(--color-text);
}

.language__name {
  color: var(--color-text);
}

.technologien .language__list > .language > .language__img--wrapper > img,
.platforms .language__list > .language > .language__img--wrapper > img{
border-radius: 15px;
}

/* TECH STACK */
.language__list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.language {
  width: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.language__img--wrapper {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 25px 6px;
}



.language__img {
  width: 100%;
  /* max-width: 100px; */
  transition: all 300ms;
}

.language:hover .language__img {
  filter: brightness(80%);
  opacity: 0.86;
  transform: scale(0.9);
}

.language__name {
  position: absolute;
  bottom: 0;
  transform: scale(0);
  transition: all 300ms;
  font-size: 20px;
  color: var(--color-text);
  background: var(--color-surface);
  padding: 2px 8px;
  border-radius: 4px;
}

.language:hover .language__name {
  transform: scale(1);
}

/* SM (for tablets - screens ≥ than 768px wide) */
@media (width >= 768px) {
  .language__img--wrapper {
    padding: 25px 8px;
  }
}



/* MD (for small laptops - screens ≥ than 992px wide) */
@media (width >= 992px) {
  .language__img--wrapper {
    padding: 25px 16px;
  }
}
</style>