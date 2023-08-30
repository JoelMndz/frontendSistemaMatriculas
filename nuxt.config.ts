// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports:{
    dirs:['store']
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  components:{
    dirs: ['~/components']
  },
  modules:[
    '@pinia/nuxt',
    '@sidebase/nuxt-auth'
  ],
  runtimeConfig:{
    public:{
      API: process.env.API
    },
    SECRET: process.env.SECRET
  },
  auth:{
    origin: process.env.DOMAIN,
  }
})
