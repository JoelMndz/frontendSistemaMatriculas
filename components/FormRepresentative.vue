<template>
  <VCard>
    <VCardTitle>
      <p class="text-h4 text-center">
        {{ title }}
      </p>
    </VCardTitle>
    <VCardText>
      <Error/>
      <VForm
        ref="refForm"
        @submit.prevent="handleSubmit"
      >
        <VTextField 
          variant="underlined"
          label="Nombre completo"
          :rules="rules.ruleName"
          v-model="formData.fullName"
        />
        <VTextField 
          variant="underlined"
          label="Cédula"
          :rules="rules.ruleCedula"
          v-model="formData.cedula"
        />
        <VTextField 
          variant="underlined"
          label="Email"
          :rules="rules.ruleEmail"
          v-model="formData.email"
        />
        <VFileInput
          v-model="cedulaFile"
          label="Foto de la cédula"
          variant="underlined"
          prepend-icon="mdi-camera"
          show-size
          :rules="rules.ruleFile"
          accept="image/*"
        />
        <VRow>
          <VSpacer/>
          <VCol cols="auto">
            <VBtn 
              variant="text"
              color="blue-darken-1"
              @click="handleCancel"
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

interface IFormData{
  fullName:string,
  cedula: string,
  email: string,
  cedulaFile?:{
    base64:string,
    fileName: string
  }
}

const props = defineProps({
  representative:{
    type: Object as ()=>IRepresentative | null,
    default: null  
  }
})

const refForm = ref<VForm | null>(null)
const formData = reactive<IFormData>({
  fullName: props.representative?.fullName ?? '',
  cedula: props.representative?.cedula ?? '',
  email: props.representative?.email ?? '',
  cedulaFile: undefined
})
const cedulaFile = ref<File[]>([])
const loading = ref(false)
const rules = {
  ruleName:[
  (value:string) => {
      return !!value || 'El nombre es obligatorio!'
    }
  ],
  ruleCedula:[
  (value:string) => {
      return !!value || 'La cédula es obligatorio!'
    }
  ],
  ruleEmail:[
    (value:string) =>{
      return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value) || 'El email no es válido'
    }
  ],
  ruleFile:[
    (value:File[]) => {
      return !!props.representative || value.length === 1 || 'La imagen es obligatoria!'
    },
    (value:File[]) => {
      return !!value || (value[0] as File).size < 10000000 || 'La foto no puede pesar más de 10 MB!'
    },
    
  ]
}
const representativeStore = useRepresentativeStore()
const {
  setShowForm, 
  create:createRepresentative,
  update:updateRepresentative
} = representativeStore;
const errorStore = useErrorStore();

const title = computed(()=> props.representative ? 'Editar Acudiente':'Agregar Acudiente')
const error = computed(()=> errorStore.error)
const handleCancel = ()=>{
  setShowForm(false);
}

const handleSubmit = async()=>{
  loading.value = true
  const {valid} = await refForm.value!.validate()
  if(valid){
    if(!props.representative)
      await createRepresentative({...formData,cedulaFile:formData.cedulaFile!})
    else
      await updateRepresentative({...formData,id:props.representative._id})
    if(!error.value) setShowForm(false);
  }
  loading.value = false;
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

</script>

<style scoped>

</style>