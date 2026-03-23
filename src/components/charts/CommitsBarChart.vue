<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div class="chart-filter">
        <label for="period-filter">Periode:</label>
        <select id="period-filter" v-model="selectedPeriod" @change="updateChart">
          <option v-for="option in periodOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <span v-if="isLoading" class="chart-loading">
        <span class="chart-loading__spinner"></span> GitHub laden...
      </span>
    </div>
    <div class="chart-container">
      <Bar :data="filteredChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { commitsPerMaand } from '@/data/portfolio-chart-data'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const GITHUB_USERNAME = 'M4TThys123'
const GITHUB_TOKEN = process.env.VUE_APP_GITHUB_TOKEN || ''
const MONTH_NAMES = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']

function ghFetch(url) {
  const headers = {}
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  }
  return fetch(url, { headers })
}

export default {
  name: 'CommitsBarChart',
  components: { Bar },

  data() {
    return {
      isLoading: true,
      githubWeeklyData: [],
      selectedPeriod: '2y',
      periodOptions: [
        { label: 'Laatste jaar', value: '1y' },
        { label: 'Laatste 2 jaar', value: '2y' },
        { label: 'Laatste 3 jaar', value: '3y' },
        { label: 'Alles', value: 'all' },
      ],
      // Static Bulbmanager data (private repo, not on GitHub)
      bulbmanagerData: {
        startDate: '2024-05',
        monthly: commitsPerMaand.datasets[0].data,
        labels: commitsPerMaand.labels,
      },
      heftruckData: {
        startDate: '2024-05',
        monthly: commitsPerMaand.datasets[1].data,
        labels: commitsPerMaand.labels,
      },
    }
  },

  computed: {
    filteredChartData() {
      const { labels, bulbmanager, heftruck, github } = this.getFilteredData()
      const totalCommits = bulbmanager.reduce((a, b) => a + b, 0)
        + heftruck.reduce((a, b) => a + b, 0)
        + github.reduce((a, b) => a + b, 0)

      // Update title dynamically
      this.updateTitle(totalCommits)

      return {
        labels,
        datasets: [
          {
            label: 'Bulbmanager Web',
            data: bulbmanager,
            backgroundColor: '#4983fb',
            borderColor: '#4983fb',
          },
          {
            label: 'Heftruck App',
            data: heftruck,
            backgroundColor: '#10b981',
            borderColor: '#10b981',
          },
          {
            label: 'GitHub (publiek)',
            data: github,
            backgroundColor: '#f97316',
            borderColor: '#f97316',
          },
        ],
      }
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Commits per Maand',
            font: { size: 16 },
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#242424',
          },
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              afterBody: (items) => {
                const total = items.reduce((sum, item) => sum + item.raw, 0)
                return `Totaal: ${total}`
              },
            },
          },
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true },
        },
      }
    },
  },

  mounted() {
    this.fetchGitHubData()
  },

  methods: {
    async fetchGitHubData() {
      this.isLoading = true

      try {
        // Step 1: Get all repos (authenticated = 5000 req/hr)
        const reposRes = await ghFetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        )
        const repos = await reposRes.json()

        if (!Array.isArray(repos)) {
          this.isLoading = false
          return
        }

        // Step 2: For each non-fork repo, get contributor stats (weekly data, all-time)
        // GitHub stats API returns 202 on first request (computing), retry once after 2s
        const ownRepos = repos.filter(r => !r.fork)
        const fetchStats = async (repo) => {
          let res = await ghFetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`
          )
          // 202 = GitHub is computing stats, retry once
          if (res.status === 202) {
            await new Promise(r => setTimeout(r, 2000))
            res = await ghFetch(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`
            )
          }
          return res.status === 200 ? res.json() : []
        }
        const weeklyPromises = ownRepos.map(repo =>
          fetchStats(repo).catch(() => [])
        )

        const allStats = await Promise.all(weeklyPromises)

        // Step 3: Aggregate weekly commit data
        const weeklyData = []
        allStats.forEach(contributors => {
          if (!Array.isArray(contributors)) return
          const me = contributors.find(
            c => c.author && c.author.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()
          )
          if (me && me.weeks) {
            me.weeks.forEach(week => {
              if (week.c > 0) {
                weeklyData.push({ timestamp: week.w, commits: week.c })
              }
            })
          }
        })

        this.githubWeeklyData = weeklyData
      } catch (e) {
        console.error('GitHub API error:', e)
      }

      this.isLoading = false
    },

    getFilteredData() {
      const now = new Date()
      let startDate

      switch (this.selectedPeriod) {
        case '1y':
          startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1)
          break
        case '2y':
          startDate = new Date(now.getFullYear() - 2, now.getMonth(), 1)
          break
        case '3y':
          startDate = new Date(now.getFullYear() - 3, now.getMonth(), 1)
          break
        case 'all':
          startDate = new Date(2019, 0, 1)
          break
        default:
          startDate = new Date(now.getFullYear() - 2, now.getMonth(), 1)
      }

      // Generate month labels from startDate to now
      const labels = []
      const monthKeys = []
      const d = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      while (d <= now) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        const label = `${MONTH_NAMES[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`
        labels.push(label)
        monthKeys.push(key)
        d.setMonth(d.getMonth() + 1)
      }

      // Map Bulbmanager static data to month keys
      const bmStartYear = 2024
      const bmStartMonth = 5 // May
      const bmMonthly = {}
      const htMonthly = {}
      this.bulbmanagerData.monthly.forEach((val, i) => {
        const m = bmStartMonth + i
        const year = bmStartYear + Math.floor((m - 1) / 12)
        const month = ((m - 1) % 12) + 1
        const key = `${year}-${String(month).padStart(2, '0')}`
        bmMonthly[key] = val
      })
      this.heftruckData.monthly.forEach((val, i) => {
        const m = bmStartMonth + i
        const year = bmStartYear + Math.floor((m - 1) / 12)
        const month = ((m - 1) % 12) + 1
        const key = `${year}-${String(month).padStart(2, '0')}`
        htMonthly[key] = val
      })

      // Aggregate GitHub weekly data to months
      const ghMonthly = {}
      this.githubWeeklyData.forEach(({ timestamp, commits }) => {
        const date = new Date(timestamp * 1000)
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        ghMonthly[key] = (ghMonthly[key] || 0) + commits
      })

      // Build arrays matching the labels
      const bulbmanager = monthKeys.map(key => bmMonthly[key] || 0)
      const heftruck = monthKeys.map(key => htMonthly[key] || 0)
      const github = monthKeys.map(key => ghMonthly[key] || 0)

      return { labels, bulbmanager, heftruck, github }
    },

    updateTitle(total) {
      // Will be reflected via chartOptions computed
      this._totalCommits = total
    },

    updateChart() {
      // Triggers reactivity via selectedPeriod change → filteredChartData recomputes
    },
  },
}
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.chart-filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-filter label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary, #555);
}

.chart-filter select {
  padding: 6px 12px;
  border: 2px solid var(--color-border, #e2e5e9);
  border-radius: 8px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #242424);
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;
}

.chart-filter select:focus {
  border-color: var(--color-blue, #14539A);
}

.chart-loading {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-muted, #888);
}

.chart-loading__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--color-border, #e2e5e9);
  border-top-color: var(--color-blue, #14539A);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.chart-container {
  position: relative;
  height: 350px;
  width: 100%;
}
</style>
