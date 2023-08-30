<template>
  <VCard>
    <VCardTitle>
      <p class="text-h4 text-center">Agregar Usuario</p>
    </VCardTitle>
    <VCardText>
      <Error/>
      <VForm
        ref="refForm"
        @submit.prevent="handleSubmit"
        >
        <VRow>
          <VCol>
            <VTextField 
              variant="underlined"
              label="Nombre"
              :rules="rules.firstName"
              v-model="formData.firstName"
            />
          </VCol>
          <VCol>
            <VTextField 
              variant="underlined"
              label="Apellido"
              :rules="rules.lastName"
              v-model="formData.lastName"
            />
          </VCol>
        </VRow>
        <VTextField 
          type="email"
          variant="underlined"
          label="Email"
          :rules="rules.email"
          v-model="formData.email"
        />
        <VRadioGroup 
        label="Selecione el rol"
          inline
          v-model="formData.role">
          <VRadio
            value="admin"
            label="Administrador"/>
            <VRadio
            value="secretary"
            label="Secretaria"/>
          </VRadioGroup>
          <VRow>
            <VSpacer/>
            <VCol cols="auto">
              <VBtn 
                variant="text"
                color="blue-darken-1"
                @click="setShowForm(false)"
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
import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/lib/components/index.mjs';

const refForm = ref<VForm | null>(null)
const loading = ref(false)
const formData = reactive<{
  firstName: string,
  lastName: string,
  email: string,
  role: 'admin'|'secretary'
}>({
  firstName: '',
  lastName: '',
  email: '',
  role: 'secretary'
})
const errorStore = useErrorStore()
const {setShowForm, create} = useUserStore()
const {error} = storeToRefs(errorStore)
const rules = {
  firstName:[
    (value:string) => {
      return !!value || 'El nombre es obligatorio!'
    }
  ],
  lastName:[
    (value:string) => {
      return !!value || 'El apellido es obligatorio!'
    }
  ],
  email:[
    (value:string) =>{
      return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value) || 'El email no es válido'
    }
  ],
}

const handleSubmit = async()=>{
  loading.value = true
  errorStore.resetError()
  const {valid} = await refForm.value!.validate()
  if(valid){
    await create({...formData})
    if(!error.value) setShowForm(false);
  }
  loading.value = false;
}

</script>

<style scoped>

</style>