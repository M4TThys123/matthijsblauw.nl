<template>
  <div class="container-class" style="margin-top: 100px;">
    <div class="row-class">
      <h1 class="section__title">Mijn <span class="text--blue">Werkervaring</span></h1>
      <p style="text-align: center; margin-bottom: 40px; color: #666;">
        Van junior frontend naar medior fullstack + AI developer.
      </p>
    </div>

    <div class="werkervaring-content">
      <!-- Tijdlijn -->
      <section class="we-section">
        <h2 class="we-title">Carrière Tijdlijn</h2>
        <div class="chart-card">
          <CarriereGanttChart />
        </div>
      </section>

      <!-- Werkervaring items -->
      <section class="we-section">
        <h2 class="we-title">Werkervaring</h2>

        <div class="we-item">
          <div class="we-item__header">
            <h3>Softwareontwikkelaar — Bulbmanager / Automated4U</h3>
            <span class="we-item__period">Mei 2024 — heden</span>
          </div>
          <p class="we-item__description">
            Fullstack developer, verantwoordelijk voor het complete AI-platform. Het plan was om samen te werken met een junior developer, helpdesk en review team, maar toen deze ondersteuning wegviel heb ik het volledige project zelfstandig opgepakt.
          </p>
          <div class="we-item__highlights">
            <span class="we-tag">AI Chatbot (IVY)</span>
            <span class="we-tag">DataAnalistAI</span>
            <span class="we-tag">Webshop (€253K omzet)</span>
            <span class="we-tag">Furora Dashboard</span>
            <span class="we-tag">Generiek Mail Component</span>
            <span class="we-tag">BKD OAuth</span>
            <span class="we-tag">Heftruck App (C#)</span>
            <span class="we-tag">653 commits</span>
            <span class="we-tag">150+ branches</span>
            <span class="we-tag">20+ klanten</span>
          </div>
        </div>

        <div class="we-item">
          <div class="we-item__header">
            <h3>Stagiair Frontend Development — Orderli</h3>
            <span class="we-item__period">Feb — Mei 2023 · Utrecht</span>
          </div>
          <p class="we-item__description">
            Dashboard responsive gemaakt, login-pagina verbeterd, navigatiebalk herontworpen, 2 bootloaders ontwikkeld voor Orderli HQ. Vue.js geleerd als nieuw framework.
          </p>
          <div class="we-item__highlights">
            <span class="we-tag">Vue.js</span>
            <span class="we-tag">API integratie</span>
            <span class="we-tag">Responsive design</span>
          </div>
        </div>

        <div class="we-item">
          <div class="we-item__header">
            <h3>Webbeheerder & Freerunning Trainer — SVW Steeds Voorwaarts</h3>
            <span class="we-item__period">Okt 2022 — heden</span>
          </div>
          <p class="we-item__description">
            Website ontwikkeld en onderhouden. Freerunning trainer.
          </p>
          <div class="we-item__highlights">
            <span class="we-tag">Vue.js</span>
            <span class="we-tag">Website development</span>
            <span class="we-tag">Coaching</span>
          </div>
        </div>

        <div class="we-item">
          <div class="we-item__header">
            <h3>Student Assistent — Hogeschool van Amsterdam</h3>
            <span class="we-item__period">Sep 2022 — heden</span>
          </div>
          <p class="we-item__description">
            Studenten begeleiden bij frontend development opdrachten.
          </p>
        </div>
      </section>

      <!-- Charts -->
      <section class="we-section">
        <h2 class="we-title">Projecten bij Bulbmanager</h2>
        <div class="chart-card">
          <ProjectenGanttChart />
        </div>
      </section>

      <section class="we-section">
        <h2 class="we-title">Commits per Maand</h2>
        <div class="chart-card">
          <CommitsBarChart />
        </div>
      </section>

      <section class="we-section">
        <h2 class="we-title">Skills Groei</h2>
        <div class="chart-card">
          <SkillsGroeiChart />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CarriereGanttChart from '@/components/charts/CarriereGanttChart.vue'
import ProjectenGanttChart from '@/components/charts/ProjectenGanttChart.vue'
import CommitsBarChart from '@/components/charts/CommitsBarChart.vue'
import SkillsGroeiChart from '@/components/charts/SkillsGroeiChart.vue'

export default {
  name: 'WerkervaringPage',
  components: {
    CarriereGanttChart,
    ProjectenGanttChart,
    CommitsBarChart,
    SkillsGroeiChart,
  }
}
</script>

<style scoped>
.werkervaring-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 12px 60px;
}

.we-section {
  margin-bottom: 48px;
}

.we-title {
  font-size: 28px;
  color: #14539A;
  margin-bottom: 20px;
  text-align: left;
}

.we-item {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid #14539A;
}

.we-item__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.we-item__header h3 {
  font-size: 18px;
  color: #242424;
  text-align: left;
}

.we-item__period {
  font-size: 14px;
  color: #888;
  white-space: nowrap;
}

.we-item__description {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 12px;
  text-align: left;
}

.we-item__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.we-tag {
  font-size: 12px;
  padding: 4px 10px;
  background: rgba(20, 83, 154, 0.08);
  color: #14539A;
  border-radius: 20px;
  font-weight: 600;
}

.chart-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

@media (max-width: 768px) {
  .we-item__header {
    flex-direction: column;
  }
  .we-title {
    font-size: 24px;
  }
}
</style>
