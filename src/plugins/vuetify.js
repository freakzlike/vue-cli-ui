import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import {Ripple} from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Ripple
  }
})

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        anchor: '#212121',
        primary: '#448AFF',
        secondary: '#448AFF',
        accent: '#448AFF',
        error: '#D32F2F',
        info: '#4CAF50',
        success: '#4CAF50',
        warning: '#FFC107',

        cancel: '#D32F2F',
        header: '#3e464c',
        sidebar: '#ffffff',
        content: '#fafafa',
        dashlet: '#ffffff',
        border: '#e0e0e0',
        text: '#212121',
        selected: '#448AFF',
        hover: '#448AFF'
      },
      dark: {
        anchor: '#ffffff',
        primary: '#448AFF',
        secondary: '#448AFF',
        accent: '#448AFF',
        error: '#D32F2F',
        info: '#4CAF50',
        success: '#4CAF50',
        warning: '#FFC107',

        cancel: '#D32F2F',
        header: '#424242',
        sidebar: '#424242',
        content: '#303030',
        dashlet: '#424242',
        border: '#1f1f1f',
        text: '#ffffff',
        selected: '#448AFF',
        hover: '#448AFF'
      }
    }
  }
})
