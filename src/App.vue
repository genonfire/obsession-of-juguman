<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container fluid>
        <v-fade-transition appear
          :hide-on-leave="true"
        >
          <router-view/>
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'

export default {
  name: 'App',
  components: {
    AppBar,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width:900px;
  width:100%;
  padding:12px;
  margin-left:auto;
  margin-right:auto;
}
</style>
