<template>
  <div class="connection-point"
       :class="{'connection-point--no-connection': this.connection === null}">
    <template v-if="arrowPoints">
      <svg xmlns="http://www.w3.org/2000/svg"
           version="1.1" baseProfile="full"
           width="20" height="20"
           viewBox="0 0 20 20">
        <polygon :points="arrowPoints"/>
      </svg>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'ConnectionPoint',
    props: {
      connection: {
        type: String,
        default: null
      },
      top: {
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
      },
      right: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      arrowPoints () {
        if (this.connection === 'end') {
          if (this.left) {
            return '5,0 5,20 20,10'
          } else if (this.right) {
            return '15,0 15,20 0,10'
          } else if (this.top) {
            return '0,5 20,5 10,20'
          } else if (this.bottom) {
            return '0,15 20,15 10,0'
          }
        } else if (this.connection === null) {
          if (this.left) {
            return '15,0 15,20 0,10'
          } else if (this.right) {
            return '5,0 5,20 20,10'
          } else if (this.top) {
            return '0,15 20,15 10,0'
          } else if (this.bottom) {
            return '0,5 20,5 10,20'
          }
        }
        return null
      }
    }
  }
</script>

<style scoped lang="sass">
  .connection-point
    & > svg
      fill: var(--v-primary-darken2)

    &:hover
      background-color: grey

    &--no-connection
      opacity: 0

      &:hover
        opacity: 1
</style>
