<template>
  <jst-row>
    <v-spacer/>
    <div>
      <jst-row class="row-gutter">
        <v-col class="column-gutter" :style="{'flex-grow': mainColumnX}"/>
        <v-col class="column-gutter main-column">
          <div class="start-point">
            Start
          </div>
        </v-col>
        <v-col class="column-gutter" :style="{'flex-grow': gutterCount.columns - mainColumnX - 1}"/>
      </jst-row>

      <template v-for="(rowData, rowIndex) in gutterData">
        <jst-row :key="rowIndex" class="row-gutter">
          <template v-for="(columnData, columnIndex) in rowData">
            <coord-point :key="rowIndex + '_' + columnIndex"
                         :x="columnIndex"
                         :y="rowIndex"
                         :data="columnData"
                         :is-main-column="mainColumnX === columnIndex"/>
          </template>
        </jst-row>
      </template>
    </div>
    <v-spacer/>
  </jst-row>
</template>

<script>
  import CoordPoint from '@/views/processDesigner/CoordPoint'

  export default {
    name: 'ProcessDesignerView',
    components: {
      CoordPoint
    },
    data () {
      return {
        mainColumnX: 3,
        workflowData: [
          {type: 0, text: '1', x: 3, y: 1},
          {type: 1, x: 5, y: 1},
          {type: 0, text: '2', x: 1, y: 3},
          {type: 1, x: 1, y: 1},
          {type: 0, text: '3', x: 5, y: 3},
          {type: 0, text: '4', x: 3, y: 5},
          {type: 0, text: '5', x: 1, y: 7},
          {type: 0, text: '6', x: 3, y: 7},
          {type: 0, text: '7', x: 5, y: 9},
          {type: 0, text: '8', x: 1, y: 11}
        ],
        connections: [
          {start: {x: 3, y: 1}, end: {x: 1, y: 1}}
        ]
      }
    },
    computed: {
      gutterCount () {
        const gutterCount = this.workflowData.reduce((max, data) => {
          if (data.x > max.columns) {
            max.columns = data.x
          }
          if (data.y > max.rows) {
            max.rows = data.y
          }
          return max
        }, {columns: 0, rows: 0})

        gutterCount.rows += 2
        gutterCount.columns += 2

        return gutterCount
      },
      gutterData () {
        const gutterData = []
        let i
        const columns = []
        for (i = 0; i < this.gutterCount.columns; i++) {
          columns.push(null)
        }
        for (i = 0; i < this.gutterCount.rows; i++) {
          gutterData.push([...columns])
        }

        this.workflowData.forEach(data => {
          gutterData[data.y][data.x] = data
        })

        return gutterData
      }
    }
  }
</script>

<style lang="sass" scoped>

  .column-gutter
    width: 80px
    height: 80px

  .main-column
    background-color: rgba(0, 0, 0, 0.3)

  .start-point
    background-color: var(--v-info-base)
    width: 80px
    height: 80px
    border-radius: 10px
    padding: 16px
</style>
