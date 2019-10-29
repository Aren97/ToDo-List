<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
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
