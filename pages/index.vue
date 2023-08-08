<template>
  <VContainer>
    <section style="height: fit-content;" id="home">
      <HomeIndex />
    </section>
    <section style="height: fit-content;" id="vision">
      <VisionIndex />
    </section>
    <section style="height: fit-content;offset: 100;" id="mision">
      <MisionIndex />
    </section>
    <section style="height: 50vh;" id="history">
        <HistoryIndex />
    </section>
  </VContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "unauthorized",
});

</script>