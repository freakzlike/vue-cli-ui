<template>
  <jst-row column class="filler-point">
    <v-spacer/>
    <div>
      <jst-row>
        <v-spacer/>
        <v-icon class="icon-hover">add</v-icon>
        <v-spacer/>
      </jst-row>
    </div>
    <v-spacer/>
  </jst-row>
</template>

<script>
  export default {
    name: 'FillerPoint'
  }
</script>

<style scoped lang="sass">
  .filler-point
    &::v-deep .icon-hover
      opacity: 0.1

    &:hover::v-deep  .icon-hover
      opacity: 1
</style>
