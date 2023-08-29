<template>
  <div class="centerDiv">
    <VCard 
      elevation="5"
      width="400"
      class="pa-5">
      <v-card-title class="text-center text-subtitle-h4">
        crear o actualizar
      </v-card-title>
      <Error /> 
      <VForm
        ref="form"
        fast-fail
        @submit.prevent="">
        
        <v-text-field
          variant="underlined"
          label="Nota final"
          :rules="rules.quotas"
          v-model="formData.endNote"/>

        <v-select 
          hint="Seleccione un paralelo"
          persistent-hint
          single-line
          v-model="formData._parallel"
          :items="getParallelOptions"
          item-title="name"
          item-value="_id"
          variant="underlined"/>
        
        <v-select 
          hint="Seleccione un estudiante"
          persistent-hint
          single-line
          v-model="formData._student"
          :items="getStudenOptions"
          item-title="name"
          item-value="_id"
          variant="underlined"/>

          <v-row class="mt-2">
            <v-spacer />
            <v-col cols="auto">
              <v-btn
                :disabled="loading"
                variant="text"
                @click="closeModal"
                color="blue-darken-1">
                Cerrar
              </v-btn>
              <v-btn
                :loading="loading"
                variant="text"
                type="submit"
                color="blue-darken-1">
                crear o actualizar
              </v-btn>
            </v-col>
          </v-row>
      </VForm>
    </VCard>
  </div>
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/lib/components/index.mjs';
const errorStore = useErrorStore();
const listStudents = useStudentStore();
const enrollmentStore = useEnrollmentStore();
const listParrallels = useParallelStore();
const loading = ref(false);

await listStudents.getAll()
const parallels = listParrallels.parallels
const students = listStudents.students;

const error = computed(() => errorStore.error)
const getStudenOptions = computed(() => {
  const options = [] 
  for (const student of students){
    options.push({ name: student.fullName, _id: student._id });
  }

  return options;
})

const getParallelOptions = computed(() => {
  const options = [] 
  for (const parallel of parallels){
    options.push({ name: parallel.name, _id: parallel._id });
  }
  return options;
})

interface IFormData{
  date: string,
  endNote: string,
  _student: string,
  _parallel: string
} 


const form = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  date: '',
  endNote: '8.4',
  _parallel:'',
  _student: ''
})

const rules = {
  quotas: [ (value: string) => { return !!value || 'El nombre es obligatorio!' },
  ],
  professor: [ (value: string) => { return !!value || 'Seleccion un profesor'}
  ],
  parallel: [ (value: string) => { return !!value || 'Seleccione un paralelo'}]

}

const closeModal = () => { 
  enrollmentStore.modalEnrollment(false)
}
</script>

<style>
.centerDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
