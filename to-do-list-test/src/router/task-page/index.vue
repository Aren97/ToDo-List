<template>
  <div class="task-page">
    id {{$route.params.id}}
  </div>
</template>

<script>
export default {
  name: 'task-page',
  data () {
    return {

    }
  },
  computed: {
    task () {
      return this.$store.getters.tasks
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
