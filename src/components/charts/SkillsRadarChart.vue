<template>
  <div class="chart-container">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend } from 'chart.js'
import { skillsRadar } from '@/data/portfolio-chart-data'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend)

export default {
  name: 'SkillsRadarChart',
  components: { Radar },
  data() {
    return {
      chartData: {
        labels: skillsRadar.labels,
        datasets: [{
          label: 'Skill Level',
          data: skillsRadar.data,
          backgroundColor: skillsRadar.backgroundColor,
          borderColor: skillsRadar.borderColor,
          borderWidth: 2,
          pointBackgroundColor: skillsRadar.borderColor,
          pointRadius: 4,
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Skills Overzicht', font: { size: 16 } },
          legend: { display: false },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 },
          },
        },
      }
    }
  }
}
</script>
<style scoped>
.chart-container { position: relative; height: 350px; width: 100%; }
</style>
