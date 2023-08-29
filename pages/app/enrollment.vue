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
    <v-btn @click="buttomAdd">Crear Matricula</v-btn>
    <v-row class="mt-3">
      <v-col
        md="6"
        xl="4"
        cols="12"
        lg="4"
        sm="6"
        v-for="enrollment in listEnrollment">
          <v-card>
            <v-row>
              <v-col 
                sm="9"
                md="9"
                cols="9">
                  <v-card-title>{{ enrollment.endNote }}</v-card-title>
                  <v-card-subtitle>{{ enrollment.date }}</v-card-subtitle>
              </v-col>
              <v-col 
                sm="3"
                md="3"
                cols="3">
                <div class="text-end">
                  <v-menu>
                    <template v-slot:activator="{ props: menu }">
                      <v-btn
                        elevation="0"
                        color="default"
                        icon
                        v-bind="mergeProps(menu)">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="openModalUpdate()">
                        <v-list-item-title>Actualizar</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="showConfirmDeleteEnrollment()">
                        <v-list-item-title>Eliminar</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-col>
            </v-row>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
