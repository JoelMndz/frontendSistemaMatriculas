<template>
  <VNavigationDrawer
    expand-on-hover
    rail
    permanent
  >
    <VListItem
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      :title="data?.user?.name!"
      nav
    >
    </VListItem>

    <VDivider />

    <VList>
      <template
        v-for="i in items"
        :key="i.name"
      >
        <VListItem
          v-if="i?.role !== 'admin' || i?.role === 'admin' &&  (data as any)?.role === 'admin'"
          link
          :to="i.route"
          :prepend-icon="i.icon"
          :title="i.name"
          :value="i.name"
          @click="$router.push(i.route)"
        />
      </template>
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">

const {data} = useAuth()

const items = [
  {
    name: 'Dashboard',
    route: '/app/dashboard',
    icon: 'mdi-home-city'
  },
  {
    name: 'Usuarios',
    route: '/app/user',
    icon: 'mdi-home-city',
    role: 'admin'
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
    route: '/app/enrollment',
    icon: 'mdi-account-check'
  },
  {
    name: 'Curso',
    route: '/app/grade',
    icon: 'mdi-account-school'
  },
  {
    name: 'Periodo Lectivo',
    route: '/app/schoolterm',
    icon: 'mdi-school'
  }
]
</script>

<style scoped></style>
