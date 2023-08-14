<template>
  <VApp>
    <template v-if="isAuthenticated">
      <NavbarAuthorized/>
      <NavigationDrawer /> 
    </template>
    <template v-else>
      <NavbarUnauthorized/>
    </template>
    <VMain>
      <slot></slot>
    </VMain> 
  </VApp>
</template>

<script setup lang="ts">

const authStore = useAuthStore()
const isAuthenticated = computed(()=> authStore.isAutenticated)

</script>

<style scoped>

</style>