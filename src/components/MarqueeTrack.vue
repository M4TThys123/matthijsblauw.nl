<template>
  <div class="marquee-track">
    <div class="marquee-track__inner">
      <div class="marquee-track__content">
        <span v-for="(item, index) in items" :key="'a-' + index" class="marquee-track__item">
          <i :class="'bx ' + item.icon + ' marquee-track__icon'"></i>
          <span class="marquee-track__text">{{ item.label }}</span>
          <span class="marquee-track__separator">&middot;</span>
        </span>
      </div>
      <div class="marquee-track__content" aria-hidden="true">
        <span v-for="(item, index) in items" :key="'b-' + index" class="marquee-track__item">
          <i :class="'bx ' + item.icon + ' marquee-track__icon'"></i>
          <span class="marquee-track__text">{{ item.label }}</span>
          <span class="marquee-track__separator">&middot;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGitHubStats, BM_COMMITS, BM_BRANCHES } from '@/data/github-stats'

export default {
  name: 'MarqueeTrack',
  data() {
    return {
      stats: null,
      items: [],
    };
  },
  created() {
    this.buildItems()
    this.loadStats()
  },
  methods: {
    buildItems() {
      const s = this.stats
      const totalCommits = s ? s.totalCommits : BM_COMMITS
      const totalBranches = s ? s.totalBranches : BM_BRANCHES
      const ghRepos = s ? s.ghRepos : 0

      this.items = [
        { label: `${totalCommits}+ Commits`, icon: 'bx-git-commit' },
        { label: `${totalBranches}+ Branches`, icon: 'bx-git-branch' },
        { label: ghRepos ? `${ghRepos}+ GitHub Repo's` : "GitHub Repo's laden...", icon: 'bxl-github' },
        { label: '12+ Live Projecten', icon: 'bx-code-block' },
        { label: '9 Klanten', icon: 'bx-group' },
        { label: '6+ AI Workflows', icon: 'bx-bot' },
        { label: '€253K Webshop Omzet', icon: 'bx-cart' },
        { label: '5+ Jaar Developer', icon: 'bx-time' },
      ]
    },
    async loadStats() {
      this.stats = await fetchGitHubStats()
      this.buildItems()
    },
  },
};
</script>

<style scoped>
.marquee-track {
  width: 100%;
  overflow: hidden;
  background: rgba(20, 83, 154, 0.06);
  border-top: 1px solid rgba(20, 83, 154, 0.1);
  border-bottom: 1px solid rgba(20, 83, 154, 0.1);
  padding: 18px 0;
  user-select: none;
}

.marquee-track__inner {
  display: flex;
  width: max-content;
  animation: marquee-scroll 35s linear infinite;
}

.marquee-track:hover .marquee-track__inner {
  animation-play-state: paused;
}

.marquee-track__content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.marquee-track__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-family: 'Lato', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.02em;
}

.marquee-track__icon {
  font-size: 1.3rem;
  color: var(--color-blue, #14539A);
}

.marquee-track__text {
  color: var(--color-text);
}

.marquee-track__separator {
  margin: 0 28px;
  font-size: 1.6rem;
  line-height: 1;
  color: rgba(20, 83, 154, 0.3);
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .marquee-track {
    padding: 14px 0;
  }

  .marquee-track__item {
    font-size: 0.88rem;
    gap: 6px;
  }

  .marquee-track__icon {
    font-size: 1.1rem;
  }

  .marquee-track__separator {
    margin: 0 18px;
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .marquee-track {
    padding: 10px 0;
  }

  .marquee-track__item {
    font-size: 0.78rem;
    gap: 5px;
  }

  .marquee-track__icon {
    font-size: 1rem;
  }

  .marquee-track__separator {
    margin: 0 12px;
    font-size: 1.1rem;
  }
}
</style>
