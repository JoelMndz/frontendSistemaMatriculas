<template>
  <div>
    <h2>Dashboard</h2>
    <span>{{ authStore.counter }}</span>
    <button @click="authStore.data.length == 0?authStore.loadData():authStore.eliminar()">Incrementar</button>
    <pre>{{ authStore.data }}</pre>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/auth";

definePageMeta({
  layout: "authorized",
});

const authStore = useAuthStore()
const data = useState('data',()=>authStore.data)
//await authStore.loadData()
// await useAsyncData('qq',authStore.loadData);
const dataReactiva = computed(()=>authStore.data)
// const { data, pending, error, refresh } = await useAsyncData(
//   'mountains',
//   () => $fetch('https://api.nuxtjs.dev/mountains')
// )

onMounted(async()=>{
  await authStore.loadData()
  //await authStore.loadData()
  console.log('Mounted');
  
})

</script>

<style scoped>

</style>