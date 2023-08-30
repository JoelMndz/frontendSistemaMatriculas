<template>
  <VContainer>
    <section id="home">
      <h2>Home</h2>
      <v-row no-gutters>
        <v-col
          sm="12"
          md="6"
          align-self="center"
          class="mt-3"
        >
          <h2 class="text-h1">
            IPT
            <span class="secctionHome">Bilingüe</span>
            Agua Fría #2
          </h2>
          <p class="mt-2 text-left">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
            eos adipisci doloremque autem, unde, dolore repellendus recusandae,
            minus sunt exercitationem facere voluptatibus. Expedita accusamus
            possimus illo debitis laudantium, vitae perferendis.
          </p>
        </v-col>
        <v-col
          sm="12"
          md="6"
        >
          <v-row>
            <v-col
              sm="6"
              md="6"
            >
              <v-img
                class="rounded-xl"
                :width="300"
                :height="350"
                cover
                src="https://i.pinimg.com/236x/79/e9/0c/79e90cb4d29b5a0e8472b3f62b4863fc.jpg"
              />
            </v-col>
            <v-col
              xs="12"
              sm="6"
            >
              <v-img
                class="rounded-xl"
                :width="300"
                height="250"
                cover
                src="https://i.pinimg.com/236x/79/e9/0c/79e90cb4d29b5a0e8472b3f62b4863fc.jpg"
              />
            </v-col>
            <v-col
              xs="6"
              sm="6"
            >
              <v-img
                class="rounded-xl"
                :width="300"
                height="450"
                cover
                src="https://i.pinimg.com/236x/79/e9/0c/79e90cb4d29b5a0e8472b3f62b4863fc.jpg"
              />
            </v-col>
            <v-col
              xs="6"
              sm="6"
            >
              <v-img
                class="rounded-xl"
                :width="300"
                height="350"
                cover
                src="https://i.pinimg.com/236x/79/e9/0c/79e90cb4d29b5a0e8472b3f62b4863fc.jpg"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>
    <section id="vision">
      <h2 class="mt-5">Visión</h2>
      <v-row class="mt-2">
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

              <!-- <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn> -->
            </v-card-actions>

            <!-- <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition> -->
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
            
          >
            <VCardText>
              Alcanzar la excelencia educativa con la práctica permanente de los
              valores, la conservación de nuestro medio ambiente y el desarrollo de
              proyectos científicos que motivan la formación integral de nuestros
              educandos.
            </VCardText>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section id="mision">
      <h2 class="mt-5">Misión</h2>
      <v-row class="mt-3">
        <v-col
          sm="12"
          md="6"
        >
          <v-card
            variant="tonal"
            class="text-justify elevation-5 rounded-xl rounded-be-0 pa-2"
          >
          <VCardText>
            Propiciar un proceso enseñanza-aprendizaje de calidad, basado en
            principios culturales, ambientales, tecnológicos, investigativos,
            morales, cívica y ética que fortalezcan la creación de equipos y las
            relaciones humanas necesarias para el éxito.
          </VCardText>
        </v-card>
        </v-col>
        <v-col
          sm="12"
          md="6"
        >
          <v-col>
            <h2 class="text-h2 text-right">
              Alcanza tus metas ahora!! <v-icon icon="mdi-party-popper" />
            </h2>
          </v-col>
        </v-col>
      </v-row>
    </section>
    <section id="history">
      <h2 class="mt-5">Historia</h2>
      <v-row class="mt-3">
        <v-col
          md="4"
          sm="12"
          xs="12"
        >
          <p
            class="text-subtitle-1 text-dark text-justify elevation-10 rounded-xl rounded-be-0 pa-2"
          >
            <v-icon icon="mdi-home" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            consequuntur repellendus sequi velit reiciendis commodi sunt minus
            cupiditate cumque at assumenda eaque iste recusandae voluptas
            placeat totam illum dicta. Aspernatur.
          </p>
        </v-col>
        <v-col
          md="4"
          sm="12"
          xs="12"
        >
          <p
            class="text-subtitle-1 text-dark text-justify elevation-10 rounded-xl rounded-be-0 pa-2"
          >
            <v-icon icon="mdi-home" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            consequuntur repellendus sequi velit reiciendis commodi sunt minus
            cupiditate cumque at assumenda eaque iste recusandae voluptas
            placeat totam illum dicta. Aspernatur.
          </p>
        </v-col>
        <v-col
          md="4"
          sm="12"
          xs="12"
        >
          <p
            class="text-subtitle-1 text-dark text-justify elevation-10 rounded-xl rounded-be-0 pa-2"
          >
            <v-icon icon="mdi-home" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            consequuntur repellendus sequi velit reiciendis commodi sunt minus
            cupiditate cumque at assumenda eaque iste recusandae voluptas
            placeat totam illum dicta. Aspernatur.
          </p>
        </v-col>
      </v-row>
    </section>
  </VContainer>
</template>

<script>
import { VCardText } from 'vuetify/lib/components/index.mjs';

// const show = ref(false)

</script>

<style scoped>
.secctionHome {
  font-size: 5rem;
  color: #bdb1f7;
}
</style>
