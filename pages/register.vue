<template>
  <v-container>
    <div class="centrarDiv">
      <VCard
        elevation="5"
        class="pa-5"
        width="400">
        <h3 class="text-center">Registrate Ahora</h3>
        <Error class="mt-1" />
        <v-form
          @submit="register"
          ref="form"
          class="mt-5"
          fast-fail
        >
          <v-text-field
            v-model="dataForm.firstName"
            label="Nombres"
            :rules="nameRules"
            variant="underlined"
            required
          />

          <v-text-field
            v-model="dataForm.lastName"
            label="Apellidos"
            :rules="lastNameRules"
            variant="underlined"
            required
          />
          <v-text-field
            v-model="dataForm.email"
            type="email"
            label="Correo"
            variant="underlined"
            :rules="emailRules"
            required
          />

          <v-text-field
            class="mt-3"
            v-model="dataForm.password"
            variant="underlined"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            label="Contraseña"
            required
          />

          <v-btn
            color="primary"
            class="mt-3"
            @click="register"
            width="400"
            :loading="loading"
            >Regitrar</v-btn
          >
          <div class="mt-3">
            <NuxtLink
              class="text-decoration-none"
              to="/"
              >Regresar</NuxtLink
            >
          </div>
        </v-form>
      </VCard>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { VForm } from "vuetify/lib/components/index.mjs"

const form = ref<VForm | null>(null)
const dataForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: ""
})

const authStore = useAuthStore()
const loading = ref(false)
const showPassword = ref(false)
const { resetError } = useErrorStore();

const nameRules = [(value: any) => !!value || "El nombre es requerido"]
const lastNameRules = [(value: any) => !!value || "El apellido es requerido"]

const emailRules = [
  (value: any) => !!value || "El correo es requerido",
  (value: any) => /.+@.+\..+/.test(value) || "El correo debe ser válido"
]

const passwordRules = [
  (value: any) => !!value || "La contraseña es requerida",
  (value: any) =>
    (value && value.length >= 8) ||
    "La contraseña debe tener al menos 8 caracteres"
]
const register = async () => {
  loading.value = true
  resetError()
  const { valid } = await form.value!.validate()
  if (!valid) return
  await authStore.register(dataForm)
  loading.value = false
  //await navigateTo("/app/dashboard")
}

onUnmounted(() => {
  resetError()
})
</script>

<style scoped>
.centrarDiv {
  display: grid;
  place-items: center;
  height: 80vh;
}
</style>
