<template>
  <v-progress-circular indeterminate
                       color="primary"
                       :size="size"
                       :width="width"
                       :class="cssClasses"/>
</template>

<script>
  export default {
    name: 'jst-circular-loading',
    props: {
      inline: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      xSmall: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      cssClasses () {
        if (this.inline) {
          return 'jst-circular-loading--inline'
        } else {
          return null
        }
      },
      size () {
        if (this.xSmall) return 19
        if (this.inline) return 21
        if (this.small) return 24
        return 32
      },
      width () {
        if (this.xSmall) return 2
        if (this.inline) return 2
        if (this.small) return 3
        return 3
      }
    }
  }
</script>
