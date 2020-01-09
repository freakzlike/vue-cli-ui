import {VProgressCircular} from 'vuetify/lib'
import './JstCircularLoading.sass'

export default {
  name: 'jst-circular-loading',
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    xSmall: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssClasses () {
      if (this.inline) {
        return 'jst-circular-loading--inline'
      } else {
        return null
      }
    },
    size () {
      if (this.xSmall) return 19
      if (this.inline) return 21
      if (this.small) return 24
      return 32
    },
    width () {
      if (this.xSmall) return 2
      if (this.inline) return 2
      if (this.small) return 3
      return 3
    }
  },
  methods: {
    renderProgress (h) {
      return h(VProgressCircular, {
        props: {
          indeterminate: true,
          color: 'primary',
          size: this.size,
          width: this.width
        },
        class: this.cssClasses
      })
    }
  },
  render (h) {
    return this.renderProgress(h)
  }
}
