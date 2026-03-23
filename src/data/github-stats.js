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
  // Return cache als het er al is
  if (cachedResult) return cachedResult

  // Return bestaande promise als er al een fetch loopt
  if (fetchPromise) return fetchPromise

  fetchPromise = (async () => {
    try {
      const reposRes = await ghFetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      )
      const repos = await reposRes.json()

      if (!Array.isArray(repos)) {
        return getFallback()
      }

      const ownRepos = repos.filter(r => !r.fork)
      let ghCommits = 0
      let ghBranches = 0
      const weeklyData = []

      for (const repo of ownRepos) {
        // Commits + weekly data
        let res = await ghFetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`
        )
        if (res.status === 202) {
          await new Promise(r => setTimeout(r, 2000))
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
              ghCommits += me.total
              if (me.weeks) {
                me.weeks.forEach(week => {
                  if (week.c > 0) {
                    weeklyData.push({ timestamp: week.w, commits: week.c })
                  }
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
          const branches = await branchRes.json()
          if (Array.isArray(branches)) ghBranches += branches.length
        }
      }

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
      console.error('GitHub stats fetch error:', e)
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
