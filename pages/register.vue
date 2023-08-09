<template>
  <v-container>
    <div class="centrarDiv">
      <VCard
        elevation="5"
        class="pa-5"
        width="400"
      >
        <h3 class="text-center">Registrate Ahora</h3>

        <v-form
          @submit="register"
          class="mt-5"
          fast-fail
        >
          <v-text-field
            v-model="dataForm.name"
            label="Nombres"
            variant="underlined"
            required
          />

          <v-text-field
            v-model="dataForm.lastname"
            label="Apellidos"
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
            @click="register"
            width="400"
            >Regitrar</v-btn
          >

          <div class="mt-3">
            <NuxtLink
              class="text-decoration-none"
              to="/"
              >Iniciar Sesion</NuxtLink
            >
          </div>
        </v-form>
      </VCard>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const dataForm = reactive({
  name: "",
  lastname: "",
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
const register = () => {
  console.log(dataForm)
}
</script>

<style scoped>
.centrarDiv {
  display: grid;
  place-items: center;
  height: 80vh;
}
</style>
