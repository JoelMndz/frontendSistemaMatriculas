<template>
  <v-container>
    <v-btn
      class="mb-3"
      @click="openModalCreate">
        Crear Grado
      </v-btn>

      <v-row>
        <v-col md="3">
          <v-select
            v-model="selectedYear"
            :items="schoolList"
            item-value="_id"
            item-title="name"
            @update:model-value=""
            label="Año electivo"/>
        </v-col>
      </v-row>

    <v-dialog v-model="showDeleteConfirmation">
      <v-card
        width="300"
        class="mx-auto">
        <v-card-title class="headline text-center">{{
          'Confirmar eliminación'
        }}</v-card-title>
        <v-card-text class="text-center">
          ¿Está seguro de eliminar este curso?
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            color="red darken-1"
            :disabled="loading"
            @click="showDeleteConfirmation = false">
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            @click="deleteConfirmed">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="openCreateView"
      transition="dialog-top-transition">
      <FormGrade :closeModal="closeModal" />
    </v-dialog>

    <v-dialog
      v-model="openUpdateView"
      transition="dialog-top-transition">
      <FormGrade
        :grade="gradeObject"
        :closeModal="closeModal"/>
    </v-dialog>

    <v-dialog
      v-model="openGrade"
      max-width="400px">
      <v-card>
        <v-card-title> Materias de: {{ selectedGrade?.name }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-chip
            class="mx-1 my-1"
            v-for="(subject, index) in selectedGrade.subjects"
            :key="index">
            {{ subject }}
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            @click="openGrade = false"
            >Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col
        v-for="grade in gradeList"
        md="6"
        xl="4"
        cols="12"
        lg="4"
        sm="6">
        <v-card height="170">
          <v-row>
            <v-col
              sm="9"
              md="9"
              cols="9">
              <v-card-title>{{ grade?.name }}</v-card-title>
              <v-card-subtitle>{{ grade.description }}</v-card-subtitle>
            </v-col>
            <v-col
              sm="3"
              md="3"
              cols="3">
              <div class="text-end">
                <v-menu>
                  <template v-slot:activator="{ props: menu }">
                    <v-btn
                      elevation="0"
                      color="default"
                      icon
                      v-bind="mergeProps(menu)">
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
            <v-col class="d-flex justify-end">
              <div
                v-for="parallel in grade.parallels"
                class="circleParallels">
                <v-card-title class="lellert">
                  {{ parallel.name }}
                </v-card-title>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
              @click="showSubjectInfo(grade)">
              Materias
            </v-btn>
            <v-btn
              color="orange-lighten-2"
              variant="text"
              @click="redirectParallel(grade)"
              class="text-decoration-none">
              Paralelos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { mergeProps } from 'vue'
  const openCreateView = ref(false);
  const openUpdateView = ref(false);
  const openGrade = ref(false);
  const gradeObject = ref();
  const gradeStore = useGrade();
  const loading = ref(false);
  const showDeleteConfirmation = ref(false);
  const selectedGrade = ref();
  const router = useRouter();
  const schoolTerm = useSchoolTerm();
  const selectedYear = ref();

  await schoolTerm.getAll();

  const gradeList = computed(() => gradeStore.grades);
  const schoolList = computed(() => schoolTerm.schools);
  const currentSchoolTerm = computed(() => schoolTerm.schoolCurrent)
  const defaultYear = currentSchoolTerm ? currentSchoolTerm.value!._id : null;

  if (currentSchoolTerm) {
    selectedYear.value = currentSchoolTerm.value!._id;
  }
  
  
  const openModalCreate = () => {
    openCreateView.value = true
  }

  const redirectParallel = (grade: IGrade) => {
    gradeStore.setCurretGrade(grade);
    router.push('/app/parallel');
  }

  const closeModal = () => {
    openCreateView.value = false;
    openUpdateView.value = false;
    openGrade.value = false;
  }

  const openModalUpdate = (value: IGrade) => {
    gradeObject.value = value;
    openUpdateView.value = true;
  }

  const deteleGrade = async (id: string) => {
    try {
      loading.value = true;
      await gradeStore.delete(id);
      loading.value = false;
    } catch (error) {
      console.log(error);
    }
  }

  const showSubjectInfo = (grade: IGrade) => {
    selectedGrade.value = grade;
    openGrade.value = true;
  }

  const showConfirmDeleteGrade = (id: string) => {
    selectedGrade.value = id;
    showDeleteConfirmation.value = true;
  }

  const deleteConfirmed = async () => {
    showDeleteConfirmation.value = false;
    await deteleGrade(selectedGrade.value);
  }

  if (defaultYear) {
    await gradeStore.getAll(defaultYear);
  }

watch(selectedYear, async (newSelectedYear) => {
  if (newSelectedYear) {
    await gradeStore.getAll(newSelectedYear);
  }
});
</script>

<style>
  .circleParallels {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #08ff94;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    font-weight: 50;
    font-size: 12px;
    margin-right: 5px;

    .lellert {
      font-size: 14px;
    }
  }
</style>
