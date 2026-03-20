<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { commitsPerMaand } from '@/data/portfolio-chart-data'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'CommitsBarChart',
  components: { Bar },
  data() {
    return {
      chartData: commitsPerMaand,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Commits per Maand (653 totaal)', font: { size: 16 } },
          legend: { position: 'bottom' },
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true },
        },
      }
    }
  }
}
</script>
<style scoped>
.chart-container { position: relative; height: 350px; width: 100%; }
</style>
