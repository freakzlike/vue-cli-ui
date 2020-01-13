<template>
  <v-col class="column-gutter" :class="cssClasses">
    <template v-if="data">
      <process-point v-if="data.type === 0"
                     :text="x + '/' + y"/>

      <hub-point v-else-if="data.type === 1"/>
    </template>
    <filler-point v-else/>
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

        return classes
      },
      wrongCoord () {
        return Boolean(this.data && (this.x % 2 === 0 || this.y % 2 === 0))
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
      }
    }
  }
</script>

<style lang="sass" scoped>
  $normal-size: 80px
  $dense-size: 40px

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
</style>
