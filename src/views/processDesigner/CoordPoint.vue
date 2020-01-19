<template>
  <v-col class="column-gutter" :class="cssClasses">
    <div v-if="verticalConnections" :class="verticalConnectionClasses"/>
    <div v-if="horizontalConnections" :class="horizontalConnectionClasses"/>

    <template v-if="data">
      <process-point v-if="data.type === 0"
                     :text="x + '/' + y"
                     :connections="pointConnections"/>

      <hub-point v-else-if="data.type === 1"
                 :connections="pointConnections"/>
    </template>
    <filler-point v-else @click="fillerPointClick"/>
  </v-col>
</template>

<script>
  import ProcessPoint from '@/views/processDesigner/ProcessPoint'
  import HubPoint from '@/views/processDesigner/HubPoint'
  import FillerPoint from '@/views/processDesigner/FillerPoint'

  export default {
    name: 'CoordPoint',
    components: {
      ProcessPoint,
      HubPoint,
      FillerPoint
    },
    props: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
      data: {
        type: Object,
        default: null
      },
      isMainColumn: {
        type: Boolean,
        default: false
      },
      connections: {
        type: Array,
        default: null
      }
    },
    computed: {
      cssClasses () {
        const classes = ['column-gutter']

        if (this.isMainColumn) {
          classes.push('main-column')
        }

        if (this.x % 2 === 0) {
          classes.push('dense-column')
        }

        if (this.y % 2 === 0) {
          classes.push('dense-row')
        }

        if (this.verticalConnections || this.horizontalConnections) {
          classes.push('has-connection')
        }

        return classes
      },
      wrongCoord () {
        return Boolean(this.data && (this.x % 2 === 0 || this.y % 2 === 0))
      },
      verticalConnections () {
        if (!this.connections || !this.connections.length) return null

        const connections = this.connections.filter(connection =>
          connection.start.x === this.x && connection.end.x === this.x &&
          this.compareCoord(connection.start.y, connection.end.y, this.y))
        return connections && connections.length ? connections : null
      },
      verticalConnectionClasses () {
        if (!this.verticalConnections) return null

        const classes = ['connection-line', 'connection-line--vertical']

        const onlyTop = this.verticalConnections.some(connection =>
          (connection.start.y === this.y && connection.end.y < this.y) ||
          (connection.end.y === this.y && connection.start.y < this.y)
        )

        const onlyBottom = this.verticalConnections.some(connection =>
          (connection.start.y === this.y && connection.end.y > this.y) ||
          (connection.end.y === this.y && connection.start.y > this.y)
        )

        if (onlyTop && !onlyBottom) {
          classes.push('connection-line--vertical--top')
        } else if (onlyBottom && !onlyTop) {
          classes.push('connection-line--vertical--bottom')
        }

        return classes
      },
      horizontalConnections () {
        if (!this.connections || !this.connections.length) return null

        const connections = this.connections.filter(connection =>
          connection.start.y === this.y && connection.end.y === this.y &&
          this.compareCoord(connection.start.x, connection.end.x, this.x))
        return connections && connections.length ? connections : null
      },
      horizontalConnectionClasses () {
        if (!this.horizontalConnections) return null

        const classes = ['connection-line', 'connection-line--horizontal']

        const onlyLeft = this.horizontalConnections.some(connection =>
          (connection.start.x === this.x && connection.end.x < this.x) ||
          (connection.end.x === this.x && connection.start.x < this.x)
        )

        const onlyRight = this.horizontalConnections.some(connection =>
          (connection.start.x === this.x && connection.end.x > this.x) ||
          (connection.end.x === this.x && connection.start.x > this.x)
        )

        if (onlyRight && !onlyLeft) {
          classes.push('connection-line--horizontal--right')
        } else if (onlyLeft && !onlyRight) {
          classes.push('connection-line--horizontal--left')
        }

        return classes
      },
      pointConnections () {
        if (!this.data || (!this.verticalConnections && !this.horizontalConnections)) return null
        const connectionPoints = {}

        if (this.verticalConnections) {
          this.verticalConnections.forEach(connection => {
            if (connection.start.y === this.y && connection.end.y < this.y) {
              connectionPoints['top'] = 'start'
            }
            if (connection.start.y === this.y && connection.end.y > this.y) {
              connectionPoints['bottom'] = 'start'
            }
            if (connection.end.y === this.y && connection.start.y < this.y) {
              connectionPoints['top'] = 'end'
            }
            if (connection.end.y === this.y && connection.start.y > this.y) {
              connectionPoints['bottom'] = 'end'
            }
          })
        }

        if (this.horizontalConnections) {
          this.horizontalConnections.forEach(connection => {
            if (connection.start.x === this.x && connection.end.x < this.x) {
              connectionPoints['left'] = 'start'
            }
            if (connection.start.x === this.x && connection.end.x > this.x) {
              connectionPoints['right'] = 'start'
            }
            if (connection.end.x === this.x && connection.start.x < this.x) {
              connectionPoints['left'] = 'end'
            }
            if (connection.end.x === this.x && connection.start.x > this.x) {
              connectionPoints['right'] = 'end'
            }
          })
        }

        return connectionPoints
      }
    },
    watch: {
      wrongCoord () {
        this.checkWrongCoord()
      }
    },
    created () {
      this.checkWrongCoord()
    },
    methods: {
      checkWrongCoord () {
        if (this.wrongCoord) {
          console.log('Data with invalid coord x/y', this.x, this.y, this.data)
        }
      },
      compareCoord (start, end, current) {
        return (start <= current && end >= current) || (start >= current && end <= current)
      },
      fillerPointClick () {
        this.$emit('click:filler-point', {x: this.x, y: this.y})
      }
    }
  }
</script>

<style lang="sass" scoped>
  $normal-size: 100px
  $dense-size: 30px
  $connection-size: 4px

  .column-gutter
    width: $normal-size
    min-width: $normal-size
    max-width: $normal-size
    height: $normal-size
    min-height: $normal-size
    max-height: $normal-size

    &.main-column
      background-color: rgba(0, 0, 0, 0.3)

    &.dense-column
      width: $dense-size
      min-width: $dense-size
      max-width: $dense-size

    &.dense-row
      height: $dense-size
      min-height: $dense-size
      max-height: $dense-size

    &.has-connection
      position: relative

    .connection-line
      background-color: var(--v-primary-darken2)
      position: absolute
      width: $connection-size
      height: $connection-size
      top: 0
      left: 0
      z-index: 0

      &--horizontal
        top: ($normal-size - $connection-size) / 2

        &.connection-line--horizontal--right
          left: $normal-size / 2

      &--vertical
        left: ($normal-size - $connection-size) / 2

        &.connection-line--vertical--bottom
          top: $normal-size / 2

    &:not(.dense-column)
      .connection-line--horizontal
        &:not(.connection-line--horizontal--left):not(.connection-line--horizontal--right)
          width: $normal-size

        &.connection-line--horizontal--left,
        &.connection-line--horizontal--right
          width: $normal-size / 2

    &.dense-column
      .connection-line--horizontal
        &:not(.connection-line--horizontal--left):not(.connection-line--horizontal--right)
          width: $dense-size

        &.connection-line--horizontal--left,
        &.connection-line--horizontal--right
          width: $dense-size / 2

    &:not(.dense-row)
      .connection-line--vertical
        &:not(.connection-line--vertical--top):not(.connection-line--vertical--bottom)
          height: $normal-size

        &.connection-line--vertical--top,
        &.connection-line--vertical--bottom
          height: $normal-size / 2

    &.dense-row
      .connection-line--vertical
        &:not(.connection-line--vertical--top):not(.connection-line--vertical--bottom)
          height: $dense-size

        &.connection-line--vertical--top,
        &.connection-line--vertical--bottom
          height: $dense-size / 2
</style>
