import SlotLoadingMixin from '@/mixins/SlotLoadingMixin'

export default {
  name: 'jst-display-field',
  inheritAttrs: false,
  mixins: [SlotLoadingMixin],
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  asyncComputed: {
    async component () {
      return this.field.displayComponent.then(mod => mod.default)
    }
  },
  methods: {
    renderComponent (h) {
      return h(this.component, {
        props: {
          field: this.field
        },
        scopedSlots: {
          ...this.attachLoadingSlot(h)
        }
      })
    }
  },
  render (h) {
    if (this.component) {
      return this.renderComponent(h)
    } else {
      return this.renderLoading(h)
    }
  }
}
