<template>
  <div class="hub-point__container">
    <div class="hub-point"/>
    <div v-if="hasTopEnd" class="hub-point__end--top">
      <arrow-point top/>
    </div>
    <div v-if="hasBottomEnd" class="hub-point__end--bottom">
      <arrow-point bottom/>
    </div>
    <div v-if="hasLeftEnd" class="hub-point__end--left">
      <arrow-point left/>
    </div>
    <div v-if="hasRightEnd" class="hub-point__end--right">
      <arrow-point right/>
    </div>
  </div>
</template>

<script>
  import ArrowPoint from '@/views/processDesigner/ArrowPoint'

  export default {
    name: 'HubPoint',
    components: {ArrowPoint},
    props: {
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
  $point-size: 20px
  $margin-size: ($gutter-size - $point-size) / 2

  .hub-point
    background-color: var(--v-primary-lighten2)
    width: $point-size
    height: $point-size
    border-radius: 50%
    margin: $margin-size
    position: relative
    z-index: 1

    &__container
      width: $gutter-size
      height: $gutter-size
      position: absolute

    &__end
      position: absolute
      width: $point-size
      height: $point-size

      &--top
        @extend .hub-point__end
        top: $margin-size - $point-size
        left: $margin-size
      &--bottom
        @extend .hub-point__end
        top: $margin-size + $point-size
        left: $margin-size
      &--left
        @extend .hub-point__end
        top: $margin-size
        left: $margin-size - $point-size
      &--right
        @extend .hub-point__end
        top: $margin-size
        left: $margin-size + $point-size
</style>
