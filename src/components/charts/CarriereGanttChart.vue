<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { carriereTijdlijn } from '@/data/portfolio-chart-data'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function dateToMonths(dateStr) {
  const [year, month] = dateStr.split('-').map(Number)
  return year * 12 + month
}

function monthsToLabel(months) {
  const year = Math.floor(months / 12)
  const month = months % 12
  const monthNames = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
  return `${monthNames[month - 1]} ${year}`
}

export default {
  name: 'CarriereGanttChart',
  components: { Bar },
  data() {
    const items = carriereTijdlijn
    const minMonth = Math.min(...items.map(i => dateToMonths(i.start)))
    const maxMonth = Math.max(...items.map(i => dateToMonths(i.eind)))

    return {
      chartData: {
        labels: items.map(i => i.naam),
        datasets: [{
          label: 'Periode',
          data: items.map(i => [dateToMonths(i.start) - minMonth, dateToMonths(i.eind) - minMonth]),
          backgroundColor: items.map(i => i.kleur),
          borderRadius: 4,
          borderSkipped: false,
        }]
      },
      chartOptions: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Carrière Tijdlijn', font: { size: 16 } },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                const item = items[context.dataIndex]
                return `${item.categorie}: ${item.start} — ${item.eind}`
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return monthsToLabel(value + minMonth)
              },
              maxTicksLimit: 10,
            },
            title: { display: true, text: 'Periode' },
          },
          y: {
            ticks: { font: { size: 11 } },
          },
        },
      }
    }
  }
}
</script>

<style scoped>
.chart-container { position: relative; height: 500px; width: 100%; }
</style>
