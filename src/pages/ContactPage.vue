<template>
  <section class="contact-page">
    <div class="contact-wrapper">
      <!-- Left: Contact Info -->
      <div class="contact-info" :class="{ 'fade-up': inView }">
        <h1 class="contact-info__heading">Neem contact op</h1>
        <p class="contact-info__intro">
          Heb je een idee, project of vraag? Ik sta altijd open voor nieuwe samenwerkingen
          en uitdagingen. Laat een bericht achter en ik neem zo snel mogelijk contact op.
        </p>

        <ul class="contact-details">
          <li class="contact-details__item">
            <i class="bx bx-envelope"></i>
            <a href="mailto:matthijs.blauw@gmail.com">matthijs.blauw@gmail.com</a>
          </li>
          <li class="contact-details__item">
            <i class="bx bx-phone"></i>
            <a href="tel:+31623973034">+31 6 23973034</a>
          </li>
          <li class="contact-details__item">
            <i class="bx bx-map"></i>
            <span>De Goorn, Noord-Holland</span>
          </li>
        </ul>

        <div class="social-links">
          <a
            href="https://www.linkedin.com/in/matthijs-blauw-9a9573235/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-links__btn"
            aria-label="LinkedIn"
          >
            <i class="bx bxl-linkedin"></i>
          </a>
          <a
            href="https://github.com/M4TThys123"
            target="_blank"
            rel="noopener noreferrer"
            class="social-links__btn"
            aria-label="GitHub"
          >
            <i class="bx bxl-github"></i>
          </a>
        </div>

        <div class="availability">
          <span class="availability__dot"></span>
          Beschikbaar voor freelance &amp; fulltime
        </div>
      </div>

      <!-- Right: Contact Form -->
      <div class="contact-form-wrapper" :class="{ 'fade-up': inView, 'fade-up--delay': inView }">
        <!-- Success State -->
        <div v-if="submitted" class="form-success">
          <i class="bx bx-check-circle"></i>
          <h2>Bedankt!</h2>
          <p>Je bericht is verzonden. Ik neem zo snel mogelijk contact met je op.</p>
          <button class="btn btn--outline" @click="resetForm">Nog een bericht sturen</button>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" novalidate>
          <div class="form-group" :class="{ 'form-group--error': errors.naam }">
            <label for="naam">Naam <span class="required">*</span></label>
            <input
              id="naam"
              v-model.trim="form.naam"
              type="text"
              placeholder="Je volledige naam"
              @blur="validateField('naam')"
            />
            <span v-if="errors.naam" class="form-error">{{ errors.naam }}</span>
          </div>

          <div class="form-group" :class="{ 'form-group--error': errors.email }">
            <label for="email">Email <span class="required">*</span></label>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              placeholder="je@email.com"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="onderwerp">Onderwerp</label>
            <input
              id="onderwerp"
              v-model.trim="form.onderwerp"
              type="text"
              placeholder="Waar gaat het over?"
            />
          </div>

          <div class="form-group" :class="{ 'form-group--error': errors.bericht }">
            <label for="bericht">Bericht <span class="required">*</span></label>
            <textarea
              id="bericht"
              v-model.trim="form.bericht"
              rows="5"
              placeholder="Vertel me meer over je project of vraag..."
              @blur="validateField('bericht')"
            ></textarea>
            <span v-if="errors.bericht" class="form-error">{{ errors.bericht }}</span>
          </div>

          <div v-if="submitError" class="form-submit-error">
            <i class="bx bx-error-circle"></i>
            Er ging iets mis bij het verzenden. Probeer het opnieuw of mail me direct.
          </div>

          <button type="submit" class="btn btn--primary" :disabled="loading">
            <span v-if="loading" class="btn__loader"></span>
            <span v-else>Verstuur bericht</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactPage",

  data() {
    return {
      form: {
        naam: "",
        email: "",
        onderwerp: "",
        bericht: "",
      },
      errors: {
        naam: "",
        email: "",
        bericht: "",
      },
      loading: false,
      submitted: false,
      submitError: false,
      inView: false,
    };
  },

  mounted() {
    requestAnimationFrame(() => {
      this.inView = true;
    });
  },

  methods: {
    validateField(field) {
      this.errors[field] = "";

      switch (field) {
        case "naam":
          if (!this.form.naam) {
            this.errors.naam = "Naam is verplicht.";
          }
          break;

        case "email":
          if (!this.form.email) {
            this.errors.email = "Email is verplicht.";
          } else if (!this.isValidEmail(this.form.email)) {
            this.errors.email = "Voer een geldig emailadres in.";
          }
          break;

        case "bericht":
          if (!this.form.bericht) {
            this.errors.bericht = "Bericht is verplicht.";
          } else if (this.form.bericht.length < 10) {
            this.errors.bericht = "Bericht moet minimaal 10 tekens bevatten.";
          }
          break;
      }

      return !this.errors[field];
    },

    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    validateAll() {
      const fields = ["naam", "email", "bericht"];
      let valid = true;

      fields.forEach((field) => {
        if (!this.validateField(field)) {
          valid = false;
        }
      });

      return valid;
    },

    async handleSubmit() {
      this.submitError = false;

      if (!this.validateAll()) return;

      this.loading = true;

      try {
        const response = await fetch("https://formspree.io/f/mreynnbo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: this.form.naam,
            email: this.form.email,
            subject: this.form.onderwerp,
            message: this.form.bericht,
          }),
        });

        if (response.ok) {
          this.submitted = true;
        } else {
          this.submitError = true;
        }
      } catch {
        this.submitError = true;
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.form = { naam: "", email: "", onderwerp: "", bericht: "" };
      this.errors = { naam: "", email: "", bericht: "" };
      this.submitted = false;
      this.submitError = false;
    },
  },
};
</script>

<style scoped>
.contact-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  background: var(--color-bg-alt, #fafafa);
}

.contact-wrapper {
  display: flex;
  gap: 60px;
  max-width: 1060px;
  width: 100%;
  align-items: flex-start;
}

/* Fade-up animation */
.contact-info,
.contact-form-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.contact-info.fade-up,
.contact-form-wrapper.fade-up {
  opacity: 1;
  transform: translateY(0);
}

.contact-form-wrapper.fade-up--delay {
  transition-delay: 0.15s;
}

/* Left: Contact Info */
.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-info__heading {
  font-size: 34px;
  color: var(--color-text, #242424);
  text-align: left;
  margin-bottom: 16px;
  line-height: 1.2;
}

.contact-info__intro {
  font-size: 16px;
  color: var(--color-text-secondary, #555);
  line-height: 1.7;
  margin-bottom: 32px;
}

.contact-details {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-details__item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: var(--color-text, #333);
}

.contact-details__item i {
  font-size: 22px;
  color: var(--color-blue);
  width: 28px;
  text-align: center;
  flex-shrink: 0;
}

.contact-details__item a {
  color: var(--color-text, #333);
  transition: color 0.2s ease;
}

.contact-details__item a:hover {
  color: var(--color-blue);
}

.social-links {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
}

.social-links__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--color-blue);
  color: #fff;
  font-size: 22px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.social-links__btn:hover {
  background: var(--color-blue-hover, #0f3f78);
  transform: translateY(-2px);
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1a7f37;
  background: #e6f9ed;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
}

.availability__dot {
  width: 8px;
  height: 8px;
  background: #1a7f37;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Right: Form */
.contact-form-wrapper {
  flex: 1;
  min-width: 0;
  background: var(--color-surface, #fff);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px var(--color-card-shadow, rgba(0, 0, 0, 0.06));
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text, #333);
  margin-bottom: 6px;
}

.form-group .required {
  color: #dc3545;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  font-family: "Lato", sans-serif;
  color: var(--color-text, #333);
  background: var(--color-bg-alt, #f8f9fa);
  border: 2px solid var(--color-border, #e2e5e9);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--color-text-muted, #aab0b8);
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px rgba(20, 83, 154, 0.12);
  background: var(--color-surface, #fff);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-group--error input,
.form-group--error textarea {
  border-color: #dc3545;
}

.form-group--error input:focus,
.form-group--error textarea:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.12);
}

.form-error {
  display: block;
  font-size: 13px;
  color: #dc3545;
  margin-top: 4px;
}

.form-submit-error {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #dc3545;
  background: #fdf0f0;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.form-submit-error i {
  font-size: 18px;
  flex-shrink: 0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 700;
  font-family: "Lato", sans-serif;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
  min-height: 50px;
}

.btn--primary {
  width: 100%;
  background: var(--color-blue);
  color: #fff;
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-blue-hover, #0f3f78);
  transform: translateY(-1px);
}

.btn--primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn--outline {
  background: transparent;
  color: var(--color-blue);
  border: 2px solid var(--color-blue);
}

.btn--outline:hover {
  background: var(--color-blue);
  color: #fff;
}

.btn__loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success State */
.form-success {
  text-align: center;
  padding: 20px 0;
}

.form-success i {
  font-size: 56px;
  color: #1a7f37;
  margin-bottom: 16px;
}

.form-success h2 {
  font-size: 24px;
  color: var(--color-text, #242424);
  margin-bottom: 8px;
}

.form-success p {
  font-size: 15px;
  color: var(--color-text-secondary, #555);
  margin-bottom: 24px;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-page {
    padding: 100px 16px 48px;
    align-items: flex-start;
  }

  .contact-wrapper {
    flex-direction: column;
    gap: 36px;
  }

  .contact-info__heading {
    font-size: 28px;
  }

  .contact-form-wrapper {
    padding: 28px 20px;
  }
}

@media (max-width: 480px) {
  .contact-form-wrapper {
    padding: 24px 16px;
    border-radius: 12px;
  }

  .btn {
    padding: 12px 24px;
    font-size: 15px;
  }
}
</style>
