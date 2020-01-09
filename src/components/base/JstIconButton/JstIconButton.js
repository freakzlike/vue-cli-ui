import cu from '@/utils/common'
import {VBtn, VIcon} from 'vuetify/lib'

import './JstIconButton.sass'
import JstTooltip from '../JstTooltip'

export default {
  name: 'jst-icon-button',
  inheritAttrs: false,
  props: {
    text: {
      type: [String, Number, Function],
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },

    color: {
      type: String,
      default: null
    },
    primary: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    btnColor () {
      if (this.color) return this.color
      if (this.primary) return 'primary'
      if (this.cancel) return 'cancel'
      if (this.success) return 'success'

      return null
    }
  },
  methods: {
    renderIcon (h) {
      return h(VIcon, {}, this.$slots.default || this.icon)
    },
    renderButton (h, listeners) {
      const _listeners = listeners ? cu.mergeDeep({}, this.$listeners, listeners) : this.$listeners

      return h(VBtn, {
        props: {
          color: this.btnColor,
          icon: true,
          small: !this.inline ? this.small : undefined,
          xSmall: this.inline || undefined
        },
        class: {
          'jst-icon-btn--inline': this.inline
        },
        attrs: this.$attrs,
        on: _listeners,
        scopedSlots: this.scopedSlots
      }, [this.renderIcon(h)])
    },
    renderTooltip (h) {
      return h(JstTooltip, {
        props: {
          text: this.text
        },
        scopedSlots: {
          default: scope => {
            return this.renderButton(h, scope.on)
          }
        }
      })
    }
  },
  render (h) {
    if (this.text) {
      return this.renderTooltip(h)
    } else {
      return this.renderButton(h)
    }
  }
}
