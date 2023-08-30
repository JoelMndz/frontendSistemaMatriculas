<template>
  <VCard 
    class="pa-5"
    elevation="5"
    width="400">
    <VCardTitle class="text-center">Verificar código</VCardTitle>
    <VCardText>
      <Error/>
      <VForm
        ref="refForm"
        @submit.prevent="handleSubmit"
      >
        <v-text-field
          variant="underlined"
          v-model.trim="formData.code"
          label="Código enviado a su email"
          :rules="rules.code"
          />

          <v-text-field
            class="my-2"
            v-model="formData.password"
            label="Nueva contraseña"
            :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
            :type="show ? 'text' : 'password'"
            density="compact"
            variant="underlined"
            :rules="rules.password"
            @click:append-inner="show = !show"
          ></v-text-field>

          <v-btn
            type="submit"
            class="mt-4"
            color="primary"
            width="100%"
            :loading="loading"
            >Cambiar contraseña</v-btn>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/lib/components/index.mjs';

const formData = reactive({
  code: '',
  password: ''
})
const refForm = ref<VForm |null>(null);
const show = ref(false)
const rules = {
  code: [
    (value: string) => !!value || "El código es requerido",
    (value: string) => value.length === 4 || "El código tiene 4 caracteres",
  ],
  password: [
    (value: string) => !!value || "La contraseña es requerida",
    (value: string) => value.length >= 8 || "Debe tener al menos 8 caracteres",
  ]
}
const loading = ref(false);

const erroStore = useErrorStore();
const {resetError} = erroStore
const {updatePassword} = useRecoveryStore()

const handleSubmit = async()=>{
  loading.value = true
  resetError()
  const {valid} = await refForm.value!.validate()
  if(valid){
    await updatePassword(formData)
  }
  loading.value = false
}

</script>

<style scoped>

</style>