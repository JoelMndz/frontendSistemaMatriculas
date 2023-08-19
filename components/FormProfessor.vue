<template>
  <VCard>
    <VCardTitle class="text-center text-subtitle-1">
      <h3> {{ profesorId ? 'Actualizar Profesor' : 'Crear Profesor' }}</h3>
    </VCardTitle>
    <VCardText>
      <Error />
      <VForm 
        ref="form"
        @submit.prevent="handleSubmit">
      <VTextField 
          variant="underlined"
          label="Nombre completo"
          v-model="formData.fullName"
          :rules="ruleForm.ruleName"
        />
        <VTextField 
          variant="underlined"
          label="Cédula"
          :rules="ruleForm.ruleCedula"
          v-model.trim="formData.cedula"
        />
        <VTextField 
          variant="underlined"
          label="Discapacidad"
          :rules="ruleForm.ruleDisability"
          v-model.trim="formData.disability"
        />
        <VTextField 
          type="email"
          variant="underlined"
          :rules="ruleForm.ruleEmail"
          label="Email"
          v-model="formData.email"
        />
        <VTextField 
          type="date"
          variant="underlined"
          label="Fecha de nacimiento"
          :rules="ruleForm.ruleBirthDate"
          v-model="formData.dateBirth"
        />
        <VTextField 
          variant="underlined"
          :rules="ruleForm.ruleAddress"
          label="Dirección"
          v-model="formData.address"
        />
        <VFileInput
          v-model="cv"
          label="Subir CV"
          variant="underlined"
          :rules="ruleForm.ruleFile"
          prepend-icon="mdi-file-pdf-box"
          show-size
          accept=".pdf"
        />
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
                {{ profesorId ? 'Actualizar': 'Crear' }}
            </VBtn>
          </VCol>
        </VRow>
    </VForm>
    </VCardText>
  </VCard>
</template>

<script lang="ts" setup>
import { VForm } from 'vuetify/lib/components/index.mjs';
import moment from "moment";
const loading = ref(false)
const errorStore = useErrorStore();
const professor = useProfessorStore()

interface IFormData{
  fullName:string,
  cedula: string,
  dateBirth: string,
  email: string,
  address: string,
  disability: string
  cv?:{
    base64:string,
    fileName: string
  },
}

const props = defineProps({
  professorModel: Object as () => IProfessor | null
})

const profesorId = props.professorModel?._id
const error = computed(()=> errorStore.error)

const form = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  fullName: props.professorModel?.fullName || '',
  cedula: props.professorModel?.cedula || '',
  dateBirth: props.professorModel?.dateBirth ? moment(props.professorModel.dateBirth).format('YYYY-MM-DD') : '' || '',
  email: props.professorModel?.email || '',
  address: props.professorModel?.address || '',
  disability: props.professorModel?.disability || '',
  cv: undefined
})

const cv = ref<File[]>([])
const ruleForm = {
  ruleName:[
  (value:string) => {
      return !!value || 'El nombre es obligatorio!'
    }
  ],
  ruleDisability:[
  (value:string) => {
      return !!value || 'Campo de discapacidad obligatorio!'
    }
  ],
  ruleCedula:[
    (value:string) => {
      return !!value || 'La cédula es obligatorio!'
    },
    (value:string) => {
      return value.length >= 6 || 'Debe tener al menos 6 dígitos'
    },
  ],
  ruleEmail:[
    (value:string) =>{
      return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value) || 'El email no es válido'
    }
  ],
  ruleFile:[
    (value:File[]) => {
      if(!profesorId && value.length === 0){
        return 'El cv es obligatoria!'
      } else {
        return true
      }
    },
    (value:File[]) => {
      return !!value || (value[0] as File).size < 10000000 || 'El cv no puede pesar más de 10 MB!'
    }
  ],
  ruleAddress:[
    (value:string) => {
      return !!value || 'La dirección es obligatoria'
    },
  ],
  ruleBirthDate:[
    (value:string) => {
      return !!value || 'La fecha es obligatoria'
    },
  ],
  
}
const closeModal = () => {
  professor.showModal(false);
}

const handleSubmit = async () => {
  loading.value = true;
  const { valid } = await form.value!.validate();
  if(valid){
    if(!props.professorModel){
      await professor.create({
        ...formData,
        dateBirth: moment(formData.dateBirth).utc().valueOf(),
        cv: formData.cv!,
      })
    } else {
        if(profesorId){
          await professor.update(profesorId,{
          ...formData,
          dateBirth: moment(formData.dateBirth).utc().valueOf(),
          cv: formData.cv!,
        })
      }
    }
    if(!error.value) closeModal()
  }
  loading.value = false;
}

watch(cv, async () => {

  if(cv.value.length === 0) {
    formData.cv = undefined
    return;
  }
  const file = cv.value[0]
  const result = await convertToBase64(file)
  if(result) {

    formData.cv = {
      base64: result as string,
      fileName: file.name
    }
  }  
})
</script>
