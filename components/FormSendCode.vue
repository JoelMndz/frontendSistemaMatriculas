<template>
  <VCard 
    class="pa-5"
    elevation="5"
    width="400">
    <VCardTitle class="text-center">Envíar código de recuperación</VCardTitle>
    <VCardText>
      <Error/>
      <VForm
        ref="refForm"
        @submit.prevent="handleSubmit"
      >
        <v-text-field
          variant="underlined"
          v-model.trim="email"
          type="email"
          label="Email"
          :rules="emailRules"
          />

          <v-btn
            type="submit"
            class="mt-4"
            color="primary"
            width="100%"
            :loading="loading"
            >Enviar código</v-btn>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/lib/components/index.mjs';

const email = ref('')
const refForm = ref<VForm |null>(null);
const emailRules = [
  (value: any) => !!value || "El correo es requerido",
  (value: any) => /.+@.+\..+/.test(value) || "El correo debe ser válido"
]
const loading = ref(false);

const erroStore = useErrorStore();
const {error} = storeToRefs(erroStore)
const {resetError} = erroStore
const {sendCode} = useRecoveryStore()

const handleSubmit = async()=>{
  loading.value = true
  resetError()
  const {valid} = await refForm.value!.validate();
  if(valid){
    await sendCode(email.value)
  }
  loading.value = false
}


</script>

<style scoped>

</style>