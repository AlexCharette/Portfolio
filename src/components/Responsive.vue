<template>
  <div
    v-responsive="{
      tiny: el => el.width < 400,
      small: el => el.width < 800
    }"
    class="responsive-component"
  />
</template>

<script>
import { ResponsiveDirective } from 'vue-responsive-components'
export default {
  name: 'Responsive',
  directives: {
    responsive: ResponsiveDirective
  }
}
</script>

<style lang="scss" scoped>
    .responsive-component {
        height: 200px;
        background: red;
        &.small {
            background: green;
        }
        &.tiny {
            background: blue;
        }
    }
</style>
