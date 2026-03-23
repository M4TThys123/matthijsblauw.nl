<template>
  <div>
    <AboutComponent />
    <MarqueeTrack />
    <ProjectsHighlight />
    <StatsSection />

    <!-- Skills preview + link naar statistieken -->
    <section class="home-chart-preview">
      <div class="home-chart-preview__inner">
        <h2 class="section__title">Mijn <span class="text--blue">Skills</span></h2>
        <div class="home-chart-preview__chart">
          <SkillsRadarChart />
        </div>
        <router-link to="/charts" class="home-chart-preview__link">
          Bekijk alle statistieken
          <i class="bx bx-right-arrow-alt"></i>
        </router-link>
      </div>
    </section>

    <TechStackComponent />
    <HobbiesComponent />
    <OverMijComponent />
  </div>
</template>
<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutComponent from "@/components/About.vue";
import MarqueeTrack from "@/components/MarqueeTrack.vue";
import ProjectsHighlight from "@/components/ProjectsHighlight.vue";
import StatsSection from "@/components/StatsSection.vue";
import SkillsRadarChart from "@/components/charts/SkillsRadarChart.vue";
import TechStackComponent from "@/components/TechStack.vue";
import HobbiesComponent from "@/components/Hobbies.vue";
import OverMijComponent from "@/components/OverMij.vue";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "HomePage",
  components: { AboutComponent, MarqueeTrack, ProjectsHighlight, StatsSection, SkillsRadarChart, TechStackComponent, HobbiesComponent, OverMijComponent },
  mounted() {
    this.$nextTick(() => {
      // Skills Radar chart: scale + slight rotation
      const chartCard = this.$el.querySelector(".home-chart-preview__chart");
      const chartLink = this.$el.querySelector(".home-chart-preview__link");

      if (chartCard) {
        gsap.from(chartCard, {
          scale: 0.85,
          rotation: -3,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: chartCard, start: "top 80%", once: true },
        });
      }

      if (chartLink) {
        gsap.from(chartLink, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: { trigger: chartCard, start: "top 80%", once: true },
        });
      }

      // Universal section title fade-up (skip #about-me which has its own CSS animation)
      const titles = this.$el.querySelectorAll(".section__title");
      titles.forEach((title) => {
        if (title.closest("#about-me")) return;
        gsap.from(title, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: title, start: "top 88%", once: true },
        });
      });
    });
  },
  beforeUnmount() {
    ScrollTrigger.getAll().forEach(st => {
      if (this.$el && this.$el.contains(st.trigger)) st.kill();
    });
  },
}
</script>

<style scoped>
.home-chart-preview {
  padding: 60px 24px;
}

.home-chart-preview__inner {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.home-chart-preview__chart {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px var(--color-card-shadow);
  margin: 20px 0 24px;
}

.home-chart-preview__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-blue);
  font-weight: 700;
  font-size: 16px;
  transition: gap 300ms ease;
}

.home-chart-preview__link:hover {
  gap: 12px;
}

.home-chart-preview__link i {
  font-size: 20px;
}
</style>
