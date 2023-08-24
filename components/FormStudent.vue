<template>
  <VCard>
    <VCardTitle>
      <p class="text-h4 text-center">
        {{ title }}
      </p>
    </VCardTitle>
    <VCardText>
      <Error />
      <VForm
        ref="refForm"
        @submit.prevent="handleSubmit"
      >
      <VTextField 
          variant="underlined"
          label="Nombre completo"
          :rules="rules.fullName"
          v-model="formData.fullName"
        />
        <VTextField 
          variant="underlined"
          label="Cédula"
          :rules="rules.cedula"
          v-model.trim="formData.cedula"
        />
        <VTextField 
          type="date"
          variant="underlined"
          label="Fecha de nacimiento"
          :rules="rules.birthDate"
          v-model.trim="formData.birthDate"
        />
        <VTextField 
          variant="underlined"
          label="Nombre completo del padre"
          :rules="rules.fatherName"
          v-model.trim="formData.fatherName"
        />
        <VTextField 
          variant="underlined"
          label="Nombre completo de la madre"
          :rules="rules.motherName"
          v-model.trim="formData.motherName"
        />
        <VTextField 
          variant="underlined"
          label="Dirección"
          :rules="rules.address"
          v-model.trim="formData.address"
        />
        <VTextField 
          variant="underlined"
          label="Discapacidad (opcional)"
          v-model.trim="formData.disability"
        />
        <VTextField 
          variant="underlined"
          label="Alergias (opcional)"
          v-model.trim="formData.allergies"
        />
        <VFileInput
          v-model="cedulaFile"
          label="Foto de la cédula"
          variant="underlined"
          prepend-icon="mdi-camera"
          show-size
          :rules="rules.cedulaFile"
          accept="image/*"
        />
        <VFileInput
          v-model="bulletinFile"
          label="Archivo o foto del boletín"
          variant="underlined"
          prepend-icon="mdi-file"
          show-size
          :rules="rules.bulletinFile"
          accept=".pdf,image/*"
        />
        <VSelect
          variant="underlined"
          :rules="rules._representative1"
          v-model="formData._representative1"
          label="Primer acudiente"
          :clearable="!!formData._representative1"
          :items="representatives"
          item-title="fullName"
          item-value="_id"/>
        <VSelect
          variant="underlined"
          :disabled="!formData._representative1"
          v-model="formData._representative2"
          label="Segundo acudiente (opcional)"
          :clearable="!!formData._representative2"
          :items="representatives.filter(x => x._id !== formData._representative1)"
          item-title="fullName"
          item-value="_id"/>
        <VRow>
          <VSpacer/>
          <VCol cols="auto">
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
              :loading="loading"
            >Guardar</VBtn> 
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/lib/components/index.mjs';
import moment from "moment";

interface IFormData{
  fullName:string,
  cedula: string,
  birthDate: string,
  fatherName: string,
  motherName: string,
  address: string,
  disability: string,
  allergies: string,
  cedulaFile?:{
    base64:string,
    fileName: string
  },
  bulletinFile?:{
    base64:string,
    fileName: string
  },
  _representative1: string,
  _representative2: string | null,
}

const {student} = defineProps({
  student:{
    type: Object as ()=> IStudent | null,
    default: null
  }
})

const refForm = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  fullName: student?.fullName ?? '',
  cedula:  student?.cedula ?? '',
  birthDate: student ? moment(student?.birthDate).format('YYYY-MM-DD') : '',
  fatherName: student?.fatherName ?? '',
  motherName: student?.motherName ?? '',
  address: student?.address ?? '',
  disability: student?.disability ?? '',
  allergies: student?.allergies ?? '',
  cedulaFile: undefined,
  bulletinFile: undefined,
  _representative1: student?._representative1?._id ?? '',
  _representative2: student?._representative2?._id ?? '',
})
const cedulaFile = ref<File[]>([])
const bulletinFile = ref<File[]>([])
const loading = ref(false)

const studentStore = useStudentStore()
const representativeStore = useRepresentativeStore()
const errorStore = useErrorStore()
const {create: createStudent, update: updateStudent} = studentStore

const rules = {
  fullName: [
    (value:string)=> !!value || 'El nombre es obligatorio'
  ],
  cedula:[
    (value:string) => !!value || 'La cédula es obligatorio'
  ],
  birthDate:[
    (value:string) => {
      return !!value || 'La fecha es obligatoria'
    },
    (value:string) => {
      return moment().diff(moment(value),'years') >= 2 || 'La fecha de naciemiento no es correcta'
    },
  ],
  fatherName: [
    (value: string) => !!value ||'El nombre del padre es obligatorio'
  ],
  motherName: [
    (value: string) => !!value ||'El nombre de la madre es obligatorio'
  ],
  address: [
    (value: string) => !!value ||'La dirección es obligatoria'
  ],
  cedulaFile:[
    (value:File[]) => {
      return !!student || value.length === 1 || 'La imagen es obligatoria!'
    },
    (value:File[]) => {
      return !!value || !student || (value[0] as File).size < 10000000 || 'La foto no puede pesar más de 10 MB!'
    },
  ],
  bulletinFile:[
    (value:File[]) => {
      return !!student || value.length === 1 || 'El bolletín es obligatorio!'
    },
    (value:File[]) => {
      return !!value || (value[0] as File).size < 10000000 || 'La foto no puede pesar más de 10 MB!'
    },
  ],
  _representative1: [
    (value: string) => !!value ||'El primer acudiente es obligatorio'
  ],
}

const title = computed(()=> !student ? 'Agregar Estudiante':'Editar Estudiante')
const representatives = computed(()=> representativeStore.representatives)
const error = computed(()=> errorStore.error)


const handleSubmit = async()=>{
  loading.value = true
  errorStore.resetError()
  const {valid} = await refForm.value!.validate()
  
  if(valid){
    if(student)
      await updateStudent({
        ...formData,
        _id: student._id,
        birthDate: moment(formData.birthDate).utc().valueOf(),
        _representative2: !!formData._representative2 ? formData._representative2 : null
      })
    else
      await createStudent({
        ...formData,
        cedulaFile: formData.cedulaFile!,
        bulletinFile: formData.bulletinFile!,
        birthDate: moment(formData.birthDate).utc().valueOf()
      })
    if(!error.value) studentStore.setShowForm(false);
  }
  loading.value = false
}

const handleCancel = ()=>{
  studentStore.setShowForm(false);
}

watch(cedulaFile, async()=>{
  if(cedulaFile.value.length === 0){
    formData.cedulaFile = undefined
    return;
  }
  const file = cedulaFile.value[0]
  const result = await convertToBase64(file)
  if(result){
    formData.cedulaFile = {
      base64: result as string,
      fileName: file.name
    }
  }  
})

watch(bulletinFile, async()=>{
  if(bulletinFile.value.length === 0){
    formData.cedulaFile = undefined
    return;
  }
  const file = bulletinFile.value[0]
  const result = await convertToBase64(file)
  if(result){
    formData.bulletinFile = {
      base64: result as string,
      fileName: file.name
    }
  }  
})

onBeforeMount(async()=>{
  await representativeStore.getAll()
})

onMounted(()=>{

})

</script>

<style scoped>

</style>