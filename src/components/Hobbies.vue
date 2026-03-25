<template>
  <section id="hobbies" class="container-class">
    <div class="row-class">
      <h2 class="section__title">
        Mijn <span class="text--blue">Hobby's</span>
      </h2>

      <div class="hobbies__grid">
        <div
          class="hobby__card"
          v-for="hobby in hobbies"
          :key="hobby.id"
          @mouseenter="hobby.video ? (hobby._hover = true) : null"
          @mouseleave="hobby._hover = false"
        >
          <div class="hobby__media">
            <!-- Video (speelt bij hover) -->
            <video
              v-if="hobby.video && hobby._hover"
              :src="hobby.video"
              class="hobby__video"
              autoplay
              loop
              muted
              playsinline
            ></video>
            <!-- Foto -->
            <div
              v-else
              class="hobby__image"
              :style="hobby.image ? { backgroundImage: 'url(' + hobby.image + ')' } : {}"
            >
              <span v-if="!hobby.image" class="hobby__placeholder-icon">
                <i class="bx bx-image"></i>
              </span>
              <span v-if="hobby.video" class="hobby__play-hint">
                <i class="bx bx-play"></i>
              </span>
            </div>
          </div>
          <div class="hobby__info">
            <h3 class="hobby__name">{{ hobby.name }}</h3>
            <p class="hobby__description">{{ hobby.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "HobbiesComponent",
  data() {
    return {
      hobbies: [
        { id: 1, name: "DJ'en & Feesten", description: "10+ optredens, eigen spullen, groeiende passie", image: "/images/hobbies/dj.jpg", video: "", _hover: false },
        { id: 2, name: "Freerunning", description: "Instructeur bij meerdere verenigingen sinds 2019", image: "/images/hobbies/freerunning.jpg", video: "", _hover: false },
        { id: 3, name: "Fitness", description: "Home gym gebouwd, dagelijks bezig", image: "/images/hobbies/fitness.jpg", video: "", _hover: false },
        { id: 4, name: "Longboarden", description: "Buiten cruisen en tricks leren", image: "/images/hobbies/longboarden.jpg", video: "", _hover: false },
        { id: 5, name: "Reizen & Kamperen", description: "Nieuwe plekken ontdekken", image: "/images/hobbies/reizen.jpg", video: "", _hover: false },
        { id: 6, name: "Kanoën", description: "Op het water genieten", image: "/images/hobbies/kanoen.jpg", video: "", _hover: false },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      const cards = this.$el.querySelectorAll(".hobby__card");
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: this.$el.querySelector(".hobbies__grid"),
          start: "top 80%",
          once: true,
        },
      });
    });
  },
  beforeUnmount() {
    ScrollTrigger.getAll().forEach(st => {
      if (this.$el && this.$el.contains(st.trigger)) st.kill();
    });
  },
};
</script>

<style scoped>
.hobbies__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 20px;
}

.hobby__card {
  background: var(--color-surface);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--color-card-shadow);
  transition: transform 300ms ease, box-shadow 300ms ease;
}

.hobby__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-card-shadow-hover);
}

.hobby__media {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.hobby__image {
  width: 100%;
  height: 100%;
  background-color: var(--color-placeholder);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hobby__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hobby__play-hint {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hobby__card:hover .hobby__play-hint {
  opacity: 1;
}

.hobby__placeholder-icon {
  font-size: 48px;
  color: var(--color-placeholder-icon);
}

.hobby__info {
  padding: 16px;
}

.hobby__name {
  font-size: 18px;
  color: var(--color-text);
  margin-bottom: 6px;
}

.hobby__description {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* Tablet */
@media (max-width: 768px) {
  .hobbies__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .hobbies__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
