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
import { storeToRefs } from 'pinia';


const {isAuthenticated} = storeToRefs(useAuthStore())

</script>

<style scoped>

</style>