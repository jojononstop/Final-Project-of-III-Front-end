// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "MYKD - eSports and Gaming Vue Nuxt 3 Template",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js",
        },
      ],
    }
  },
  css: [
    "bootstrap/scss/bootstrap.scss",
    "swiper/css/bundle",
    "@/assets/css/local-font.css",
    "@/assets/css/flaticon.css",
    "@/assets/css/fontawesome-all.min.css",
    "@/assets/css/spacing.css",
    "@/assets/css/odometer.css",
    "@/assets/css/tg-cursor.css",
    "@/assets/css/animate.min.css",
    "@/assets/scss/main.scss",
  ],
})
