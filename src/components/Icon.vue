<template>
  <svg class="icon myIconStyle" aria-hidden="true">
  　　<use :xlink:href="'#al-icon' + type"></use>
  </svg>
</template>

<script>
export default {
  name: 'ch-icon',
  props: ['type'],
  data () {
    return {}
  }
}
</script>

<style scoped>
  .myIconStyle{
    width: 60px;
    height: 60px;
    vertical-align: middle;
  }
</style>
