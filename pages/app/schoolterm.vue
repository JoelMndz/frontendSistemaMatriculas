<template>
  <v-container>
    <v-btn
      class="mb-3"
      @click="openModalCreate"
      >Crear</v-btn
    >
    <v-dialog v-model="openCreateView" class="bg-">
      <PerioCreateandUpdate :closeModal="closeModal" />
    </v-dialog>
    <v-dialog v-model="openUpdateView">
      <PerioCreateandUpdate
        :schoolTerm="schoolObject"
        :closeModal="closeModal"
      />
    </v-dialog>
    <v-dialog v-model="showDeleteConfirmation">
      <v-card
        width="400"
        class="mx-auto"
      >
        <v-card-title class="headline text-center">{{
          "Confirmar eliminación" 
        }}</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas eliminar este período?
        </v-card-text >
        
        <v-card-actions>
          <v-btn
            color="red darken-1"
            @click="deleteConfirmed"
          >
            Confirmar
          </v-btn>
          <v-btn
            color="blue darken-1"
            @click="cancelDelete"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-table
      fixed-header
      height="400px"
    >
      <thead>
        <tr>
          <th>Periodo</th>
          <th>Descripcion Periodo</th>
          <th class="text-center">Delete</th>
          <th class="text-center">Update</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="schoolTerm in schoolList"
          :key="schoolTerm._id"
        >
          <td>{{ schoolTerm.name }}</td>
          <td>{{ schoolTerm.description }}</td>
          <td class="text-center">
            <v-icon
              v-if="!schoolTerm.current"
              color="red"
              icon="mdi-delete-alert"
              @click="confirmDelete(schoolTerm)"
            />
            <h2 v-else class="text-caption text-success">Periodo Actual</h2>
          </td>
          <td class="text-center">
            <v-icon
              color="primary"
              icon="mdi-update"
              @click="openModalUpdate(schoolTerm)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
const schoolTermList = useSchoolTerm()
const openCreateView = ref(false)
const openUpdateView = ref(false)
const schoolObject = ref()
const showDeleteConfirmation = ref(false)
const currentSchool = ref()

await schoolTermList.getAll()

const schoolList = computed(() => {
  return schoolTermList.schools
})

const openModalCreate = () => {
  openCreateView.value = true
}

const closeModal = () => {
  openCreateView.value = false
  openUpdateView.value = false
}

const openModalUpdate = (value: ISchoolTerm) => {
  schoolObject.value = value
  openUpdateView.value = true
}

const confirmDelete = (schoolTerm: ISchoolTerm) => {
  currentSchool.value = schoolTerm._id; 
  showDeleteConfirmation.value = true
}

const deleteConfirmed = () => {
  const selectedSchoolTerm = schoolTermList.schools.find(
    (term) => term._id === schoolObject.value
  )
  if (selectedSchoolTerm && selectedSchoolTerm.current) {
    return
  }

  deleteSchoolTerm(currentSchool.value)
  showDeleteConfirmation.value = false
}

const cancelDelete = () => {
  showDeleteConfirmation.value = false
}

const deleteSchoolTerm = async (id: string) => {
  try {
    await schoolTermList.delete(id)
  } catch (error) {
    console.log(error)
  } finally {
    schoolTermList.getAll()
  }
}
</script>
