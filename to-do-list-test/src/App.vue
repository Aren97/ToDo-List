<template>
  <div id="app">
    <to-do />
  </div>
</template>
<script>
import ToDo from '@/components/to-do'
export default {
  components: {
    ToDo
  },
  mounted () {
    this.$store.dispatch('getTasks')
  }
}
</script>
<style src="./assets/scss/main.scss" lang="scss"></style>
