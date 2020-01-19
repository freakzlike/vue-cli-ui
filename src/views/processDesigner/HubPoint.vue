<template>
  <div class="hub-point__container">
    <div class="hub-point"/>
    <connection-point :connection="topConnection"
                      class="hub-point__end--top"
                      top/>
    <connection-point :connection="bottomConnection"
                      class="hub-point__end--bottom"
                      bottom/>
    <connection-point :connection="leftConnection"
                      class="hub-point__end--left"
                      left/>
    <connection-point :connection="rightConnection"
                      class="hub-point__end--right"
                      right/>
  </div>
</template>

<script>
  import ConnectionPoint from '@/views/processDesigner/ConnectionPoint'

  export default {
    name: 'HubPoint',
    components: {ConnectionPoint},
    props: {
      connections: {
        type: Object,
        default: null
      }
    },
    computed: {
      topConnection () {
        return this.connections && this.connections.top ? this.connections.top : null
      },
      bottomConnection () {
        return this.connections && this.connections.bottom ? this.connections.bottom : null
      },
      leftConnection () {
        return this.connections && this.connections.left ? this.connections.left : null
      },
      rightConnection () {
        return this.connections && this.connections.right ? this.connections.right : null
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
