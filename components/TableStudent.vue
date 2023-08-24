<template>
  <VCard elevation="3">
    <VCardText>
      <VTable>
        <thead>
          <tr>
            <th v-for="item in headers">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="i in students"
            :key="i._id">
            <td>{{ i.fullName }}</td>
            <td>{{ i.cedula }}</td>
            <td>{{ formatDate(i.birthDate) }}</td>
            <td>{{ i.fatherName }}</td>
            <td>{{ i.motherName }}</td>
            <td>{{ i.address }}</td>
            <td>
              <VChipGroup>
                <VChip>
                  {{ i._representative1.fullName }}
                </VChip>
                <VChip v-if="!!i._representative2">
                  {{ i._representative2?.fullName }}
                </VChip>
              </VChipGroup>
            </td>
            <td>{{ !!i.disability ? i.disability : 'N/A' }}</td>
            <td>{{ !!i.allergies ? i.allergies : 'N/A' }}</td>
            <td>
              <a class="me-2" :href="i.cedulaImageUrl" target="_blank">Cédula</a>
              <a :href="i.bulletinImageUrl" target="_blank">Boletín</a>
            </td>
            <td>
              <VBtn 
                variant="text"
                color="error"
                icon="mdi-delete"
                @click="handleConfirm(i)"
              />
              <VBtn 
                variant="text"
                color="warning"
                icon="mdi-pencil"
                @click="handleButtonEdit(i)"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard >
  <VDialog
    v-model="showConfirmDelete"
    persistent
    max-width="450px"
  >
    <VCard>
      <VCardTitle>
        <p class="text-h4">Eliminar estudiante</p>
      </VCardTitle>
      <VCardText>
        ¿Estás seguro de eliminar a {{ studentDelete?.fullName }}?
      </VCardText>
      <VCardActions>
        <VSpacer/>
        <VBtn 
          variant="text"
          color="blue-darken-1"
          @click="handleCancel"
          :disabled="loading"
        >Cancelar</VBtn>
        <VBtn 
          variant="text"
          color="blue-darken-1"
          type="submit"
          @click="handleDelete"
          :loading="loading"
        >Eliminar</VBtn> 
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import moment from 'moment';

const studentStore = useStudentStore()
const students = computed(()=> studentStore.students)
const showConfirmDelete = ref(false)
const loading = ref(false)
const studentDelete = ref<IStudent| null>(null)
const headers = [
  'Nombre completo',
  'Cédula',
  'Fecha de nacimiento',
  'Padre',
  'Madre',
  'Dirección',
  'Representantes',
  'Discapacidad',
  'Alergias',
  'Recursos',
  'Acciones'
]

const formatDate = (date:number) =>{
  return moment(date).format('DD/MM/YYYY')
}

const handleConfirm = (student:IStudent)=>{
  studentDelete.value = student
  showConfirmDelete.value = true
}

const handleCancel = ()=>{
  showConfirmDelete.value = false
  studentDelete.value = null
}

const handleDelete = async()=>{
  loading.value = true
  await studentStore.delete(studentDelete.value!._id)
  loading.value = false
  showConfirmDelete.value = false
}

const handleButtonEdit = (student:IStudent)=>{
  studentStore.setCurrentStudent(student)
  studentStore.setShowForm(true)
}

await studentStore.getAll()

</script>

<style scoped>

</style>