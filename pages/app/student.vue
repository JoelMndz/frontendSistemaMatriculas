<template>
  <VContainer>
    <VRow>
      <VCol>
        <h1 class="text-h4 text-center">Módulo de estudiante</h1>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          elevation="5"
          color="blue-darken-1"
          icon="mdi-plus"
          @click = "handleButtonAdd"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <TableStudent />
      </VCol>
    </VRow>
    <VDialog
      v-model="showForm" 
      persistent
      max-width="600px"
      transition="dialog-transition"
    >
      <FormStudent :student="currentStudent"/>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const studentStore = useStudentStore()
const {showForm, currentStudent} = storeToRefs(studentStore)

const handleButtonAdd = ()=>{
  studentStore.setCurrentStudent(null)
  studentStore.setShowForm(true);
}
</script>

<style scoped>

</style>