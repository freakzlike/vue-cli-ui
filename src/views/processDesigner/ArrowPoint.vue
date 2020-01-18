<template>
  <div class="arrow-point"
       :class="{'arrow-point--left': left,
                'arrow-point--right': right,
                'arrow-point--top': top,
                'arrow-point--bottom': bottom}">
    <svg xmlns="http://www.w3.org/2000/svg"
         version="1.1" baseProfile="full"
         width="20" height="20"
         viewBox="0 0 20 20">
      <polygon points="5,0 5,20 20,10"/>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'ArrowPoint',
    props: {
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
    }
  }
</script>

<style scoped lang="sass">
  .arrow-point
    & > svg
      fill: var(--v-primary-darken2)

    &--left
      & > svg
        transform: rotateZ(0deg)

    &--right
      & > svg
        transform: rotateZ(180deg)

    &--top
      & > svg
        transform: rotateZ(90deg)

    &--bottom
      & > svg
        transform: rotateZ(-90deg)
</style>
