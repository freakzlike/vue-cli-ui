import SlotLoadingMixin from '@/mixins/SlotLoadingMixin'
import InputFieldPropMixin from './InputFieldPropMixin'
import JstDisplayField from './JstDisplayField'

export default {
  name: 'jst-input-field',
  inheritAttrs: false,
  mixins: [SlotLoadingMixin, InputFieldPropMixin],
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  asyncComputed: {
    async component () {
      return this.field.inputComponent.then(mod => mod.default)
    }
  },
  methods: {
    renderComponent (h) {
      return h(this.component, {
        props: {
          field: this.field,
          singleLine: this.singleLine
        },
        scopedSlots: {
          ...this.attachLoadingSlot(h)
        },
        on: {
          input: value => this.$emit('input', value)
        }
      })
    },
    renderReadOnly (h) {
      return h(JstDisplayField, {
        props: {
          field: this.field
        }
      })
    }
  },
  render (h) {
    if (this.readonly) {
      return this.renderReadOnly(h)
    } else if (this.component) {
      return this.renderComponent(h)
    } else {
      return this.renderLoading(h)
    }
  }
}
