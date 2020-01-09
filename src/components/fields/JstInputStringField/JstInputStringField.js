import cu from '@/utils/common'
import SlotLoadingMixin from '@/mixins/SlotLoadingMixin'
import InputFieldPropMixin from '../InputFieldPropMixin'
import {VTextField} from 'vuetify/lib'

import './JstInputStringField.sass'

export default {
  name: 'jst-input-string-field',
  mixins: [SlotLoadingMixin, InputFieldPropMixin],
  inheritAttrs: false,
  data () {
    return {}
  },
  computed: {
    isLoading () {
      return !this.hasAllValue(this.value, this.label, this.hint, this.prefix, this.suffix)
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
    },
    prefix: {
      default: cu.NO_VALUE,
      get () {
        return this.field.prefix
      }
    },
    suffix: {
      default: cu.NO_VALUE,
      get () {
        return this.field.suffix
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
          value: this.value,
          singleLine: this.singleLine,
          label: this.singleLine ? null : this.label,
          hint: this.hint,
          persistentHint: true,
          prefix: this.prefix || null,
          suffix: this.suffix || null
        },
        class: {
          'pt-0': this.singleLine
        },
        on: {
          input: value => {
            this.field.value = value
            this.$emit('input', value)
          }
        }
      }
    },
    renderField (h) {
      return h(VTextField, this.getRenderFieldProps())
    },
    renderDefaultLoading (h) {
      return h('div', {
        class: {
          'jst-input-string-field__loading': true,
          'jst-input-string-field__loading--single-line': this.singleLine
        }
      })
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
