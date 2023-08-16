<template>
  <v-container>
    <v-btn
      class="mb-3"
      @click="openModalCreate"
      >Crear Grado</v-btn>

    <v-dialog v-model="openCreateView" transition="dialog-top-transition">
      <FormGrade :closeModal="closeModal" />
    </v-dialog>

    <v-dialog v-model="openUpdateView" transition="dialog-top-transition">
      <FormGrade
        :grade="gradeObject"
        :closeModal="closeModal"
      />
    </v-dialog>
      <v-row class="mt-2" >
        <v-col
          v-for="grade in gradeList"
          md="5"
          lg="4"
          sm="6">
          <v-card
            width="300"
            height="300">
            <v-row>
              <v-col>
                <v-card-title> {{ grade?.name }} </v-card-title>
                <v-card-subtitle> {{ grade.description }} </v-card-subtitle>
              </v-col>
              <v-col>
                <div class="text-end">
                  <v-menu open-on-hover>
                    <template v-slot:activator="{ props: menu }">
                      <v-tooltip :location="'start'">
                        <template v-slot:activator="{ props: tooltip }">
                          <v-btn
                            elevation="0"
                            color="default"
                            icon
                            v-bind="mergeProps(menu, tooltip)"
                          >
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>
                        <span>Accciones</span>
                      </v-tooltip>
                    </template>
                    <v-list>
                      <v-list-item @click="openModalUpdate(grade)">
                        <v-list-item-title>Actualizar</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deteleGrade(grade._id)">
                        <v-list-item-title>Eliminar</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn
                color="orange-lighten-2"
                variant="text">
                Materias
              </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
              <v-row>
            <v-col v-for="(subject, index) in grade.subjects" :key="index" cols="6">
              <div class="px-4">{{ "- " + subject }}</div>
            </v-col>
          </v-row>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { mergeProps } from 'vue'
const openCreateView = ref(false)
const openUpdateView = ref(false)
const gradeObject = ref()
const gradeStore = useGrade()
const loading = ref(false)

await gradeStore.getAll()

const gradeList = computed (() =>{
  return gradeStore.grades 
})

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

const deteleGrade = async (id: string) => {
  try {
    loading.value = true;
    await gradeStore.delete(id);
    loading.value = false;
  } catch (error) {
    console.log(error)
  } finally {
    await gradeStore.getAll()
  }
}

</script>