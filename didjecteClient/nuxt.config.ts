// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $development: {
    devtools: { enabled: true },
  },
  $production: {
  },
  devServer: {
    port: 4444
  },
  app: {
      head: {
        titleTemplate: 'Didjecte - %s',
        meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        //{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
        ]
      },
    },
    css: [
      '~/assets/css/main.css',
      'primeicons/primeicons.css'
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  devtools: {
    timeline: {
      enabled: true
    }
  },
  build: {
    transpile: ["primevue"]
  },
  // modules: ['@pinia/nuxt']
})