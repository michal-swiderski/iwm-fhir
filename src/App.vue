<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
                  alt="Vuetify Logo"
                  class="shrink mr-2"
                  contain
                  src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                  transition="scale-transition"
                  width="40"
          />
        </router-link>

        IWM FHIR
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
