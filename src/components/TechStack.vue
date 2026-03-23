<template>
  <section id="techstack" class="py-4">
    <div class="container-class">
      <div class="row-class">
        <h2 class="section__title mb-6">
          Dit is mijn
          <span class="text--blue">Tech-Stack</span>
        </h2>

        <div class="ts__grid" ref="tsGrid">
          <div
            class="ts__card"
            v-for="(cat, i) in categories"
            :key="i"
            :class="{ 'ts__card--wide': cat.wide }"
          >
            <span class="ts__card-label">{{ cat.label }}</span>
            <div class="ts__pills">
              <div
                class="ts__pill"
                v-for="skill in cat.skills"
                :key="skill.name"
              >
                <img
                  v-if="skill.icon"
                  :src="`/images/icons/${skill.icon}`"
                  :alt="skill.name"
                  class="ts__pill-icon"
                />
                <span class="ts__pill-name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "TechStackComponent",
  data() {
    return {
      categories: [
        {
          label: "Talen & Markup",
          skills: [
            { name: "HTML", icon: "HTML5.webp" },
            { name: "CSS", icon: "CSS.webp" },
            { name: "JavaScript", icon: "JavaScript.webp" },
            { name: "TypeScript", icon: "TypeScript.webp" },
            { name: "PHP", icon: "PHP.webp" },
            { name: "Python", icon: "Python.webp" },
            { name: "C#", icon: "CS.webp" },
            { name: "SQL", icon: "SQL.webp" },
            { name: "GraphQL", icon: null },
            { name: "REST APIs", icon: null },
          ],
        },
        {
          label: "Frontend",
          skills: [
            { name: "Vue.js", icon: "Vue.webp" },
            { name: "React", icon: "React.webp" },
            { name: "SvelteKit", icon: "Svelte.webp" },
            { name: "Tailwind", icon: null },
            { name: "Vuetify", icon: "Vuetify.svg" },
            { name: "Bootstrap", icon: "Bootstrap.svg" },
            { name: "Three.js", icon: "Threejs.svg" },
            { name: "GSAP", icon: "GSAP.svg" },
            { name: "Chart.js", icon: null },
          ],
        },
        {
          label: "Backend & Data",
          skills: [
            { name: "Laravel", icon: "Laravel.webp" },
            { name: ".NET", icon: "Net.webp" },
            { name: "MySQL", icon: "Workbench.webp" },
            { name: "Supabase", icon: "Supabase.svg" },
            { name: "Ionic", icon: "Ionic.svg" },
            { name: "WebSocket", icon: null },
          ],
        },
        {
          label: "AI & Automation",
          skills: [
            { name: "n8n", icon: "n8n.svg" },
            { name: "Ollama", icon: "Ollama.svg" },
            { name: "Claude", icon: "Claude.svg" },
            { name: "ChatGPT", icon: "ChatGPT.svg" },
            { name: "LangChain", icon: null },
          ],
        },
        {
          label: "Design",
          skills: [
            { name: "Figma", icon: "Figma.svg" },
            { name: "Adobe XD", icon: "Adobe_XD.webp" },
            { name: "Illustrator", icon: "Adobe_Illustrator.webp" },
            { name: "Photoshop", icon: "Adobe_Photoshop.webp" },
          ],
        },
        {
          label: "DevOps & Tools",
          skills: [
            { name: "Git", icon: null },
            { name: "GitHub", icon: "GitHub.svg" },
            { name: "Docker", icon: "Docker.webp" },
            { name: "Vercel", icon: "Vercel.svg" },
            { name: "WebStorm", icon: "Webstorm.webp" },
            { name: "Mattermost", icon: null },
          ],
        },
        {
          label: "CMS & Platforms",
          wide: true,
          skills: [
            { name: "Prismic.io", icon: "Prismic.webp" },
            { name: "Hygraph", icon: "Hygraph.webp" },
            { name: "WordPress", icon: "WordPress.webp" },
          ],
        },
      ],
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.initScrollAnimations();
    });
  },

  beforeUnmount() {
    ScrollTrigger.getAll().forEach(st => {
      if (this.$el && this.$el.contains(st.trigger)) st.kill();
    });
  },

  methods: {
    initScrollAnimations() {
      const cards = this.$el.querySelectorAll(".ts__card");

      cards.forEach((card) => {
        const label = card.querySelector(".ts__card-label");
        const pills = card.querySelectorAll(".ts__pill");

        gsap.from(label, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(pills, {
          y: 20,
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        });
      });
    },
  },
};
</script>

<style scoped>
/* Grid */
.ts__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;
}

/* Card */
.ts__card {
  background: var(--color-surface);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 12px var(--color-card-shadow);
}

.ts__card--wide {
  grid-column: 1 / -1;
}

/* Category label */
.ts__card-label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-blue);
  margin-bottom: 14px;
}

/* Pills */
.ts__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ts__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 8px;
  background: var(--color-bg-alt);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  will-change: transform, opacity;
}

.ts__pill:hover {
  background: var(--color-blue);
  color: #fff;
  transform: scale(1.03);
}

.ts__pill:hover .ts__pill-icon {
  filter: brightness(0) invert(1);
}

/* Icon */
.ts__pill-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: filter 0.2s ease;
}

.ts__pill-name {
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 768px) {
  .ts__grid {
    grid-template-columns: 1fr;
  }

  .ts__card {
    padding: 20px;
  }

  .ts__pill {
    font-size: 13px;
    padding: 5px 12px;
  }

  .ts__pill-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
