<template>
  <VDialog
    persistent
    max-width="450px"
    v-model="showModalDelete">
    <v-card
        width="300"
        class="mx-auto">
        <v-card-title class="headline text-center">{{
          "Confirmar eliminación" 
        }}</v-card-title>
        <v-card-text class="text-center">
          ¿Está seguro de eliminar esta matricula?
        </v-card-text >
        
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
  <v-row>
    <v-col md="2">
      <v-autocomplete 
        label="Filtrar por periodo" 
        :items="schoolTermActual"
        item-title="name"
        item-value="_id"
        v-model="selectedSchoolTerm"/>
    </v-col>
    <v-col md="3">
      <v-autocomplete 
        label="Filtrar por paralelo" 
        :items="filteredParallels"
        v-model="selectedParallel"
        item-title="name"
        :disabled="!selectedSchoolTerm"
        item-value="_id"/>
    </v-col>
    <v-col md="2">
      <v-autocomplete 
        label="Filtrar por estudiante" 
        :items="filteredStudents"
        item-title="fullName"
        item-value="_id"
        v-model="selectedStudent"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn 
        @click="resetFilters" 
        color="primary" 
        class="mx-1"
        :disabled="isResetButtonDisabled">
          Limpiar
        </v-btn>
        
      <v-btn 
        color="primary" 
        @click="applyFilters">
          Filtrar
        </v-btn>
    </v-col>
  </v-row>
  <v-card v-if="listEnrollment" class="mt-2" >
    <v-table height="500px" fixed-header>
      <thead>
        <tr>
          <th v-for="header in headers">
            {{ header }}  
          </th>
        </tr>
      </thead>
      <tbody v-if="filteredEnrollment">
        <tr v-for="enrollment in filteredEnrollment">
          <td>{{ enrollment!._student!.cedula }}</td>
          <td>{{ enrollment!._student!.fullName }}</td>
          <td>{{ (enrollment!._parallel!._grade!.name) + ' - ' + (enrollment!._parallel!.name) }}</td>
          <td>{{ enrollment!._parallel!._schoolTerm!.name }}</td>
          <td>{{ enrollment!._student!.address }}</td>
          <td>{{ formatDate(enrollment!.date) }}</td>
          <td>
          <VIcon color="red" class="mx-1" icon="mdi-delete-alert" @click="openConfirmeDelete(enrollment)" />
        </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script lang="ts" setup>
  import { formatDate } from '../utils/convertToBase64'
  const enrollmentStore = useEnrollmentStore();
  const schoolTerm = useSchoolTerm();
  const studentStore = useStudentStore();
  const selectedParallel = ref('');
  const selectedSchoolTerm = ref('');
  const selectedStudent = ref('');
  const filteredEnrollment = ref();
  const showModalDelete = ref(false);
  const loading = ref(false);

  await schoolTerm.getAll();
  await studentStore.getAll();
  await enrollmentStore.getAll();
  const listEnrollment = computed(() => enrollmentStore.enrollments);
  const studentList = computed(() => studentStore.students);
  const schoolList = computed(() => schoolTerm.schools);

  const resetFilters = () => {
    selectedSchoolTerm.value = '';
    selectedParallel.value = '';
    selectedStudent.value = '';
  }

  const isResetButtonDisabled = computed(() => {
    return !selectedSchoolTerm.value && !selectedParallel.value && !selectedStudent.value;
  });

  const headers = [
    'Cedula',
    'Estudiante',
    'Paralelo',
    'Periodo',
    'Dirección',
    'Fecha de matricula',
    'Acciones'
  ]

  const enrollmentDelete = ref<IEnrollment | null>(null);
  const openConfirmeDelete = (enrollement: IEnrollment) => {
    enrollmentDelete.value = enrollement;
    showModalDelete.value = true;
  }

  const cancelDelete = () => {
    showModalDelete.value = false;
    enrollmentDelete.value = null;
  } 

  const buttonDelete = async () => {
    try {
      loading.value = true;
      if(enrollmentDelete.value?._id)
      await enrollmentStore.delete(enrollmentDelete.value?._id);
      loading.value = false;
      showModalDelete.value = false;
    } catch (error) {
      console.log(error);
    } 
  }

  async function applyFilterListEnrollment() {
    const filteredEnrollmentsBySchoolTerm = listEnrollment.value.filter(enrollment => {
      const schoolTermId = selectedSchoolTerm.value;
      const enrollmentSchoolTermId = enrollment?._parallel?._schoolTerm?._id;
      return !schoolTermId || schoolTermId === enrollmentSchoolTermId;
    });

    const filteredEnrollmentsByParallel = filteredEnrollmentsBySchoolTerm.filter(enrollment => { 
      const parallelId = selectedParallel.value;
      const enrollmentParallelId = enrollment?._parallel?._id;
      return !parallelId || parallelId === enrollmentParallelId;
    });

    const filteredEnrollmentsByStudent = filteredEnrollmentsByParallel.filter(enrollment => {
      const studentId = selectedStudent.value;
      const enrollmentStudentId = enrollment?._student?._id;
      return !studentId || studentId === enrollmentStudentId;
    });

    filteredEnrollment.value = filteredEnrollmentsByStudent.sort((a, b) => {
      const order = `${a?._parallel?._grade?.name || 'n/a'} - ${a?._parallel?.name || 'n/a'}`;
      const order1 = `${b?._parallel?._grade?.name || 'n/a'} - ${b?._parallel?.name || 'n/a'}`;
      return order.localeCompare(order1);
    });
  }

  const schoolTermActual = computed(() => {
    return schoolList.value.map(term =>{
      const schoolName = term?.name;
      const isCurrent = term?.current ? ('Periodo actual') : '';
      const join = `${schoolName} ${isCurrent}`
      const idSchoolTerm = term?._id;
      return { name: join, _id: idSchoolTerm };
    });
  })

  const applyFilters = () => {
    applyFilterListEnrollment();
  };

  const filteredParallels = computed(() => {
    if (selectedSchoolTerm) {
      const termId = selectedSchoolTerm;
      return listEnrollment.value.filter(enrollment => {
        return enrollment?._parallel?._schoolTerm._id === termId.value;
      }).map(enrollment => {
        const courseName = enrollment._parallel._grade.name;
        const parallelName = enrollment._parallel.name;
        const yearParallel = enrollment?._parallel?._schoolTerm.name || 'n/a'
        const displayName = `${courseName} - ${parallelName} - ${yearParallel}`;
        return {
          _id: enrollment._parallel._id,
          name: displayName,
          schoolTermId: enrollment._parallel._schoolTerm._id
        };
      });
    } else {
      return [];
    }
  });

  const filteredStudents = computed(() => {
    if (selectedParallel.value) {
      const parallelId = selectedParallel.value;
      return listEnrollment.value
        .filter(enrollment => enrollment._parallel._id === parallelId)
        .map(enrollment => enrollment._student);
    } else {
      return studentList.value;
    }
  });

  onMounted(() => {
    applyFilterListEnrollment();
  });

  watch(selectedSchoolTerm, () => {
    selectedParallel.value = '';
  });

  watch(selectedParallel, () => {
    selectedStudent.value = '';
  });

  watch(listEnrollment, () => {
    applyFilterListEnrollment();
  })
</script>