<template>
  <ul class="to-do-list">
    <to-do-item
      v-for="(task, index) in tasks"
      :key="task.id"
      :title="task.title"
      :index="index"
      :id="task.id"
      :checked="task.checked"
    />
  </ul>
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
    }
  }
}
</script>
