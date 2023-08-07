<template>
  <VAppBar>
    <VBtn @click="scrollToSection('vision')">Vision</VBtn> 
    <VBtn @click="scrollToSection('mision')">Mision</VBtn> 
    <VBtn @click="scrollToSection('history')">Historia</VBtn> 
    <VBtn @click="$router.push('/login')">Login</VBtn> 
    <VBtn :icon="iconTheme" @click="changeTheme()" />
    <template v-slot:title>
      <VBtn @click="scrollToSection('home')">
        Sistema Escolar
      </VBtn> 
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
const theme = useTheme();

const changeTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}

const iconTheme = computed(() => {
  const value = theme.global.name.value
  return value === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'
})


const scrollToSection =(sectionId:string)=>{
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = -65; // Ajusta este valor según tus necesidades
    const topPos = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top:topPos,behavior: 'smooth' });
  }
}
</script>

<style scoped>

</style>
