<template>
  <v-row>
    <v-col md="2">
      <v-autocomplete 
        label="Filtrar por periodo" 
        :items="schoolList"
        item-title="name"
        item-value="_id"
        v-model="selectedSchoolTerm"/>
    </v-col>
    <v-col md="3">
      <v-autocomplete 
        label="Filtrar por paralelo" 
        :items="sortedCourseAndParallel"
        v-model="search"
        item-title="name"
        item-value="_id"/>
    </v-col>
    <v-col md="2">
      <v-autocomplete 
        label="Filtrar por estudiante" 
        :items="studentList"
        item-title="fullName"
        item-value="_id"
        v-model="selectedStudent"/>
    </v-col>
  </v-row>
  <v-btn @click="resetFilters" :disabled="isResetButtonDisabled">Limpiar</v-btn>
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
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script lang="ts" setup>
import moment from 'moment';

  const enrollmentStore = useEnrollmentStore();
  const schoolTerm = useSchoolTerm();
  const studentStore = useStudentStore()
  const search = ref('');
  const selectedSchoolTerm = ref('');
  const selectedStudent = ref('');
  const filteredEnrollment = ref();

  await schoolTerm.getAll();
  await studentStore.getAll();
  await enrollmentStore.getAll();
  const listEnrollment = computed(() => enrollmentStore.enrollments);
  const studentList = computed(() => studentStore.students);
  const schoolList = computed(() => schoolTerm.schools);

  const resetFilters = () => {
    selectedSchoolTerm.value = '';
    search.value = '';
    selectedStudent.value = '';
  }

  const isResetButtonDisabled = computed(() => {
    return !selectedSchoolTerm.value && !search.value && !selectedStudent.value;
  });

  const headers = [
    'Cedula',
    'Estudiante',
    'Paralelo',
    'Periodo',
    'Dirección',
    'Fecha de matricula'
  ]

  interface CourseAndParallel {
    name: string;
    _id: string;
  }

  const formatDate = (date: number) => {
    return moment(date).format('DD/MM/YYYY')
  }

  const courseAndParallelList = computed<CourseAndParallel[]>(() => {
    const uniqueCourseAndParallelNames: { [key: string]: CourseAndParallel } = {};
    listEnrollment.value.forEach(enrollment => {
      const courseName = enrollment?._parallel?._grade?.name || 'no existe';
      const parallelName = enrollment?._parallel?.name || 'no existe';
      const courseAndParallel = `${courseName} - ${parallelName}`;
      const courseId = enrollment?._parallel?._id || '';

      uniqueCourseAndParallelNames[courseAndParallel] = {name: courseAndParallel, _id: courseId };
    });

    return Object.values(uniqueCourseAndParallelNames);
  });

  const sortedCourseAndParallel = computed(() => {
    return courseAndParallelList.value.slice().sort((a, b) => a.name.localeCompare(b.name))
  });
  
  async function applyFilterListEnrollment() {
    const filterEnrollements = listEnrollment.value.filter(enrollement => {
      const schoolTermSelected = !selectedSchoolTerm.value || selectedSchoolTerm.value === enrollement?._parallel?._schoolTerm._id;
      const parallelSelected = !search.value || search.value === enrollement?._parallel?._id;
      const studentSelected = !selectedStudent.value || selectedStudent.value === enrollement?._student?._id

      return schoolTermSelected && parallelSelected && studentSelected;
    });
    filteredEnrollment.value = filterEnrollements.sort((a,b) => {
      const order = `${a?._parallel?._grade?.name || 'n/a'} - ${a?._parallel?.name || 'n/a'}`
      const order1 = `${b?._parallel?._grade?.name || 'n/a'} - ${b?._parallel?.name || 'n/a'}`
      return order.localeCompare(order1)
    })
  }

  watch([selectedSchoolTerm, search, selectedStudent], () => {
    applyFilterListEnrollment();
  });

  onMounted(() => {
    applyFilterListEnrollment();
  });
</script>