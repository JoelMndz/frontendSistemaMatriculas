<template>
  <VContainer>
    <VRow>
      <VCol>
        <h1 class=" text-center text-h2">Sistema Escolar</h1>
      </VCol>
    </VRow>
    <VRow>
      <VContainer  style="display: flex; align-items: center; height: 60vh;">
        <VRow>
          <VCol>
            <VCard elevation="5" class="text-center">
              <VCardTitle class="text-h4" >
                Estudiantes
              </VCardTitle >
              <VCardText class="text-h4">
                <VIcon
                  icon="mdi-account-school"
                />
                {{ students.length }}
              </VCardText>
            </VCard>
          </VCol>
          <VCol>
            <VCard elevation="5" class="text-center">
              <VCardTitle class="text-h4">
                Profesores
              </VCardTitle>
              <VCardText class="text-h4">
                <VIcon
                  icon="mdi-human-male-board-poll"
                />
                {{ professors.length }}
              </VCardText>
            </VCard>
          </VCol>
          <VCol>
            <VCard elevation="5" class="text-center">
              <VCardTitle class="text-h4">
                Acudientes
              </VCardTitle>
              <VCardText class="text-h4">
                <VIcon
                  icon="mdi-account-group"
                />
                {{ representatives.length }}
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VRow> 
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';


const studentStore = useStudentStore()
const professorStore = useProfessorStore()
const representativeStore = useRepresentativeStore()

const {students} = storeToRefs(studentStore)
const {professors} = storeToRefs(professorStore)
const {representatives} = storeToRefs(representativeStore)

await studentStore.getAll()
await professorStore.getAll()
await representativeStore.getAll()
</script>

<style scoped>

</style>