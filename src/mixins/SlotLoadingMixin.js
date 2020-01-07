export default {
  computed: {
    hasLoadingSlot () {
      return Boolean(this.$scopedSlots.loading || this.$slots.loading)
    }
  },
  methods: {
    renderLoading (h) {
      if (this.hasLoadingSlot) {
        return this.renderSlotLoading(h)
      } else {
        return this.renderDefaultLoading(h)
      }
    },
    renderSlotLoading (h, ...args) {
      if (this.$scopedSlots.loading) {
        return h('div', this.$scopedSlots.loading(...args))
      } else if (this.$slots.loading) {
        return h('div', this.$slots.loading)
      }
    },
    renderDefaultLoading (h) {
    },
    attachLoadingSlot (h) {
      if (this.hasLoadingSlot) {
        return {
          loading: (...args) => this.renderSlotLoading(h, ...args)
        }
      } else {
        return {}
      }
    }
  }
}
