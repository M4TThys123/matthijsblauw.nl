<template>
  <div class="container-class" style="margin-top: 100px;">
    <div class="row-class">
      <h1 class="section__title">Interactieve <span class="text--blue">Statistieken</span></h1>
      <p style="text-align: center; margin-bottom: 40px; color: var(--color-text-muted);">
        Data visualisaties over mijn carrière, skills en projecten — gebouwd met Chart.js.
      </p>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <SkillsRadarChart />
      </div>
      <div class="chart-card">
        <WatIkBouwPieChart />
      </div>
      <div class="chart-card">
        <CommitsBarChart />
      </div>
      <div class="chart-card">
        <SkillsGroeiChart />
      </div>
      <div class="chart-card">
        <HobbysBarChart />
      </div>
      <div class="chart-card">
        <FuroraLineChart />
      </div>
      <div class="chart-card chart-card--wide">
        <CarriereGanttChart />
      </div>
      <div class="chart-card chart-card--wide">
        <ProjectenGanttChart />
      </div>
    </div>
  </div>
</template>

<script>
import SkillsRadarChart from '@/components/charts/SkillsRadarChart.vue'
import WatIkBouwPieChart from '@/components/charts/WatIkBouwPieChart.vue'
import CommitsBarChart from '@/components/charts/CommitsBarChart.vue'
import SkillsGroeiChart from '@/components/charts/SkillsGroeiChart.vue'
import HobbysBarChart from '@/components/charts/HobbysBarChart.vue'
import FuroraLineChart from '@/components/charts/FuroraLineChart.vue'
import CarriereGanttChart from '@/components/charts/CarriereGanttChart.vue'
import ProjectenGanttChart from '@/components/charts/ProjectenGanttChart.vue'

export default {
  name: 'ChartsPage',
  components: {
    SkillsRadarChart,
    WatIkBouwPieChart,
    CommitsBarChart,
    SkillsGroeiChart,
    HobbysBarChart,
    FuroraLineChart,
    CarriereGanttChart,
    ProjectenGanttChart,
  }
}
</script>

<style scoped>
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 12px 60px;
}

.chart-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px var(--color-card-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-card-shadow-hover);
}

.chart-card--wide {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
