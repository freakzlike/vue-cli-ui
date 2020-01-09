import cu from '@/utils/common'
import SlotLoadingMixin from '@/mixins/SlotLoadingMixin'
import InputFieldPropMixin from '../InputFieldPropMixin'
import {VSwitch} from 'vuetify/lib'

export default {
  name: 'jst-input-boolean-field',
  mixins: [SlotLoadingMixin, InputFieldPropMixin],
  inheritAttrs: false,
  data () {
    return {}
  },
  computed: {
    isLoading () {
      return !this.hasAllValue(this.value, this.label, this.hint)
    }
  },
  asyncComputed: {
    value: {
      default: cu.NO_VALUE,
      get () {
        return this.field.value
      }
    },
    label: {
      default: cu.NO_VALUE,
      get () {
        return this.singleLine ? null : this.field.label
      }
    },
    hint: {
      default: cu.NO_VALUE,
      get () {
        return this.field.hint
      }
    }
  },
  methods: {
    hasAllValue (...values) {
      return !values.some(value => value === cu.NO_VALUE)
    },
    getRenderFieldProps () {
      return {
        props: {
          inputValue: this.value,
          label: this.singleLine ? null : this.label,
          hint: this.hint,
          persistentHint: true
        },
        class: {
          'pt-5': !this.singleLine,
          'mt-1': !this.singleLine,
          'pt-1': this.singleLine,
          'mt-2': this.singleLine
        },
        on: {
          change: value => {
            this.field.value = value
            this.$emit('input', value)
          }
        }
      }
    },
    renderField (h) {
      return h(VSwitch, this.getRenderFieldProps())
    }
  },
  render (h) {
    if (this.isLoading) {
      return this.renderLoading(h)
    } else {
      return this.renderField(h)
    }
  }
}
