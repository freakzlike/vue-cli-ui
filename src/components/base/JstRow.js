import {VRow} from 'vuetify/lib'

export default {
  name: 'jst-row',
  inheritAttrs: false,
  props: {
    gutter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    props () {
      const props = {}

      if (this.gutter) {
        props['dense'] = true
      } else {
        props['no-gutters'] = true
      }

      return props
    }
  },
  render (h) {
    return h(VRow, {
      props: this.props,
      attrs: this.$attrs,
      on: this.$listeners
    }, this.$slots.default)
  }
}
