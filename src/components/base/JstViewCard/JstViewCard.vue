<template>
  <v-card outlined :loading="loading" class="jst-view-card">
    <jst-row v-if="toolbar" class="jst-view-card__toolbar border--bottom">
      <slot name="toolbar-prefix"/>
      <v-col class="jst-view-card__toolbar__title">
        <slot name="title">
          <div v-if="titleText === undefined" class="jst-view-card__toolbar__loading"/>
          <template v-else>
            {{ titleText }}
          </template>
        </slot>
      </v-col>
      <slot name="toolbar-suffix"/>
    </jst-row>

    <v-card-title v-else :class="cardTitleClasses">
      <slot name="title">
        <div v-if="titleText === undefined" class="jst-view-card__title__loading"/>
        <template v-else>
          {{ titleText }}
        </template>
      </slot>
    </v-card-title>

    <v-card-text v-if="noContainer" :class="{'pt-0': !this.toolbar, 'pa-0': noContentPadding}">
      <slot/>
    </v-card-text>
    <v-card-text v-else class="pa-0">
      <v-container fluid :class="containerClasses">
        <slot/>
      </v-container>
    </v-card-text>

    <v-card-actions v-if="hasActionsSlot" :class="{'border--top': this.toolbar}">
      <slot name="actions"/>
    </v-card-actions>
  </v-card>
</template>

<script>
  import cu from '@/utils/common'

  export default {
    name: 'jst-view-card',
    props: {
      title: {
        type: [String, Number, Function],
        default: null
      },
      toolbar: {
        type: Boolean,
        default: false
      },
      noContentPadding: {
        type: Boolean,
        default: false
      },
      contentGutter: {
        type: Boolean,
        default: false
      },
      noContainer: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      cardTitleClasses () {
        if (this.contentGutter) {
          return ['px-2', 'pt-2', 'pb-1']
        }

        return 'pa-2'
      },
      containerClasses () {
        if (this.noContentPadding) {
          return 'pa-0'
        }
        if (this.contentGutter) {
          return {
            'px-2': true,
            'pb-1': true,
            'pt-0': !this.toolbar,
            'pt-1': this.toolbar
          }
        }

        return {
          'pa-2': true,
          'pt-0': !this.toolbar
        }
      },
      hasActionsSlot () {
        return !!this.$scopedSlots.actions
      }
    },
    asyncComputed: {
      titleText: {
        default: undefined,
        get () {
          return cu.eval(this.title)
        }
      }
    }
  }
</script>

<style lang="sass">
  @import 'src/styles/include'

  .jst-view-card
    & > .v-toolbar > .v-toolbar__content
      padding-left: 8px
      padding-right: 8px

    &__toolbar
      padding-left: 8px
      padding-right: 8px
      height: 48px
      align-items: center
      display: flex
      position: relative

      &__title
        font-size: 1.25rem
        line-height: 1.5
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap

      &__loading
        height: 26px

    &__title
      &__loading
        flex: 1 1 auto
        height: 21px

  +theme-child('.jst-view-card') using($material)
    &__toolbar__loading
      background-color: map-get($material, 'loading-div')

    &__title__loading
      background-color: map-get($material, 'loading-div')
</style>
