<template>
  <v-container>
    <div class="centrarDiv">
      <VCard
        elevation="5"
        class="pa-5">
        <VCardTitle class="text-center">Inicio de sesion</VCardTitle>
        <v-form 
          ref="form"
          fast-fail 
          @submit="login">
          <v-text-field
            variant="underlined"
            v-model="dataForm.email"
            type="email"
            label="Correo"
            :rules="emailRules"
            required
            />
          <v-text-field
            variant="underlined"
            class="mt-3"
            v-model="dataForm.password"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            label="Contraseña"
            required
          />
            <v-btn
              class="mt-4"
              color="primary"
              width="400"
              :loading="loading"
              @click="login"
              >Iniciar sesión</v-btn
            >
        </v-form>
      </VCard>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { VCardTitle, VForm } from 'vuetify/lib/components/index.mjs';


const form = ref<VForm |null>(null);
const dataForm = reactive({
  email: "admin@gmail.com",
  password: "12345678",
})
const loading = ref(false);
const authStore = useAuthStore();
const showPassword = ref(false);
const router = useRouter();

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
const login = async() => {
  loading.value = true
  const {valid} = await form.value!.validate();
  if(!valid) return;
  await authStore.login(dataForm.email, dataForm.password)
  loading.value = false
  await navigateTo('/app/dashboard')
}


</script>

<style scoped>
.centrarDiv {
  display: grid;
  place-items: center;
  height: 80vh;
}
</style>
