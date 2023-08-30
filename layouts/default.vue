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

const {data} = useAuth()

const isAuthenticated = computed(()=> !!data.value)

</script>

<style scoped>

</style>