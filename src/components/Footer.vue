<template>
  <footer class="mt-12">
    <div class="container mx-auto px-4 footer-container">
      <nav class="flex justify-center gap-8">
        <a href="https://www.linkedin.com/in/matthijs-blauw-9a9573235/" class="w-1/2" target="_blank">
          <ProfileImage 
            alt-text="Image of Matthijs Blauw" 
            image-url="/images/afbeelding_pak.png"
            />
        </a>
        <a href="https://www.matthijsblauw.nl/" class="w-1/2" target="_blank">
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

        <div class="flex-row mt-4">
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

    <div class="text-center p-4 copyright mt-4">
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
  background-color: var(--color-footer-bg);
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
  font-size: 28px;
  padding: 8px 12px;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.copyright {
  background-color: var(--color-footer-copyright);
  padding: 0.5em;
}
</style>