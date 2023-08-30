<template>
  <v-row>
    <v-col md="2">
      <v-text-field label="Nombre/Cedula" v-model="search" />
    </v-col>
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
        v-model="selectedParallel"
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
  <v-btn @click="applyFilterListEnrollment">Filtrar</v-btn>
  <v-card v-if="listEnrollment" class="mt-2">
    <v-table>
      <thead>
        <tr>
          <th v-for="header in headers">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="filteredEnrollment">
        <tr v-for="enrollment in filteredEnrollment">
          <td>{{ enrollment?._student?.cedula }}</td>
          <td>{{ enrollment?._student?.fullName }}</td>
          <td>{{ (enrollment?._parallel?._grade?.name) + ' - ' + (enrollment?._parallel?.name) }}</td>
          <td>{{ enrollment?._student?.address }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script lang="ts" setup>
  const enrollmentStore = useEnrollmentStore();
  const schoolTerm = useSchoolTerm();
  const studentStore = useStudentStore()
  const search = ref('');
  const selectedSchoolTerm = ref('');
  const selectedParallel = ref('');
  const selectedStudent = ref('');
  const filteredEnrollment = ref();

  await schoolTerm.getAll();
  await studentStore.getAll();
  await enrollmentStore.getAll();
  const listEnrollment = computed(() => enrollmentStore.enrollments);
  const studentList = computed(() => studentStore.students);
  const schoolList = computed(() => schoolTerm.schools);

  const headers = [
    'Cedula',
    'Estudiante',
    'Paralelo',
    'Dirección',
  ]


  /*const filteredEnrollment = computed(() => {
    if (!search.value) {
      return listEnrollment.value;
    }
    const loweCaseSearch = search.value.toLowerCase();
    return listEnrollment.value.filter(enrollment => {
      const studentName = enrollment._student?.fullName.toLowerCase() || '';
      const studentDni = enrollment._student?.cedula || '';

      return studentName.includes(loweCaseSearch) || studentDni.includes(loweCaseSearch);
    });
  });*/

  interface CourseAndParallel {
    name: string;
    _id: string;
  }

  const courseAndParallelList = computed<CourseAndParallel[]>(() => {
    const uniqueCourseAndParallelNames: { [key: string]: CourseAndParallel } = {};
    listEnrollment.value.forEach(enrollment => {
      const courseName = enrollment._parallel?._grade?.name || 'no existe';
      const parallelName = enrollment._parallel?.name || 'no existe';
      const courseAndParallel = `${courseName} - ${parallelName}`;
      const courseId = enrollment._parallel?._id || '';

      uniqueCourseAndParallelNames[courseAndParallel] = {name: courseAndParallel, _id: courseId };
    });

    return Object.values(uniqueCourseAndParallelNames);
  });

  const sortedCourseAndParallel = computed(() => {
    return courseAndParallelList.value.slice().sort((a, b) => a.name.localeCompare(b.name))
  });
  
  async function applyFilterListEnrollment() {
    const filterEnrollements = listEnrollment.value.filter(enrollement => {
      const schoolTermSelected = !selectedSchoolTerm.value || selectedSchoolTerm.value === enrollement._parallel.schoolterm._id;
      const parallelSelected = !selectedParallel.value || selectedParallel.value === enrollement._parallel._id;
      const studentSelected = !selectedStudent.value || selectedStudent.value === enrollement._student._id

      return schoolTermSelected && parallelSelected && studentSelected;
    });
    filteredEnrollment.value = filterEnrollements;
  }
</script>