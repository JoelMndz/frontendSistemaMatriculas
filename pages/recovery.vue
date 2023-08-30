<template>
  <VContainer class="centrarDiv">
    <FormSendCode v-if="!sendedCode" />
    <FormVerifyCode v-else/>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const recoveryStore = useRecoveryStore()
const {sendedCode} = storeToRefs(recoveryStore)

onUnmounted(()=>{
  recoveryStore.resetData()
})
</script>

<style scoped>
.centrarDiv {
  display: grid;
  place-items: center;
  height: 80vh;
}
</style>