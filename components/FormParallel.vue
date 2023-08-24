<template>
  <VCard>
    <VCardTitle class="text-center text-subtitle-1">
      <h3>Formulario</h3>
    </VCardTitle>
    <VCardText>
      <Error />
      <VForm
        ref="form" 
        @submit.prevent="handleSubmit">

        <VTextField 
          variant="underlined"
          label="Cupos"
          :rules="rules.quotas"
          v-model="formData.quotas"/>
          
        <VSelect
          v-model="formData.name"
          :items="alphabetOptions"
          item-text="name"
          item-value="name"
          label="Seleccione un paralelo"
          single-line
          :rules="rules.parallel"
          persistent-hint/>

        <VSelect
          v-model="formData._professor"
          :items="getProfessorOptions"
          item-value="_id"
          :rules="rules.professor"
          item-title="name"
          label="Seleccione un profesor"
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
    </VCardText>
  </VCard>
</template>

<script lang="ts" setup>
import { Value } from 'sass';
import { VForm } from 'vuetify/lib/components/index.mjs';
const errorStore = useErrorStore();
const parallelStore = useParallelStore()
const gradeStore = useGrade()
const professorStore = useProfessorStore()
const loading = ref(false)

await professorStore.getAll()
const allProfessors = professorStore.professors
const currentGrade = computed(() => gradeStore.gradeCurrent )
const error = computed(() => errorStore.error)

interface IFormData{
  name: string,
  quotas: string,
  _professor: string,
} 
const props = defineProps({
  parallelModel: Object as () => IParallel | null
})

const form = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  name: props.parallelModel?.name ?? '',
  quotas: props.parallelModel?.quotas?.toString() ?? '25',
  _professor: props.parallelModel?._professor ?? '',
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
