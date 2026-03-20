<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { skillsGroei } from '@/data/portfolio-chart-data'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'SkillsGroeiChart',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: skillsGroei.labels,
        datasets: skillsGroei.datasets.map(ds => ({
          ...ds,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
        }))
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Skills Groei (2019 — 2026)', font: { size: 16 } },
          legend: { position: 'bottom' },
        },
        scales: {
          y: { beginAtZero: true, max: 100, title: { display: true, text: 'Niveau' } },
        },
      }
    }
  }
}
</script>
<style scoped>
.chart-container { position: relative; height: 350px; width: 100%; }
</style>
