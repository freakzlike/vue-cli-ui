<template>
  <div class="process-point">
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
</template>

<script>
  export default {
    name: 'ProcessPoint',
    props: {
      text: {
        type: [String, Number],
        default: null
      }
    }
  }
</script>

<style lang="sass" scoped>
  .process-point
    background-color: var(--v-primary-base)
    width: 80px
    height: 80px
    border-radius: 50%
    padding: 16px
</style>
