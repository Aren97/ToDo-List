<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted () {
    this.$store.dispatch('getTasks')
  }
}
</script>
<style src="./assets/scss/main.scss" lang="scss"></style>
