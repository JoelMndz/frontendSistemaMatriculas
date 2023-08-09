<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
  const {setIsAuthenticated} = useAuthStore()
  const token = useCookie('token');
  setIsAuthenticated(!!token.value)
</script>

<style scoped>

</style>