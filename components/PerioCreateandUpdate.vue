<template>
  <v-container>
    <div class="centrarDiv">
      <VCard
        elevation="5"
        class="pa-5"
        width="400"
      >
        <VCardTitle class="text-center">
        {{ schoolTermObjectId ? "Actualizar Periodo" : "Crear Periodo"}}
        </VCardTitle>
        <v-form
          ref="form"
          fast-fail
          @submit="schoolTermObjectId ? updateSchoolTerm : createSchoolTerm"
        >
          <v-text-field
            variant="underlined"
            v-model="dataForm.name"
            label="Nombre Periodo"
            :rules="nameRules"
            required
          />

          <v-text-field
            variant="underlined"
            class="mt-3"
            v-model="dataForm.description"
            label="Descripcion"
            required
          />
          <v-card-actions class="justify-end">
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeModal"
            >
              Cerrar
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              :loading="loading"
              @click="schoolTermObjectId ? updateSchoolTerm() : createSchoolTerm()"
            >
              {{ schoolTermObjectId ? "Actualizar" : "Crear"  }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </VCard>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ISchoolTerm } from "types";
import { VCardTitle, VForm } from "vuetify/lib/components/index.mjs"
const schoolTerm = useSchoolTerm()
const loading = ref(false);

const props = defineProps({
  schoolTerm: Object as () => ISchoolTerm,
  closeModal: Function
})

const schoolTermObjectId = props.schoolTerm?._id
const closeModalCreate = props.closeModal

const form = ref<VForm | null>(null)
const dataForm = reactive({
  name: props.schoolTerm?.name || '',
  description: props.schoolTerm?.description || ''
})

const nameRules = [(value: any) => !!value || "El periodo es requerido"]

const createSchoolTerm = async () => {
  try {
    loading.value = true
    const { valid } = await form.value!.validate()
    if (!valid) return
    await schoolTerm.create(dataForm)
    loading.value = false
    if(closeModalCreate) props.closeModal()
  } catch (error) {
    console.log(error)
  } finally {
    await schoolTerm.getAll()
  }
}

const updateSchoolTerm = async () => {
  try {
    if(schoolTermObjectId) {
      loading.value = true
      await schoolTerm.update(schoolTermObjectId, dataForm)
      loading.value = true
    }
    if(closeModalCreate) props.closeModal()
  } catch (error) {
    console.log(error)
  } finally {
    await schoolTerm.getAll()
  }
}

</script>

<style scoped>
.centrarDiv {
  display: grid;
  place-items: center;
  height: 80vh;
}
</style>
