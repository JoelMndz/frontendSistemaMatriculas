<template>
  <div>
    <h2>Dashboard</h2>
    <pre>{{ data2 }}</pre>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/auth";


const authStore = useAuthStore()
//NO TOCAR
const data2 = computed(()=>authStore.data)
await authStore.loadData()
//await authStore.loadData()
// const {data} = await useLazyFetch('https://api.nuxtjs.dev/mountains')
// console.log('okkk',data.value);
// authStore.setData(data)
// watch(data,()=>{
//   console.log('Daata cambio',data);  
// })
// const { data, pending, error, refresh } = await useAsyncData(
//   'mountains',
//   () => $fetch('https://api.nuxtjs.dev/mountains')
// )
onMounted(async()=>{
  //await useFetch('https://api.nuxtjs.dev/mountains?a=1')
})

</script>

<style scoped>

</style>