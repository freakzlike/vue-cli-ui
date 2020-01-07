import cu from '@/utils/common'
import SlotLoadingMixin from '@/mixins/SlotLoadingMixin'
import JstCircularLoading from '@/components/base/JstCircularLoading'

export default {
  name: 'jst-display-string-field',
  mixins: [SlotLoadingMixin],
  inheritAttrs: false,
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    isLoading () {
      return this.displayValue === cu.NO_VALUE
    }
  },
  asyncComputed: {
    displayValue: {
      default: cu.NO_VALUE,
      get () {
        return this.field.display
      }
    }
  },
  methods: {
    renderField (h) {
      return h('span', this.displayValue)
    },
    renderDefaultLoading (h) {
      return h(JstCircularLoading, {
        props: {
          inline: true
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
