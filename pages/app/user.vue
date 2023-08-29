<template>
  <VContainer>
    <VRow>
      <VCol>
        <h1 class="text-h4 text-center">Módulo de usuarios</h1>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          elevation="5"
          color="blue-darken-1"
          icon="mdi-plus"
          @click="setShowForm(true)"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <TableUser />
      </VCol>
    </VRow>
    <VDialog
      v-model="showForm" 
      persistent
      max-width="600px"
      transition="dialog-transition"
    >
      <FormUser />
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const {setShowForm} = userStore
const {showForm} = storeToRefs(userStore)
</script>

<style scoped>

</style>