<template>
  <v-form
    @submit="login"
    class="mt-5"
  >
    <v-container>
      <h3 class="text-center">Inicio de sesion</h3>

      <v-row class="mt-5">
        <v-col
          cols="12"
          md="6"
          offset-md="3"
        >
          <v-text-field
            v-model="dataForm.email"
            type="email"
            label="Correo"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            class="mt-3"
            v-model="dataForm.password"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            label="Contraseña"
            required
          ></v-text-field>
          <v-btn
            color="primary"
            @click="login"
            >Iniciar sesión</v-btn
          >
          <div class="mt-3">
            <NuxtLink class="text-decoration-none" to="/">Registrar administrador</NuxtLink>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
const dataForm = reactive({
  password: "",
  email: ""
})

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
const login = () => {
  console.log(dataForm)
}
</script>
