<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { mergeProps } from 'vue';
const parallelStore = useParallelStore()
const schoolTerm = useSchoolTerm()
const gradeStore = useGrade();
const showModalDelete = ref(false);
const loading = ref(false);
const router = useRouter()

const parallelDelete = ref<IParallel | null>(null);
const modal = computed(() => parallelStore.showForm )
const currentParallel = computed(() =>  parallelStore.parallelCurrent)
const { gradeCurrent: currentGrade } = storeToRefs(gradeStore);
const { current: currentSchoolTerm } = storeToRefs(schoolTerm)

const parallelData = computed(() => {
  const currentGradeNew = {...currentGrade.value}
    currentGradeNew.parallels = currentGradeNew.parallels?.filter(item => 
      item.schoolterm && item.schoolterm._id === currentSchoolTerm.value
    )
  return currentGradeNew
})

const buttonAdd = () => {
  parallelStore.currentParallel(null);
  parallelStore.openModalParallel(true);
}

const openModalUpdate = (parallel: IParallel) => {
  parallelStore.currentParallel(parallel);
  parallelStore.openModalParallel(true);
}

const openConfirmeDelete = (professor: IParallel) => {
  parallelDelete.value = professor;
  showModalDelete.value = true;
}

const cancelDelete = () => {
  showModalDelete.value = false;
  parallelDelete.value = null;
} 

const buttonDelete = async () => {
  try {
    loading.value = true;
    if(parallelDelete.value?._id)
    await parallelStore.delete(parallelDelete.value?._id);
    loading.value = false;
    showModalDelete.value = false;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  if (!currentGrade.value) {
    router.push('/app/grade');
  }
})
</script>

<template>
  <VContainer>
    <VDialog v-model="modal" maxWidth="600px" transition="dialog-top-transition">
      <FormParallel :parallelModel="currentParallel" />
    </VDialog>
    <VRow>
      <VCol>
        <VBtn @click="buttonAdd">Crear Paralelo</VBtn>
      </VCol>
    </VRow>
        <VRow class="mt-2" v-if="parallelData">
          <VCol
            md="6"
            xl="4"
            cols="12"
            lg="4"
            sm="6"
            v-for="paralell in currentGrade?.parallels"
            :key="paralell._id">
            <v-card>
                <VRow>
                  <VCol sm="9" md="9" cols="9">
                    <v-card-title>Paralelo: {{ paralell?.name }}</v-card-title>
                    <v-card-subtitle class="text-subtitle-2 mb-3">Cupos: {{ paralell?.quotas }}</v-card-subtitle>
                    <v-card-subtitle
                      class="mb-2"
                      v-for="pro in paralell?.professors"> 
                      {{ pro?.fullName }}
                    </v-card-subtitle>
                  </VCol>
                  <VCol sm="3" md="3" cols="3">
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
                        <div>
                          <v-list>
                          <v-list-item @click="openModalUpdate(paralell)">
                            <v-list-item-title>Actualizar</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="openConfirmeDelete(paralell)">
                            <v-list-item-title>Eliminar</v-list-item-title>
                          </v-list-item>
                        </v-list>
                        </div>
                      </v-menu>
                    </div>
                  </VCol>
              </VRow>
            </v-card>
          </VCol>
        </VRow>
    <VDialog
      persistent
      max-width="450px"
      v-model="showModalDelete">
        <v-card
          width="300"
          class="mx-auto">
          <v-card-title class="headline text-center">
            Confirmar eliminación
          </v-card-title>
          <v-card-text class="text-center">
            ¿Está seguro de eliminar este paralelo?
          </v-card-text>
          
          <v-card-actions class="justify-end">
            <v-btn
              color="red darken-1"
              :disabled="loading"
              @click="cancelDelete">
              Cancelar
            </v-btn>
            <v-btn
              color="blue darken-1"
              :loading="loading"
              @click="buttonDelete">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
    </VDialog>
  </VContainer>
</template>