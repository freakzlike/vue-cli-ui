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

    <connection-point :connection="topConnection"
                      class="process-point__end--top"
                      top/>
    <connection-point :connection="bottomConnection"
                      class="process-point__end--bottom"
                      bottom/>
    <connection-point :connection="leftConnection"
                      class="process-point__end--left"
                      left/>
    <connection-point :connection="rightConnection"
                      class="process-point__end--right"
                      right/>
  </div>
</template>

<script>
  import ConnectionPoint from '@/views/processDesigner/ConnectionPoint'

  export default {
    name: 'ProcessPoint',
    components: {ConnectionPoint},
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
