<template>
  <VAppBar>
    
    <template v-slot:title>
      <VBtn @click="$router.push('/app/dashboard')">
        Sistema Escolar
      </VBtn> 
    </template>


    <template v-slot:append>
      <VBtn :icon="iconTheme" @click="changeTheme()" />
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
</script>

<style scoped>

</style>