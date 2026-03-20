<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { hobbysBar } from '@/data/portfolio-chart-data'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'HobbysBarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: hobbysBar.labels,
        datasets: [{
          label: 'Jaren actief',
          data: hobbysBar.data,
          backgroundColor: hobbysBar.kleuren,
          borderRadius: 6,
        }]
      },
      chartOptions: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: "Hobby's — Jaren Actief", font: { size: 16 } },
          legend: { display: false },
        },
        scales: {
          x: { beginAtZero: true, title: { display: true, text: 'Jaren' } },
        },
      }
    }
  }
}
</script>
<style scoped>
.chart-container { position: relative; height: 300px; width: 100%; }
</style>
