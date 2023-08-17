<template>
  <VContainer>
    <VRow>
      <VCol>
        <h1>Representantes</h1>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          icon="mdi-plus"
          @click = "handleButtonAdd"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <TableRepresentative />
      </VCol>
    </VRow>
    <VDialog
      v-model="showForm" 
      persistent
      max-width="600px"
      transition="dialog-transition"
    >
      <FormRepresentative :representative="currentRepresentative"/>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">

const representativeStore = useRepresentativeStore()

const showForm = computed(()=>representativeStore.showForm)
const currentRepresentative = computed(()=> representativeStore.currentRepresentative)

const handleButtonAdd = ()=>{
  representativeStore.setCurrentRepresentative(null)
  representativeStore.setShowForm(true);
}
</script>

<style scoped>

</style>