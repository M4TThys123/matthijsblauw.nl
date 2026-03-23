/**
 * Gedeelde GitHub stats service
 * Fetcht één keer, cached het resultaat, alle componenten gebruiken dezelfde data.
 */

const GITHUB_USERNAME = 'M4TThys123'
const GITHUB_TOKEN = process.env.VUE_APP_GITHUB_TOKEN || ''
const BM_COMMITS = 653
const BM_BRANCHES = 150

// DEBUG logging
console.log('=== GITHUB STATS SERVICE INIT ===')
console.log('Token aanwezig:', !!GITHUB_TOKEN)
console.log('Token lengte:', GITHUB_TOKEN.length)
console.log('Token preview:', GITHUB_TOKEN ? GITHUB_TOKEN.substring(0, 15) + '...' : 'GEEN TOKEN')
console.log('process.env.VUE_APP_GITHUB_TOKEN:', process.env.VUE_APP_GITHUB_TOKEN ? 'SET' : 'UNDEFINED')
console.log('================================')

let cachedResult = null
let fetchPromise = null

function ghFetch(url) {
  const headers = {}
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  console.log(`[GH] Fetch: ${url.replace('https://api.github.com/', '')} | Auth: ${!!GITHUB_TOKEN}`)
  return fetch(url, { headers })
}

async function fetchGitHubStats() {
  console.log('[GH] fetchGitHubStats() aangeroepen')

  // Return cache als het er al is
  if (cachedResult) {
    console.log('[GH] Cache hit, return cached result:', cachedResult)
    return cachedResult
  }

  // Return bestaande promise als er al een fetch loopt
  if (fetchPromise) {
    console.log('[GH] Fetch al bezig, return bestaande promise')
    return fetchPromise
  }

  fetchPromise = (async () => {
    try {
      console.log('[GH] Start: repos ophalen...')
      const reposRes = await ghFetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      )
      console.log('[GH] Repos response status:', reposRes.status)

      const repos = await reposRes.json()
      console.log('[GH] Repos response type:', Array.isArray(repos) ? 'Array' : typeof repos)

      if (!Array.isArray(repos)) {
        console.error('[GH] FOUT: repos is geen array:', repos)
        return getFallback()
      }

      const ownRepos = repos.filter(r => !r.fork)
      console.log(`[GH] ${repos.length} repos totaal, ${ownRepos.length} eigen (non-fork)`)
      console.log('[GH] Repo namen:', ownRepos.map(r => r.name).join(', '))

      let ghCommits = 0
      let ghBranches = 0
      const weeklyData = []

      for (const repo of ownRepos) {
        // Commits + weekly data
        let res = await ghFetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`
        )
        console.log(`[GH] ${repo.name} contributors status: ${res.status}`)

        if (res.status === 202) {
          console.log(`[GH] ${repo.name} → 202 (computing), retry in 2s...`)
          await new Promise(r => setTimeout(r, 2000))
          res = await ghFetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`
          )
          console.log(`[GH] ${repo.name} retry status: ${res.status}`)
        }

        if (res.status === 200) {
          const contributors = await res.json()
          if (Array.isArray(contributors)) {
            const me = contributors.find(
              c => c.author && c.author.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()
            )
            if (me) {
              console.log(`[GH] ${repo.name}: ${me.total} commits`)
              ghCommits += me.total
              if (me.weeks) {
                me.weeks.forEach(week => {
                  if (week.c > 0) {
                    weeklyData.push({ timestamp: week.w, commits: week.c })
                  }
                })
              }
            } else {
              console.log(`[GH] ${repo.name}: gebruiker niet gevonden in contributors`)
            }
          }
        } else {
          console.warn(`[GH] ${repo.name}: contributors failed (${res.status})`)
        }

        // Branches
        const branchRes = await ghFetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/branches?per_page=100`
        )
        if (branchRes.status === 200) {
          const branches = await branchRes.json()
          if (Array.isArray(branches)) {
            console.log(`[GH] ${repo.name}: ${branches.length} branches`)
            ghBranches += branches.length
          }
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

      console.log('=== GITHUB STATS RESULT ===')
      console.log('GH commits:', ghCommits)
      console.log('GH branches:', ghBranches)
      console.log('GH repos:', ownRepos.length)
      console.log('Totaal commits (BM+GH):', cachedResult.totalCommits)
      console.log('Totaal branches (BM+GH):', cachedResult.totalBranches)
      console.log('Weekly data points:', weeklyData.length)
      console.log('===========================')

      return cachedResult
    } catch (e) {
      console.error('[GH] FETCH ERROR:', e)
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
