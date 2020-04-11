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
      <router-link class="mx-2" :to="{name: 'QuarkusIOView'}">Quarkus.io</router-link>
    </v-row>
    <router-view :key="$route.fullPath"/>
  </v-container>
</template>

<script>
  import {ServiceModel, fields} from 'vue-service-model'

  class Post extends ServiceModel {
    // Unique name to handle in vuex
    static keyName = 'AppPost'

    // Define service url
    static urls = {
      BASE: 'https://jsonplaceholder.typicode.com/posts/'
    }

    // Define field structure
    static fieldsDef = {
      id: new fields.Field(),
      userId: new fields.Field(),
      title: new fields.CharField({label: 'Title'}),
      body: new fields.CharField({label: 'Body'})
    }
  }

  export default {
    name: 'MainView',
    data () {
      return {
        renderTime: this.$moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
      }
    },
    created () {
      this.sendRequest()
    },
    methods: {
      async sendRequest () {
        const post = await Post.objects.get('1')
        console.log('post', post)
        const data = await this.$store.dispatch('environment/getData')
        console.log('data', data)
      }
    }
  }
</script>
