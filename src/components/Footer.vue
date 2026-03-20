<template>
  <footer class="mt-5">
    <div class="container footer-container">
      <nav class="row">
        <a href="https://www.linkedin.com/in/matthijs-blauw-9a9573235/" class="col-6" target="_blank">
          <ProfileImage 
            alt-text="Image of Matthijs Blauw" 
            image-url="images/afbeelding_pak.png"
            />
        </a>
        <a href="https://www.matthijsblauw.nl/" class="col-6" target="_blank">
          <LogoImage alt-text="Logo of Matthijs Blauw" image-url="https://avatars.githubusercontent.com/u/70703948?v=4"></LogoImage>
        </a>
      </nav>

      <nav class="flex-row text-center">
        <h4>Links</h4>
        <div class="flex-row">
          <a href="https://ilojo-bar-gbwo.vercel.app" class="footer-link" target="_blank">Ilojo Bar</a>
          <a href="https://www.matthijsblauw.nl/" class="footer-link" target="_blank">Portfolio</a>
          <a href="https://github.com/M4TThys123/WeatherAppPlus" class="footer-link" target="_blank">GitHub Repo</a>
        </div>

        <div class="flex-row mt-3">
          <a href="https://www.linkedin.com/in/matthijs-blauw-9a9573235/" class="social-icon" target="_blank">
            <i class="bx bxl-linkedin"></i>
          </a>
          <a href="https://github.com/M4TThys123" class="social-icon" target="_blank">
            <i class="bx bxl-github"></i>
          </a>
          <a href="mailto:matthijs.blauw@gmail.com" class="social-icon" target="_blank">
            <i class="bx bx-envelope"></i>
          </a>
          <a href="https://www.twitch.tv/m4ttythewiper" class="social-icon" target="_blank">
            <i class='bx bxl-twitch'></i>
          </a>
          <a href="https://www.youtube.com/@M4ttyTheWiper" class="social-icon" target="_blank">
            <i class='bx bxl-youtube' ></i>
          </a>
        </div>
      </nav>
    </div>

    <div class="text-center p-3 copyright mt-4">
      &#169; {{ currentYear }} Matthijs Blauw
    </div>
  </footer>
</template>

<script>
import ProfileImage from "@/components/Footer/ProfileImage.vue";
import LogoImage from "@/components/Footer/LogoImage.vue";

export default {
  name: "FooterComponent",
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  },
  components: {
    LogoImage,
    ProfileImage
  }
};
</script>

<style scoped>
/* FOOTER */
footer {
  background-color: #14151A;
  color: white;
  padding-top: 2em;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-link {
  margin: 0 1em;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.social-icon {
  color: white;
  font-size: 35px;
  padding: 0 16px;
}

.copyright {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5em;
}
</style>