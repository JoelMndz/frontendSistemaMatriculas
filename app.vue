<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const layout = computed(()=>{
  return authStore.isAuthenticated ? "authorized":"unauthorized"
});

</script>

<style scoped>

</style>