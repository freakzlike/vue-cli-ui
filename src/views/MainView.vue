<template>
  <v-container fluid>
    <v-row>
      <span>{{ renderTime }}</span>
    </v-row>
    <v-row class="mb-2">
      <a class="mx-2" @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        Toggle Theme
      </a>
      <router-link class="mx-2" :to="{name: 'BaseComponentsView'}">BaseComponents</router-link>
      <router-link class="mx-2" :to="{name: 'FieldComponentsView'}">FieldComponents</router-link>
    </v-row>
    <router-view :key="$route.fullPath"/>
  </v-container>
</template>

<script>
  export default {
    name: 'MainView',
    data () {
      return {
        renderTime: this.$moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
      }
    },
    methods: {
      async sendRequest () {
        const data = await this.$store.dispatch('environment/getData')
        console.log('data', data)
      }
    }
  }
</script>
