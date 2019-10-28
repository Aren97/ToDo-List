<template>
  <div class="to-do-list-wrap">
    <div v-if="dataIsLoading" class="to-do-list--loading">
      <div class="to-do-list--spinner">
        <font-awesome-icon :icon="['fas', 'spinner']" size="lg" />
      </div>
    </div>
    <ul v-else class="to-do-list">
      <to-do-item
        v-for="(task, index) in tasks"
        :key="task.id"
        :title="task.title"
        :index="index"
        :id="task.id"
        :checked="task.checked"
      />
    </ul>
  </div>
</template>

<script>
import ToDoItem from './to-do-item'
import { sortByInt } from '@/helpers/sort'
export default {
  name: 'to-do-list',
  components: {
    ToDoItem
  },
  computed: {
    tasks () {
      return sortByInt(this.$store.getters.tasks, 'intId')
    },
    dataIsLoading () {
      return this.$store.getters.dataIsLoading
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
