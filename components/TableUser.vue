<template>
  <VCard elevation="3">
    <VCardText>
      <VTable>
        <thead>
          <tr>
            <th v-for="item in headers">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="i in users"
            :key="i._id">
            <td>{{ i.firstName }}  {{ i.lastName }}</td>
            <td>{{ i.email }}</td>
            <td>{{ i.role === 'secretary' ? 'secretaria' : i.role }}</td>
            <td>
              <VBtn 
                variant="text"
                color="error"
                icon="mdi-delete"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard >
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const {users} = storeToRefs(userStore)

const headers = [
  'Nombre completo',
  'Email',
  'Rol',
  'Acciones'
]


await userStore.getAll()
</script>

<style scoped>

</style>