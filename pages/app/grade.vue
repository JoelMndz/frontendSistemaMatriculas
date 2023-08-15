<template>
  <v-container>
    <v-btn
      class="mb-3"
      @click="openModalCreate"
      >Crear Grado</v-btn>

    <v-dialog v-model="openCreateView" class="bg-">
      <FormGrade :closeModal="closeModal" />
    </v-dialog>

    <v-dialog v-model="openUpdateView">
      <PerioCreateandUpdate
        :grade="gradeObject"
        :closeModal="closeModal"
      />
    </v-dialog>
  </v-container>
</template>
<script setup lang="ts">
const openCreateView = ref(false)
const openUpdateView = ref(false)
const gradeObject = ref()

const openModalCreate = () => {
  openCreateView.value = true
}

const closeModal = () => {
  openCreateView.value = false
  openUpdateView.value = false
}

const openModalUpdate = (value: IGrade) => {
  gradeObject.value = value
  openUpdateView.value = true
}

</script>