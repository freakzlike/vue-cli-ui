<template>
  <v-tooltip :open-delay="500"
             :top="top"
             :right="right"
             :bottom="bottomPosition"
             :left="left"
             v-bind="$attrs"
             v-on="$listeners">
    <template v-slot:activator="{ on }">
      <slot :on="on"/>
    </template>

    <slot name="tooltip">
      <jst-circular-loading v-if="displayText === undefined" inline x-small/>
      <span v-else>
        {{ displayText }}
      </span>
    </slot>
  </v-tooltip>
</template>

<script>
  import cu from '@/utils/common'

  export default {
    name: 'jst-tooltip',
    props: {
      text: {
        type: [String, Number, Function],
        default: null
      },
      top: {
        type: Boolean,
        default: false
      },
      right: {
        type: Boolean,
        default: false
      },
      bottom: {
        type: Boolean,
        default: false
      },
      left: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      bottomPosition () {
        return this.bottom || (!this.top && !this.right && !this.left)
      }
    },
    asyncComputed: {
      displayText: {
        default: undefined,
        get () {
          return cu.eval(this.text)
        }
      }
    }
  }
</script>
