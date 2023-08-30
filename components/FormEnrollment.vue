<template>
  <div class="centerDiv">
    <VCard 
      elevation="5"
      width="400"
      class="pa-5">
      <v-card-title class="text-center text-subtitle-h4">
        {{ idEnrollment ? 'Actualizar' : 'Crear' }}
      </v-card-title>
      <Error /> 
      <VForm
        ref="form"
        fast-fail
        @submit.prevent="handleSubmit">

        <v-autocomplete
          label="Paralelo"
          v-model="formData._parallel"
          :items="parallels"
          item-title="name"
          item-value="_id"
          variant="underlined"/>
        
        <v-autocomplete 
          label="Estudiantes"
          v-model="formData._student"
          :items="students"
          item-title="fullName"
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
                  {{ idEnrollment ? 'Actualizar' : 'Crear' }}
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
const listParallels = useParallelStore();
const enrollmentStore = useEnrollmentStore();
const listParrallels = useParallelStore();
const loading = ref(false);

await listStudents.getAll();
await listParrallels.getAll();

const props = defineProps({
  enrollment: Object as () => IEnrollment | null
})

const idEnrollment = props.enrollment?._id;

const error = computed(() => errorStore.error);
const students = computed(() => listStudents.students);
const parallels = computed(() => listParallels.parallels);

interface IFormData{
  _student: string,
  _parallel: string
} 

const form = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  _parallel: props.enrollment?._parallel?._id || '',
  _student: props.enrollment?._student?._id ||''
})


const handleSubmit = async () => {
  loading.value = true;
  errorStore.resetError()
  const { valid } = await form.value!.validate();
  if (valid){
    if(!props.enrollment){
      await enrollmentStore.create(formData);
    } else {
      // update
    }
    if(!error.value) closeModal();
  }
  loading.value = false;
}
const rules = {
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
