<template>
  <VCard>
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
          <tr v-for="item in representatives" :key="item._id">
            <td>{{ item.fullName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.cedula }}</td>
            <td>
              <a :href="item.imageCedulaUrl" target="_blank">Ver</a>
            </td>
            <td>
              <VBtn 
                variant="text"
                color="error"
                icon="mdi-delete"
              />
              <VBtn 
                variant="text"
                color="warning"
                icon="mdi-pencil"
                @click="handleButtonEdit(item)"
              />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
const representativeStore = useRepresentativeStore()
const {setCurrentRepresentative,setShowForm} = representativeStore
const headers = [
  'Nombre completo',
  'Email',
  'Cédula',
  'Foto Cédula',
  'Acciones'
]
const representatives = computed(()=> representativeStore.representatives)

const handleButtonEdit = (representative:IRepresentative)=>{
  setCurrentRepresentative(representative)
  setShowForm(true)
}

await representativeStore.getAll()

</script>

<style scoped>

</style>