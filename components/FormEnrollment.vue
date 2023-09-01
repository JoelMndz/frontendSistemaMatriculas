<template>
  <div class="centerDiv">
    <VCard 
      elevation="5"
      width="400"
      class="pa-5">
      <v-card-title class="text-center text-subtitle-h4">
        {{ idEnrollment ? 'Actualizar' : 'Crear' }}
      </v-card-title>
      <Error v-if="errorMessage" :error="errorMessage" /> 
      <VForm
        class="mt-2"
        ref="form"
        fast-fail
        @submit.prevent="handleSubmit">

        <v-autocomplete
          label="Paralelo"
          v-model="formData._parallel"
          :items="optionParallelsAndCourses"
          item-title="name"
          :rules="rules.parallel"
          item-value="_id"
          variant="underlined"/>
        
        <v-autocomplete 
          label="Estudiantes"
          class="mt-4"
          v-model="formData._student"
          :items="students"
          item-title="fullName"
          :rules="rules.student"
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
import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/lib/components/index.mjs';
const errorStore = useErrorStore();
const listStudents = useStudentStore();
const listParallels = useParallelStore();
const enrollmentStore = useEnrollmentStore();
const schoolTermStore = useSchoolTerm();
const errorMessage = ref('');
const isConfirmationVisible = ref(false);
const loading = ref(false);

await listStudents.getAll();
await listParallels.getAll();

const props = defineProps({
  enrollment: Object as () => IEnrollment | null
})

const idEnrollment = props.enrollment?._id;

const { parallels } = storeToRefs(listParallels);
const { students } = storeToRefs(listStudents);
const { error } = storeToRefs(errorStore);
const { schoolCurrent } = storeToRefs(schoolTermStore);

const optionParallelsAndCourses = computed(() => {
  const currentSchoolTerm = schoolCurrent.value;
  const options = parallels.value
    .filter(term => term._schoolTerm._id === currentSchoolTerm?._id)
    .map(parallel => {
      const nameParallel = parallel?.name || 'n/a';
      const nameCourse = parallel?._grade?.name || 'n/a';
      const yearSchoolTerm = parallel?._schoolTerm?.name || 'n/a';
      const parallelAndCourse = `${nameCourse} - ${nameParallel} - ${yearSchoolTerm}`;
      const idParallel = parallel?._id;

      return { _id: idParallel, name: parallelAndCourse};
  })
  return options;
})

interface IFormData{
  _student: string,
  _parallel: string
} 

const form = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  _parallel: '',
  _student: ''
})

const handleSubmit = async () => {
  loading.value = true;
  errorStore.resetError()
  const { valid } = await form.value!.validate();
  if (valid){
    if(!props.enrollment){
      isConfirmationVisible.value = false;
      await enrollmentStore.create(formData);
    } else {
      // update
    }
    if(error.value){
      errorMessage.value = error.value.message;
    } else{
      closeModal();
    } 
  }
  loading.value = false;
}
const rules = {
  student: [ (value: string) => { return !!value || 'Seleccion un estudiante'}
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
