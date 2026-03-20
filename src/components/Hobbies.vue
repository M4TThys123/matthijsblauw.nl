<template>
  <section id="hobbies" class="container-class">
    <div class="row-class">
      <h2 class="section__title">
        Mijn <span class="text--blue">Hobby's</span>
      </h2>

      <div class="hobbies__grid">
        <div class="hobby__card" v-for="hobby in hobbies" :key="hobby.id">
          <div class="hobby__image" :style="hobby.image ? { backgroundImage: 'url(' + hobby.image + ')' } : {}">
            <span v-if="!hobby.image" class="hobby__placeholder-icon">
              <i class="bx bx-image"></i>
            </span>
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
export default {
  name: "HobbiesComponent",
  data() {
    return {
      hobbies: [
        { id: 1, name: "DJ'en & Feesten", description: "10+ optredens, eigen spullen, groeiende passie", image: "" },
        { id: 2, name: "Freerunning", description: "Instructeur bij meerdere verenigingen sinds 2019", image: "" },
        { id: 3, name: "Fitness", description: "Home gym gebouwd, dagelijks bezig", image: "" },
        { id: 4, name: "Longboarden", description: "Buiten cruisen en tricks leren", image: "" },
        { id: 5, name: "Reizen & Kamperen", description: "Nieuwe plekken ontdekken", image: "" },
        { id: 6, name: "Kanoën", description: "Op het water genieten", image: "" },
      ],
    };
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
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 300ms ease, box-shadow 300ms ease;
}

.hobby__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.hobby__image {
  width: 100%;
  height: 200px;
  background-color: #e8e8e8;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hobby__placeholder-icon {
  font-size: 48px;
  color: #bbb;
}

.hobby__info {
  padding: 16px;
}

.hobby__name {
  font-size: 18px;
  color: #242424;
  margin-bottom: 6px;
}

.hobby__description {
  font-size: 14px;
  color: #666;
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
