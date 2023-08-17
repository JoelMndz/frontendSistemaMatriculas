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
                @click="handleConfirm(item)"
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
  <VDialog
    v-model="showConfirmDelete"
    persistent
    max-width="450px"
  >
    <VCard>
      <VCardTitle>
        <p class="text-h4">Eliminar representante</p>
      </VCardTitle>
      <VCardText>
        ¿Estás seguro de eliminar a {{ representativeDelete?.fullName }}?
      </VCardText>
      <VCardActions>
        <VSpacer/>
        <VBtn 
          variant="text"
          color="blue-darken-1"
          @click="handleCancel"
          :disabled="loading"
        >Cancelar</VBtn>
        <VBtn 
          variant="text"
          color="blue-darken-1"
          type="submit"
          @click="handleDelete"
          :loading="loading"
        >Eliminar</VBtn> 
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
const representativeDelete = ref<IRepresentative | null>(null)
const showConfirmDelete = ref(false)
const loading = ref(false)
const headers = [
  'Nombre completo',
  'Email',
  'Cédula',
  'Foto Cédula',
  'Acciones'
]

const representativeStore = useRepresentativeStore()
const {setCurrentRepresentative,setShowForm} = representativeStore
const representatives = computed(()=> representativeStore.representatives)

const handleButtonEdit = (representative:IRepresentative)=>{
  setCurrentRepresentative(representative)
  setShowForm(true)
}

const handleConfirm = (representative:IRepresentative)=>{
  representativeDelete.value = representative
  showConfirmDelete.value = true
}

const handleCancel = ()=>{
  showConfirmDelete.value = false
  representativeDelete.value = null
}

const handleDelete = async()=>{
  loading.value = true
  await representativeStore.delete(representativeDelete.value!._id)
  loading.value = false
  showConfirmDelete.value = false
}

await representativeStore.getAll()

</script>

<style scoped>

</style>