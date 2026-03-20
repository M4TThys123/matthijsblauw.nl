<template>
  <section id="projects">
    <div class="container">
      <div class="row-class">
        <h1 class="section__title">
          Hier een aantal van mijn
          <span class="text--blue">projecten</span>
        </h1>
        <ul class="project__list">
          <li class="project">
            <div class="project__wrapper">
              <img src="./images/fdnd.png" class="project__img" alt="" />
              <div class="project__description">
                <h3 class="project__description--title">
                  GitHub Issue feacher for FDND
                </h3>
                <h4 class="project__description--sub-title">
                  HTML, CSS, JavaScript & GitHub GraphQL API
                </h4>
                <p class="project__description--para">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
                  asperiores eaque dolores saepe velit ut placeat suscipit iure
                  ratione quia.
                </p>
                <div class="project__description--links">
                  <a
                      href="https://github.com/M4TThys123/SPRINT-12-Proof-of-Concept"
                      class="project__description--link"
                      target="_blank"
                      rel="noreferrer"><i class="bx bxl-github" /></a
                  >
                  <a
                      href="https://sprint-12-proof-of-concept.herokuapp.com/"
                      class="project__description--link"
                      target="_blank"
                      rel="noreferrer"><i class="bx bx-link" /></a
                  >
                </div>
              </div>
            </div>
          </li>
          <li class="project">
            <div class="project__wrapper">
              <img
                  src="./images/visite-kaartje.png"
                  class="project__img"
                  alt=""
              />
              <div class="project__description">
                <h3 class="project__description--title">Visite Kaartje - V2</h3>
                <h4 class="project__description--sub-title">
                  HTML, CSS, clientside JavaScript & Rest API
                </h4>
                <p class="project__description--para">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
                  asperiores eaque dolores saepe velit ut placeat suscipit iure
                  ratione quia.
                </p>
                <div class="project__description--links">
                  <a
                      href="https://github.com/M4TThys123/SPRINT-7-Visitekaartje-V2"
                      class="project__description--link"
                      target="_blank"
                      rel="noreferrer"><i class="bx bxl-github" /></a
                  >
                  <a
                      href="https://m4tthys123.github.io/SPRINT-7-Visitekaartje-V2/"
                      class="project__description--link"
                      target="_blank"
                      rel="noreferrer"><i class="bx bx-link" /></a
                  >
                </div>
              </div>
            </div>
          </li>
          <li class="project">
            <div class="project__wrapper">
              <img src="./images/beyco.png" class="project__img" alt="" />
              <div class="project__description">
                <h3 class="project__description--title">Coffee page for Beyco</h3>
                <h4 class="project__description--sub-title">
                  HTML, CSS, JavaScript
                </h4>
                <p class="project__description--para">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
                  asperiores eaque dolores saepe velit ut placeat suscipit iure
                  ratione quia.
                </p>
                <div class="project__description--links">
                  <a
                      href="https://github.com/M4TThys123/SPRINT-5-Chippr-Beyco"
                      class="project__description--link"
                      target="_blank"
                      rel="noreferrer"><i class="bx bxl-github" /></a
                  >
                  <a
                      href="https://github.com/M4TThys123/SPRINT-5-Chippr-Beyco"
                      class="project__description--link"
                      target="_blank"
                      rel="noreferrer"><i class="bx bx-link" /></a
                  >
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProjectsComponent01"
}
</script>

<style scoped>
/* PROJECTEN */
.project__img {
  width: 100%;
  transition: all 500ms ease;
}

.project__wrapper {
  display: flex;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.45);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.project__wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #1c1d25;
  opacity: 0;
  transition: opacity 450ms ease;
  z-index: 2;
}

.project:hover .project__wrapper::before {
  opacity: 0.7;
}

.project:hover .project__img {
  transform: scale(1.07);
  filter: blur(5px);
}

.project__list {
  padding-top: 40px;
  padding-left: 0 !important;

}
.project:hover .project__description {
  opacity: 1;
  transform: translateY(-50%);
}
.project__description {
  position: absolute;
  top: 50%;
  left: 90px;
  transform: translateY(100%);
  max-width: 550px;
  z-index: 3;
  opacity: 0;
  transition: transform 450ms, opacity 300ms;
}

.project__description--title {
  font-size: 38px;
  margin-bottom: 8px;
}
.project__description--para {
  margin: 16px 0;
}
.project__description--link {
  font-size: 30px;
  margin-right: 16px;
}

.project__description--title,
.project__description--sub-title,
.project__description--para,
.project__description--link {
  text-align: left;
  color: #fff;
}

.project {
  margin-bottom: 80px;
}

.project:last-child {
  margin-bottom: 40px;
}
</style>