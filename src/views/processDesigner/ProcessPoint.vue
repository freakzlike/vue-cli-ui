<template>
  <div class="process-point__container">
    <div class="process-point border--all">
      <jst-row column>
        <v-spacer/>
        <div>
          <jst-row>
            <v-spacer/>
            <div>
              {{ text }}
            </div>
            <v-spacer/>
          </jst-row>
        </div>
        <v-spacer/>
      </jst-row>
    </div>
    <div v-if="hasTopEnd" class="process-point__end--top">
      <arrow-point top/>
    </div>
    <div v-if="hasBottomEnd" class="process-point__end--bottom">
      <arrow-point bottom/>
    </div>
    <div v-if="hasLeftEnd" class="process-point__end--left">
      <arrow-point left/>
    </div>
    <div v-if="hasRightEnd" class="process-point__end--right">
      <arrow-point right/>
    </div>
  </div>
</template>

<script>
  import ArrowPoint from '@/views/processDesigner/ArrowPoint'

  export default {
    name: 'ProcessPoint',
    components: {ArrowPoint},
    props: {
      text: {
        type: [String, Number],
        default: null
      },
      connections: {
        type: Object,
        default: null
      }
    },
    computed: {
      hasTopEnd () {
        return !!(this.connections && this.connections.top === 'end')
      },
      hasBottomEnd () {
        return !!(this.connections && this.connections.bottom === 'end')
      },
      hasLeftEnd () {
        return !!(this.connections && this.connections.left === 'end')
      },
      hasRightEnd () {
        return !!(this.connections && this.connections.right === 'end')
      }
    }
  }
</script>

<style lang="sass" scoped>
  $gutter-size: 100px
  $point-size: 80px
  $end-size: 20px
  $margin-size: ($gutter-size - $point-size) / 2

  .process-point
    background-color: var(--v-primary-base)
    width: $point-size
    height: $point-size
    border-radius: 50%
    padding: 16px
    margin: $margin-size
    position: relative
    z-index: 1

    &__container
      width: $gutter-size
      height: $gutter-size
      position: absolute

    &__end
      position: absolute
      width: $end-size
      height: $end-size
      z-index: 2

      &--top
        @extend .process-point__end
        top: 0
        left: ($gutter-size - $end-size) / 2

      &--bottom
        @extend .process-point__end
        top: $gutter-size - $end-size
        left: ($gutter-size - $end-size) / 2

      &--left
        @extend .process-point__end
        top: ($gutter-size - $end-size) / 2
        left: 0

      &--right
        @extend .process-point__end
        top: ($gutter-size - $end-size) / 2
        left: $gutter-size - $end-size
</style>
