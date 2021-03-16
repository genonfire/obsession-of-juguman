<template>
  <v-container>

    <v-app-bar
      app
      flat
      color="white"
    >
      <v-btn
        class="pl-2 pr-2 mr-1"
        :to="{ name: 'demo' }"
      >
        Demo
      </v-btn>

      <v-btn
        class="pl-2 pr-2 ml-1"
        color="primary"
        :to="{ name: 'obsession' }"
      >
        Test
      </v-btn>

      <v-spacer></v-spacer>
      <h3>
        주구만의 집착
      </h3>
      <v-img
        src="@/assets/logo.png"
        max-width="40"
        class="ml-2"
      ></v-img>
    </v-app-bar>

  </v-container>
</template>

<script>
export default {
  name: 'AppBar',
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
