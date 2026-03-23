<template>
  <section id="over-mij" class="py-4">
    <div class="container-class">
      <div class="row-class">
        <h2 class="section__title">
          Meer over
          <span class="text--blue">mij</span>
        </h2>

        <div class="over-mij__content">
          <div class="over-mij__block">
            <h3 class="over-mij__subtitle">Achtergrond</h3>
            <p class="over-mij__para">
              Ik ben begonnen met <strong>Communicatie & Multimedia Design</strong> aan de Hogeschool van Amsterdam,
              waar ik alles leerde over design, UX en digitale communicatie. Daarna heb ik de
              <strong>Frontend Design & Development</strong> afgerond, waarmee ik
              de brug sloeg van ontwerp naar code. Vervolgens ben ik aan de slag gegaan als software developer
              en doorgegroeid naar een medior fullstack rol — inclusief AI, backend en mobiele apps.
            </p>
          </div>

          <div class="over-mij__block">
            <h3 class="over-mij__subtitle">Wat ik doe</h3>
            <p class="over-mij__para">
              Bij mijn huidige werkgever ben ik solo verantwoordelijk voor het volledige AI-platform — van chatbots
              en data-analyse tools tot workflow automation. Wat begon in een team van vier, draai ik nu volledig zelf.
            </p>
            <p class="over-mij__para">
              Daarnaast bouw ik in mijn vrije tijd aan eigen projecten: van een wijn-app tot websites voor
              sportverenigingen en bedrijven. Ik ben altijd op zoek naar de volgende uitdaging.
            </p>
          </div>

          <div class="over-mij__block">
            <h3 class="over-mij__subtitle">Waar ik voor sta</h3>
            <ul class="over-mij__list">
              <li>Van concept tot productie — design én development</li>
              <li>Alles wat ik aanpak, pak ik serieus aan</li>
              <li>Altijd bezig met leren en groeien</li>
              <li>Momenteel specialiseer ik me in AI en hoe je daarmee innovatieve oplossingen bouwt</li>
            </ul>
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
  name: "OverMijComponent",
  mounted() {
    this.$nextTick(() => {
      const blocks = this.$el.querySelectorAll(".over-mij__block");
      const distance = window.innerWidth < 480 ? 25 : 50;
      blocks.forEach((block, i) => {
        gsap.from(block, {
          x: i % 2 === 0 ? -distance : distance,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            once: true,
          },
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
.over-mij__content {
  margin-top: 20px;
}

.over-mij__block {
  margin-bottom: 32px;
}

.over-mij__subtitle {
  color: var(--color-blue);
  font-size: 22px;
  margin-bottom: 12px;
  text-align: left;
}

.over-mij__para {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
  text-align: left;
}

.over-mij__list {
  list-style-type: none;
  padding: 0;
}

.over-mij__list li {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  padding-left: 20px;
  position: relative;
  margin-bottom: 8px;
  text-align: left;
}

.over-mij__list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-blue);
  font-weight: bold;
}
</style>
