<template>
  <section ref="statsSection" class="stats-section">
    <div class="stats-section__grid">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stats-section__card"
        :class="{ 'stats-section__card--visible': hasAnimated }"
        :style="{ transitionDelay: index * 120 + 'ms' }"
      >
        <i :class="'bx ' + stat.icon + ' stats-section__icon'"></i>
        <span class="stats-section__number">
          {{ stat.prefix }}{{ animatedValues[index] }}{{ stat.suffix }}
        </span>
        <span class="stats-section__label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchGitHubStats, BM_COMMITS, BM_BRANCHES } from '@/data/github-stats'

export default {
  name: 'StatsSection',
  data() {
    return {
      hasAnimated: false,
      animatedValues: [0, 0, 0, 0],
      stats: [
        {
          target: BM_COMMITS,
          label: 'Totale commits',
          icon: 'bx-git-commit',
          prefix: '',
          suffix: '+',
        },
        {
          target: BM_BRANCHES,
          label: 'Branches',
          icon: 'bx-git-branch',
          prefix: '',
          suffix: '+',
        },
        {
          target: 253,
          label: 'Webshop omzet (jaar 1)',
          icon: 'bx-cart',
          prefix: '€',
          suffix: 'K',
        },
        {
          target: 9,
          label: 'Klanten',
          icon: 'bx-group',
          prefix: '',
          suffix: '',
        },
      ],
      observer: null,
    };
  },
  mounted() {
    this.loadStats()

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.startCounters();
            this.observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(this.$refs.statsSection);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async loadStats() {
      const s = await fetchGitHubStats()
      this.stats[0].target = s.totalCommits
      this.stats[1].target = s.totalBranches
      if (this.hasAnimated) {
        this.startCounters()
      }
    },

    startCounters() {
      const duration = 2000;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);

      this.stats.forEach((stat, index) => {
        let frame = 0;

        const counter = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * stat.target);

          this.animatedValues[index] = current;
          this.$forceUpdate();

          if (frame >= totalFrames) {
            this.animatedValues[index] = stat.target;
            this.$forceUpdate();
            clearInterval(counter);
          }
        }, frameDuration);
      });
    },
  },
};
</script>

<style scoped>
.stats-section {
  padding: 80px 24px;
  background: var(--color-bg-alt);
  font-family: 'Lato', sans-serif;
}

.stats-section__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  max-width: 1000px;
  margin: 0 auto;
}

.stats-section__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: var(--color-surface);
  border-radius: 14px;
  padding: 36px 20px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 12px var(--color-card-shadow);
  transform: translateY(24px) scale(0.95);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.3s ease;
}

.stats-section__card--visible {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.stats-section__card:hover {
  box-shadow: 0 6px 24px var(--color-card-shadow-hover);
}

.stats-section__icon {
  font-size: 2rem;
  color: var(--color-blue);
  margin-bottom: 12px;
  opacity: 0.8;
}

.stats-section__number {
  font-size: clamp(1.6rem, 5vw, 3rem);
  font-weight: 900;
  color: var(--color-blue);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stats-section__label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-top: 8px;
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .stats-section {
    padding: 56px 16px;
  }

  .stats-section__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stats-section__card {
    padding: 28px 16px;
  }

  .stats-section__number {
    font-size: 2.2rem;
  }

  .stats-section__label {
    font-size: 0.85rem;
  }
}

@media (max-width: 400px) {
  .stats-section__number {
    font-size: 1.8rem;
  }

  .stats-section__card {
    padding: 22px 12px;
  }
}
</style>
