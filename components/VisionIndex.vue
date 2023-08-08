<template>
  <h2 class="mt-5">Visión</h2>
  <v-row>
    <v-col
      md="4"
      sm="12"
    >
      <v-card
        class=""
        max-width="344"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          cover
        ></v-img>

        <v-card-title> Top western road trips </v-card-title>

        <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

        <v-card-actions>
          <v-btn
            color="orange-lighten-2"
            variant="text"
          >
            Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show = !show"
          ></v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he
              could deliver. You won't have time for sleeping, soldier, not with
              all the bed making you'll be doing. Then we'll go with that data
              file! Hey, you add a one and two zeros to that or we walk! You're
              going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
    <v-col
      align-self="center"
      md="8"
      sm="12"
    >
      <v-card
        variant="tonal"
        class="text-justify elevation-5 rounded-xl rounded-be-0 pa-2"
        text="Alcanzar la excelencia educativa con la práctica permanente de los
        valores, la conservación de nuestro medio ambiente y el desarrollo de
        proyectos científicos que motivan la formación integral de nuestros
        educandos."
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    show: false
  })
}
</script>
