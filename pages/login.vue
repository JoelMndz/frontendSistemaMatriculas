<template>
  <v-container>
    <div class="centrarDiv">
      <v-form @submit="login">
        <h3 class="text-center">Inicio de sesion</h3>
        <div class="mt-4">
          <v-card
            width="420"
            class="border"
          >
            <div class="centrarForm mt-3">
              <div class="inputs">
                <v-text-field
                  v-model="dataForm.email"
                  type="email"
                  label="Correo"
                  :rules="emailRules"
                  required
                />
              </div>

              <div class="inputs">
                <v-text-field
                  class="mt-3"
                  v-model="dataForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  label="Contraseña"
                  required
                />
              </div>
              <v-btn
                class="mt-4"
                color="primary"
                width="400"
                @click="login"
                >Iniciar sesión</v-btn
              >
              <div class="mt-3">
                <NuxtLink
                  class="text-decoration-none"
                  to="/"
                  >Registrar administrador</NuxtLink
                >
              </div>
            </div>
          </v-card>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const dataForm = reactive({
  password: "",
  email: ""
})
const authStore = useAuthStore();

const showPassword = ref(false)

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
  await authStore.login(dataForm.email, dataForm.password)
}

</script>

<style lang="postcss" scoped>
.inputs {
  width: 400px;
}
.centrarForm {
  display: grid;
  place-items: center;
}
.centrarDiv {
  display: grid;
  place-items: center;
  height: 80vh;
}
</style>
