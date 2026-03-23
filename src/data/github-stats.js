/**
 * Gedeelde GitHub stats service
 * Fetcht één keer, cached het resultaat, alle componenten gebruiken dezelfde data.
 */

const GITHUB_USERNAME = 'M4TThys123'
const GITHUB_TOKEN = process.env.VUE_APP_GITHUB_TOKEN || ''
const BM_COMMITS = 653
const BM_BRANCHES = 150

let cachedResult = null
let fetchPromise = null

function ghFetch(url) {
  const headers = {}
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  return fetch(url, { headers })
}

async function fetchGitHubStats() {
  if (cachedResult) return cachedResult
  if (fetchPromise) return fetchPromise

  fetchPromise = (async () => {
    try {
      const reposRes = await ghFetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      )
      const repos = await reposRes.json()

      if (!Array.isArray(repos)) return getFallback()

      const ownRepos = repos.filter(r => !r.fork)
      let ghCommits = 0
      let ghBranches = 0
      const weeklyData = []

      // Fetch alle repos parallel (veel sneller dan sequentieel)
      const statsPromises = ownRepos.map(async (repo) => {
        let commits = 0
        let branches = 0
        const repoWeekly = []

        // Contributors
        let res = await ghFetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`
        )
        if (res.status === 202) {
          await new Promise(r => setTimeout(r, 1500))
          res = await ghFetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`
          )
        }
        if (res.status === 200) {
          const contributors = await res.json()
          if (Array.isArray(contributors)) {
            const me = contributors.find(
              c => c.author && c.author.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()
            )
            if (me) {
              commits = me.total
              if (me.weeks) {
                me.weeks.forEach(week => {
                  if (week.c > 0) repoWeekly.push({ timestamp: week.w, commits: week.c })
                })
              }
            }
          }
        }

        // Branches
        const branchRes = await ghFetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/branches?per_page=100`
        )
        if (branchRes.status === 200) {
          const branchData = await branchRes.json()
          if (Array.isArray(branchData)) branches = branchData.length
        }

        return { commits, branches, weekly: repoWeekly }
      })

      const results = await Promise.all(statsPromises)
      results.forEach(r => {
        ghCommits += r.commits
        ghBranches += r.branches
        weeklyData.push(...r.weekly)
      })

      cachedResult = {
        ghCommits,
        ghBranches,
        ghRepos: ownRepos.length,
        totalCommits: BM_COMMITS + ghCommits,
        totalBranches: BM_BRANCHES + ghBranches,
        weeklyData,
        loaded: true,
      }

      return cachedResult
    } catch (e) {
      return getFallback()
    }
  })()

  return fetchPromise
}

function getFallback() {
  cachedResult = {
    ghCommits: 0,
    ghBranches: 0,
    ghRepos: 0,
    totalCommits: BM_COMMITS,
    totalBranches: BM_BRANCHES,
    weeklyData: [],
    loaded: true,
  }
  return cachedResult
}

export { fetchGitHubStats, BM_COMMITS, BM_BRANCHES, GITHUB_USERNAME }
