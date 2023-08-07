<template>
  <VContainer>
    <section style="height: 50vh;" id="home">
        <h2>Home</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nesciunt voluptatibus, ullam minus a, rem rerum maxime officia vero nobis et autem adipisci aliquam, incidunt magnam corrupti ex sunt optio.</p>
    </section>
    <section style="height: 50vh;" id="vision">
        <h2>Visión</h2>
        <p>Texto sobre la visión de tu empresa...</p>
    </section>
    <section style="height: 50vh;offset: 100;" id="mision">
      <h2>Misión</h2>
      <p>Texto sobre la misión de tu empresa...</p>
    </section>
    <section style="height: 50vh;" id="history">
        <h2>Historia</h2>
        <p>Texto sobre la historia de tu empresa...</p>
    </section>
  </VContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "unauthorized",
});

</script>
