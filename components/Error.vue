<template>
  <VAlert
    v-if="error"
    color="error"
    :title="error?.title ?? 'Error'"
    :text="error?.message"
  >
  <template v-slot:append>
    <VBtn
      variant="text"
      icon="mdi-close"
      @click="errorStore.resetError()"
    />
  </template>
  </VAlert>
</template>

<script setup lang="ts">

const errorStore = useErrorStore()
const error = computed(()=> errorStore.error)
error.value?.message

</script>

<style scoped>

</style>