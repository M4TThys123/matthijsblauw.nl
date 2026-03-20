<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { watIkBouw } from '@/data/portfolio-chart-data'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

export default {
  name: 'WatIkBouwPieChart',
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: watIkBouw.labels,
        datasets: [{
          data: watIkBouw.data,
          backgroundColor: watIkBouw.kleuren,
          borderWidth: 2,
          borderColor: '#fff',
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Wat ik bouw', font: { size: 16 } },
          legend: { position: 'bottom' },
        },
      }
    }
  }
}
</script>
<style scoped>
.chart-container { position: relative; height: 350px; width: 100%; }
</style>
