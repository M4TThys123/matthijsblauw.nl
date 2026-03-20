<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { furoraDemo } from '@/data/portfolio-chart-data'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'FuroraLineChart',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: furoraDemo.labels,
        datasets: furoraDemo.datasets.map(ds => ({
          ...ds,
          tension: 0.4,
          fill: false,
        }))
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Furora Machine Productie (Demo)', font: { size: 16 } },
          legend: { position: 'bottom' },
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Stelen / uur' } },
          x: { title: { display: true, text: 'Tijd' } },
        },
      }
    }
  }
}
</script>
<style scoped>
.chart-container { position: relative; height: 350px; width: 100%; }
</style>
