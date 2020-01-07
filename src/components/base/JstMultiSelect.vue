<template>
  <v-autocomplete ref="autocomplete"
                  :value="inputValue"
                  :label="label"
                  :hint="hint"
                  multiple
                  :items="selectItems"
                  :menu-props="{'offset-y': true}"
                  persistent-hint
                  :no-data-text="$t('no_data_found')"
                  :search-input.sync="searchInput"
                  @input="onInput">
    <template v-if="!searchInput" v-slot:prepend-item>
      <v-list-item link class="border--bottom" @click="toggleSelectAll">
        <v-list-item-action>
          <v-simple-checkbox :value="hasAllSelected"
                             :indeterminate="!hasAllSelected && hasAnySelected"
                             @input="toggleSelectAll"/>
        </v-list-item-action>
        <v-list-item-content>
          {{ $t('select_all') }}
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-slot:selection="{ item, index }">
      <jst-tooltip v-if="shouldDisplayChip(index)"
                   :text="getItemText(item)">
        <template v-slot:default="{on}">
          <v-chip close
                  small
                  class="multi-select-chip"
                  v-on="on"
                  @click:close="closeChip(index)">
            <span class="multi-select-chip__text">{{ getItemText(item) }}</span>
          </v-chip>
        </template>
      </jst-tooltip>

      <small v-else-if="index === maxAmountChips" class="multi-select-chip__more" v-on="on">
        (+{{ $t('count_more', {count: amountMore}) }})
      </small>
    </template>
  </v-autocomplete>
</template>

<script>
  import ResizeObserver from 'resize-observer-polyfill'

  export default {
    name: 'jst-multi-select',
    props: {
      value: {
        type: Array,
        default: null
      },
      label: {
        type: String,
        default: null
      },
      hint: {
        type: String,
        default: null
      },
      items: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        searchInput: null,
        maxAmountChips: null
      }
    },
    computed: {
      inputValue () {
        return this.value || []
      },
      selectItems () {
        return this.items || []
      },
      hasAllSelected () {
        return this.inputValue.length === this.selectItems.length
      },
      hasAnySelected () {
        return this.inputValue.length > 0
      },
      amountMore () {
        if (this.maxAmountChips === null) return null

        if (this.maxAmountChips <= 1 && this.inputValue.length > 1) {
          return this.inputValue.length
        } else {
          return this.inputValue.length - (this.maxAmountChips - 1)
        }
      }
    },
    mounted () {
      this.watchInputResize()
    },
    methods: {
      changeValue (value) {
        this.$emit('input', value)
      },
      shouldDisplayChip (index) {
        if (this.maxAmountChips === null) {
          this.calculateAmountChips()
        }
        if (this.maxAmountChips === null) {
          console.warn('No value for maxAmountChips')
          return true
        }

        return this.inputValue.length <= this.maxAmountChips || (index < this.maxAmountChips - 1)
      },
      toggleSelectAll () {
        if (this.hasAllSelected) {
          this.changeValue([])
        } else {
          this.changeValue(this.selectItems.map(item => this.getItemValue(item)))
        }
      },
      onInput (value) {
        if (value) {
          // Sort inputValue entries according to selectItems
          this.changeValue(value.sort((a, b) => {
            const aIdx = this.selectItems.findIndex(item => this.getItemValue(item) === a)
            const bIdx = this.selectItems.findIndex(item => this.getItemValue(item) === b)
            if (aIdx > bIdx) return 1
            if (aIdx < bIdx) return -1
            return 0
          }))
        } else {
          this.changeValue([])
        }
      },
      getItemValue (item) {
        return item.value
      },
      getItemText (item) {
        return item.text
      },
      closeChip (index) {
        const newList = [...this.inputValue]
        newList.splice(index, 1)
        this.changeValue(newList)
      },
      calculateAmountChips () {
        if (this.$refs.autocomplete) {
          const el = this.$refs.autocomplete.$el.querySelector('.v-select__selections')
          const autocompleteBuffer = 20
          this.maxAmountChips = Math.floor((el.offsetWidth - autocompleteBuffer) / 120) || 1
        }
      },
      watchInputResize () {
        const ro = new ResizeObserver((entries, observer) => {
          this.calculateAmountChips()
        })

        ro.observe(this.$refs.autocomplete.$el.querySelector('.v-select__selections'))
      }
    }
  }
</script>

<style scoped lang="sass">
  .multi-select-chip
    max-width: 120px

    &__text
      max-width: 74px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap

    &__more
      max-width: 100px
      padding-right: 4px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
</style>
