<template>
  <v-app id="app">
    <main-view/>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
      'main-view': () => import('@/views/MainView')
    }
  }
</script>

<style lang="sass">
  @import './styles/main.sass'
</style>
