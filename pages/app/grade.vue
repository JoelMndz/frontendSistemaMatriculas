<template>
  <v-container>
    <v-btn class="mb-3" @click="openModalCreate">Crear Grado</v-btn>

    <v-dialog v-model="showDeleteConfirmation">
      <v-card
        width="300"
        class="mx-auto"
      >
        <v-card-title class="headline text-center">{{
          "Confirmar eliminación" 
        }}</v-card-title>
        <v-card-text class="text-center">
          ¿Está seguro de eliminar este curso?
        </v-card-text >
        
        <v-card-actions class="justify-end">
          <v-btn
            color="blue darken-1"
            :loading="loading"
            @click="deleteConfirmed"
          >
            Confirmar
          </v-btn>
          <v-btn
            color="red darken-1"
            @click="showDeleteConfirmation = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="openCreateView" transition="dialog-top-transition">
      <FormGrade :closeModal="closeModal" />
    </v-dialog>

    <v-dialog v-model="openUpdateView" transition="dialog-top-transition">
      <FormGrade :grade="gradeObject" :closeModal="closeModal" />
    </v-dialog>

    <v-dialog v-model="openGrade" max-width="400px">
      <v-card>
        <v-card-title> Materias de: {{ selectedGrade?.name }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-chip
            class="mx-1 my-1"
            v-for="(subject, index) in selectedGrade?.subjects"
            :key="index"
          >
            {{ subject }}
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="openGrade = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="mt-2">
      <v-col
        v-for="grade in gradeList"
        md="6"
        xl="4"
        cols="12"
        lg="4"
        sm="6"
        :key="grade._id"
      >
        <v-card class="flex-column">
          <v-row>
            <v-col>
              <v-card-title>{{ grade?.name }}</v-card-title>
              <v-card-subtitle>{{ grade.description }}</v-card-subtitle>
            </v-col>
            <v-col>
              <div class="text-end">
                <v-menu>
                  <template v-slot:activator="{ props: menu }">
                    <v-btn
                      elevation="0"
                      color="default"
                      icon
                      v-bind="mergeProps(menu)"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="openModalUpdate(grade)">
                      <v-list-item-title>Actualizar</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="showConfirmDeleteGrade(grade._id)">
                      <v-list-item-title>Eliminar</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
              @click="showSubjectInfo(grade)"
            >
              Materias
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mergeProps } from 'vue';
const openCreateView = ref(false);
const openUpdateView = ref(false);
const openGrade = ref(false);
const gradeObject = ref();
const gradeStore = useGrade();
const loading = ref(false);
const showDeleteConfirmation = ref(false)
const selectedGrade = ref();

await gradeStore.getAll();

const gradeList = computed(() => {
  return gradeStore.grades;
});

const openModalCreate = () => {
  openCreateView.value = true;
};

const closeModal = () => {
  openCreateView.value = false;
  openUpdateView.value = false;
  openGrade.value = false;
};

const openModalUpdate = (value: IGrade) => {
  gradeObject.value = value;
  openUpdateView.value = true;
};

const deteleGrade = async (id: string) => {
  try {
    loading.value = true;
    await gradeStore.delete(id);
    loading.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    await gradeStore.getAll();
  }
};

const showSubjectInfo = (grade: IGrade) => {
  selectedGrade.value = grade;
  openGrade.value = true;
};

const showConfirmDeleteGrade = (id: string) => {
  selectedGrade.value = id;
  showDeleteConfirmation.value = true;
};

const deleteConfirmed = async () => {
  showDeleteConfirmation.value = false;
  await deteleGrade(selectedGrade.value);
};
</script>