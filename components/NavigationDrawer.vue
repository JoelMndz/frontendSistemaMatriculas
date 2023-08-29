<template>
  <VNavigationDrawer
    expand-on-hover
    rail
    permanent
  >
    <VListItem
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="Tommy Precidio"
      nav
    >
    </VListItem>

    <VDivider />

    <VList>
      <VListItem
        v-for="i in items"
        :key="i.name"
        link
        :to="i.route"
        :prepend-icon="i.icon"
        :title="i.name"
        :value="i.name"
        @click="$router.push(i.route)"
      />
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
const items = [
  {
    name: 'Dashboard',
    route: '/app/dashboard',
    icon: 'mdi-home-city'
  },
  {
    name: 'Usuarios',
    route: '/app/user',
    icon: 'mdi-home-city'
  },
  {
    name: 'Estudiantes',
    route: '/app/student',
    icon: 'mdi-home-city'
  },
  {
    name: 'Acudientes',
    route: '/app/representative',
    icon: 'mdi-account-group'
  },
  {
    name: 'Profesores',
    route: '/app/professor',
    icon: 'mdi-human-male-board-poll'
  },
  {
    name: 'Matrícula',
    route: '/',
    icon: 'mdi-home-city'
  },
  {
    name: 'Curso',
    route: '/app/grade',
    icon: 'mdi-home-city'
  },
  {
    name: 'Periodo Lectivo',
    route: '/app/schoolterm',
    icon: 'mdi-school'
  }
]
</script>

<style scoped></style>
