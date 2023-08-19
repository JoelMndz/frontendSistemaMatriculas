<script lang="ts" setup>
import moment from 'moment';
const showModalDelete = ref(false);
const profesorStore = useProfessorStore();

const professorDelete = ref<IProfessor | null>(null);
const loading = ref(false);
await profesorStore.getAll();

const professorList = computed(() => profesorStore.professors);

const buttonEdit = (professor: IProfessor) => {
  profesorStore.currentProfessor(professor);
  profesorStore.showModal(true);
}

const openConfirmeDelete = (professor: IProfessor) => {
  professorDelete.value = professor;
  showModalDelete.value = true;
}

const cancelDelete = () => {
  showModalDelete.value = false;
  professorDelete.value = null;
} 

const formatDate = (date:number) =>{
  return moment(date).format('DD/MM/YYYY');
}
const headers = [
  'Nombre completo',
  'Cédula',
  'Email',
  'Fecha de nacimiento',
  'Dirección',
  'CV',
  'Acciones'
]
const buttonDelete = async () => {
  try {
    loading.value = true;
    if(professorDelete.value?._id)
    await profesorStore.delete(professorDelete.value?._id);
    loading.value = false;
    showModalDelete.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="professor in professorList" :key="professor._id">
        <td>{{ professor.fullName }}</td>
        <td>{{ professor.cedula }}</td>
        <td>{{ professor.email }}</td>
        <td>{{ formatDate(professor.dateBirth) }}</td>
        <td>{{ professor.address }}</td>
        <td>
          <a class="text-decoration-none"  target="_blank" :href="professor.cv"> Ver cv</a>
        </td>
        <td>
          <VIcon color="primary" class="mx-1" icon="mdi-update" @click="buttonEdit(professor)"/>
          <VIcon color="red" class="mx-1" icon="mdi-delete-alert" @click="openConfirmeDelete(professor)" />
        </td>
      </tr>
    </tbody>
  </VTable>
  <VDialog
    persistent
    max-width="450px"
    v-model="showModalDelete"
  >
    <v-card
        width="300"
        class="mx-auto"
      >
        <v-card-title class="headline text-center">{{
          "Confirmar eliminación" 
        }}</v-card-title>
        <v-card-text class="text-center">
          ¿Está seguro de eliminar este curso?
        </v-card-text >
        
        <v-card-actions class="justify-end">
          <v-btn
            color="red darken-1"
            :disabled="loading"
            @click="cancelDelete">
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            @click="buttonDelete">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
  </VDialog>
</template>
