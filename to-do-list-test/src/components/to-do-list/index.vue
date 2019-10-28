<template>
  <div class="to-do-list-wrap">
    <div v-if="dataIsLoading" class="to-do-list--loading">
      <div class="to-do-list--spinner">
        <font-awesome-icon :icon="['fas', 'spinner']" size="lg" />
      </div>
    </div>
    <ul v-else class="to-do-list">
      <to-do-item
        v-for="(id, index) in tasksKeys"
        :key="id"
        :title="tasksObj[id].title"
        :index="index"
        :id="id"
        :checked="tasksObj[id].checked"
      />
    </ul>
  </div>
</template>

<script>
import ToDoItem from './to-do-item'
export default {
  name: 'to-do-list',
  components: {
    ToDoItem
  },
  computed: {
    tasksObj () {
      return this.$store.getters.tasksObj
    },
    tasksKeys () {
      return this.$store.getters.tasksKeys
    },
    dataIsLoading () {
      return this.$store.getters.dataIsLoading
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
