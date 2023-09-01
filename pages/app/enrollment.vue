<script lang="ts" setup>
import moment from 'moment';
import { mergeProps } from 'vue'

const enrollmentStore = useEnrollmentStore() 

await enrollmentStore.getAll();
const modal = computed(() => enrollmentStore.showForm )
const currentEnrollment = computed(() =>  enrollmentStore.currentEnrollment)
const listEnrollment = computed(() => enrollmentStore.enrollments)

const openModalUpdate = () => {
}

const showConfirmDeleteEnrollment = () => {
}

const buttomAdd = () => {
  enrollmentStore.setCurrentEnrollment(null)
  enrollmentStore.modalEnrollment(true)
}
</script>

<template>
  <v-container fluid>
    <v-dialog v-model="modal" maxWidth="600px" transition="dialog-top-transition">
      <FormEnrollment :enrollment="currentEnrollment" />
    </v-dialog>
    <v-row>
      <v-col>
        <v-btn @click="buttomAdd">Crear Matricula</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TableEnrollment />
      </v-col>
    </v-row>
  </v-container>
</template>
