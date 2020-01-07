import {VBtn, VIcon} from 'vuetify/lib'

export default {
  name: 'jst-button',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: null
    },

    color: {
      type: String,
      default: null
    },
    cancel: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },

    leftIcon: {
      type: String,
      default: null
    },
    rightIcon: {
      type: String,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {
    btnColor () {
      if (this.color) return this.color
      if (this.cancel) return 'cancel'
      if (this.success) return 'success'

      return 'primary'
    }
  },
  methods: {
    renderIcon (h, props, icon) {
      return h(VIcon, {
        props: props
      }, icon)
    },
    renderDefaultSlot (h) {
      if (this.$slots.default) return this.$slots.default

      if (this.text && !this.leftIcon && !this.rightIcon) return this.text

      const slot = []
      if (this.leftIcon) {
        slot.push(this.renderIcon(h, {left: true}, this.leftIcon))
      }

      slot.push(this.text)

      if (this.rightIcon) {
        slot.push(this.renderIcon(h, {right: true}, this.rightIcon))
      }

      return slot
    }
  },
  render (h) {
    return h(VBtn, {
      props: {
        depressed: true,
        color: this.btnColor
      },
      attrs: this.$attrs,
      on: this.$listeners,
      scopedSlots: this.scopedSlots
    }, this.renderDefaultSlot(h))
  }
}
