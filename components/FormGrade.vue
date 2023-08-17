<template>
  <v-container>
    <div class="centerDiv">
      <VCard 
        elevation="5"
        width="400"
        class="pa-5">
          <VCardTitle class="text-center">
            {{ gradeObjectId ? "Actualizar Periodo" : "Crear Periodo"}}
          </VCardTitle>
          
        <v-form
          ref="form" 
          @submit="gradeObjectId ? updateGrade : createGrade"
          fast-fail>
        
          <v-text-field
            v-model="dataForm.name"
            :rules="nameRules"
            label="Nombre del curso"
            variant="underlined" />

          <v-text-field
            v-model="dataForm.description"
            label="Descripcion"
            variant="underlined" />

          <v-chip 
            class="mr-1 mb-1" 
            closable
            @click:close="removeSubject(index)"
            v-for="(subject, index) in dataForm.subjects" 
            :key="index">
              {{ subject }}
          </v-chip>

          <v-text-field
            @focus="handleSubjectInputFocus"
            @blur="handleSubjectInputBlur"
            v-model="newSubject"
            label="Agregar Materia"
            :rules="subjectRules"
            @keyup.enter="addSubject"
            variant="underlined" />

          <v-card-actions class="justify-end">
            <v-btn color="red-darken-1" :disabled="loading" @click="closeModal" >
              Cerrar
            </v-btn>
            <v-btn 
              color="blue-darken-1" 
                :loading="loading" 
                @click="gradeObjectId ? updateGrade() : createGrade()" >
                {{ gradeObjectId ? "Actualizar" : "Crear" }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </VCard>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { VForm } from "vuetify/lib/components/index.mjs"
const newSubject = ref('');
const grade = useGrade();
const isSubjectInputFocused = ref(false);
const loading = ref(false);

const props = defineProps({
  grade: Object as () => IGrade,
  closeModal: Function
})

const gradeObjectId = props.grade?._id
const closeModalCreate = props.closeModal

const form = ref<VForm | null>(null)
const dataForm = reactive({
  name: props.grade?.name || '',
  description: props.grade?.description || '',
  subjects: props.grade?.subjects || [] as string[]
})

const nameRules = [(value: any) => !!value || "El nombre es requerido"]
const subjectRules = [(value: any) => (!!value || dataForm.subjects.length > 0 ) || "Materia requerida"]

const handleSubjectInputFocus = () => {
  isSubjectInputFocused.value = true;
};

const handleSubjectInputBlur = () => {
  isSubjectInputFocused.value = false;
};

const createGrade = async () => {
  try {
    loading.value = true;
    const { valid } = await form.value!.validate();
    if(!valid) return;
    await grade.create(dataForm);
    loading.value = false;
    if(closeModalCreate) props.closeModal();
  } catch (error) {
    console.log(error, 'error while creating the grade');
  } finally {
    await grade.getAll();
  }
}

const updateGrade = async () => {
  try {
    if(gradeObjectId) {
      loading.value = true;
      const { valid } = await form.value!.validate();
      if(!valid) return;
      await grade.update(gradeObjectId, dataForm)
      loading.value = false;
    }
    if(closeModalCreate) props.closeModal()
  } catch (error) {
    console.log(error, 'error updating the grade ');
  } finally {
    await grade.getAll()
  }
}

const addSubject = () => {
  if (newSubject.value.trim()) {
    if(!dataForm.subjects.includes(newSubject.value)){
      dataForm.subjects.push(newSubject.value);
    }
    newSubject.value = '';
  }
};

const removeSubject = (index: number) => {
  if (index >= 0 && index < dataForm.subjects.length) {
    dataForm.subjects.splice(index, 1);
  }
}

</script>


<style>
.centerDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>