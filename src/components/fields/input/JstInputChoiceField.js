import cu from '@/utils/common'
import {VAutocomplete} from 'vuetify/lib'
import JstInputStringField from './JstInputStringField'

export default {
  name: 'jst-input-choice-field',
  extends: JstInputStringField,
  inheritAttrs: false,
  computed: {
    isLoading () {
      return JstInputStringField.computed.isLoading.bind(this)() || !this.hasAllValue(this.choices)
    }
  },
  asyncComputed: {
    choices: {
      default: cu.NO_VALUE,
      get () {
        return this.field.choices
      }
    }
  },
  methods: {
    getRenderFieldProps () {
      return {
        props: {
          value: this.value,
          singleLine: this.singleLine,
          label: this.singleLine ? null : this.label,
          hint: this.hint,
          persistentHint: true,
          prefix: this.prefix || null,
          suffix: this.suffix || null,
          items: this.choices,
          noDataText: this.$i18n.t('no_data_found')
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
      return h(VAutocomplete, this.getRenderFieldProps())
    }
  }
}
