<template>

    <v-container>
      <v-row>
        <v-col cols="12">
          <HomepageForm/>
        </v-col>

      </v-row>
    </v-container>
  </template>
  
  <script>
  import HomepageForm from '../components/Homepage.vue'
  export default {
    components: {
      HomepageForm
    }
  }
  </script>