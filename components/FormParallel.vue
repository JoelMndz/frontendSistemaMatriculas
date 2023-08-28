<template>
  <div class="centerDiv">
    <VCard
      elevation="5"
      width="400"
      class="pa-5">
      <v-card-title class="text-center text-subtitle-h4">
        {{ title }}
      </v-card-title>
        <Error />
        <VForm
          ref="form" 
          fast-fail
          @submit.prevent="handleSubmit">
          
          <v-text-field
            variant="underlined"
            label="Cupos"
            :rules="rules.quotas"
            v-model="formData.quotas"/>
            
          <v-select
            v-model="formData.name"
            :items="alphabetOptions"
            item-text="name"
            item-value="name"
            single-line
            :rules="rules.parallel"
            hint="Seleccione un paralelo"
            variant="underlined"
            persistent-hint />

          <v-select
            class="mt-1"
            v-model="formData._professor"
            :items="getProfessorOptions"
            item-value="_id"
            :rules="rules.professor"
            variant="underlined"
            item-title="name"
            hint="Seleccione un profesor"
            single-line
            persistent-hint/>

          <VRow>
            <VSpacer/>
            <VCol cols="auto">
              <VBtn 
                variant="text" 
                color="blue-darken-1" 
                @click="closeModal"
                :disabled="loading">
                  Cancelar
              </VBtn>

              <VBtn
                variant="text" 
                color="blue-darken-1"
                type="submit"
                :loading="loading">
                  Guardar
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
    </VCard>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/lib/components/index.mjs';
const errorStore = useErrorStore();
const parallelStore = useParallelStore()
const gradeStore = useGrade()
const professorStore = useProfessorStore()
const loading = ref(false)

await professorStore.getAll()
const allProfessors = professorStore.professors
const error = computed(() => errorStore.error)
const { gradeCurrent: currentGrade } = storeToRefs(gradeStore)

interface IFormData{
  name: string,
  quotas: string,
  _professor: string,
} 
const props = defineProps({
  parallelModel: Object as () => IParallel | null
})

const title = computed(() => props.parallelModel ? 'Actualizar Paralelo':'Agregar Paralelo')

const form = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  name: props.parallelModel?.name ?? '',
  quotas: props.parallelModel?.quotas?.toString() ?? '25',
  _professor: props.parallelModel?._professor as string ?? '',
})

const closeModal = () => { 
  parallelStore.openModalParallel(false)
}

const getProfessorOptions = computed(() => {
  const options = [];
  for (const professor of allProfessors) {
    options.push({_id: professor._id, name: professor.fullName });
  }
  return options;
});

const alphabetOptions = ref(Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)));

const handleSubmit = async () => {
  loading.value = true;
  errorStore.resetError();
  const { valid } = await form.value!.validate();
  if(valid){
    if(!props.parallelModel){
      if(currentGrade.value?._id){
          await parallelStore.create({
          ...formData,
          _grade: currentGrade.value?._id,
          quotas: parseInt(formData.quotas),
          _professor: formData._professor,
        })
      }
    } else {
        if(currentGrade.value?._id){
          await parallelStore.update(props.parallelModel?._id, {
          ...formData,
          _grade: currentGrade.value?._id,
          quotas: parseInt(formData.quotas),
          _professor: formData._professor
        }) 
      }
    }
    if(!error.value) closeModal();
  }
  loading.value = false;
}

const rules = {
  quotas: [ (value: string) => { return !!value || 'El nombre es obligatorio!' },
  ],
  professor: [ (value: string) => { return !!value || 'Seleccion un profesor'}
  ],
  parallel: [ (value: string) => { return !!value || 'Seleccione un paralelo'}]

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
