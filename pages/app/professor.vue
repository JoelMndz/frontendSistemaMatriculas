<template>
  <VContainer fluid>
    <VRow>
      <VCol>
        <VBtn @click="buttonAdd">Crear Profesor</VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <TableProfessor />
      </VCol>
    </VRow> 
    <VDialog v-model="modal" maxWidth="600px" transition="dialog-top-transition">
      <FormProfessor :professorModel="currentProfessor" />
    </VDialog>
  </VContainer>
</template>

<script lang="ts" setup>
const professorStore = useProfessorStore()

const modal = computed(() => professorStore.showForm )
const currentProfessor = computed(() => professorStore.professorCurrent )

const buttonAdd = () => {
  professorStore.currentProfessor(null)
  professorStore.showModal(true);
}
</script>
