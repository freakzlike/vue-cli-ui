import {VRow} from 'vuetify/lib'

export default {
  name: 'jst-row',
  inheritAttrs: false,
  props: {
    gutter: {
      type: Boolean,
      default: false
    },
    column: {
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
    },
    cssClasses () {
      const classes = []

      if (this.column) {
        classes.push('fill-height', 'flex-column', 'flex-nowrap')
      }

      return classes
    }
  },
  render (h) {
    return h(VRow, {
      props: this.props,
      class: this.cssClasses,
      attrs: this.$attrs,
      on: this.$listeners
    }, this.$slots.default)
  }
}
