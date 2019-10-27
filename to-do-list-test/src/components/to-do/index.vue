<template>
  <div class="to-do container">
    <div class="to-do__title mb-20">
      Задачи
    </div>
    <to-do-add />
    <to-do-list />
  </div>
</template>

<script>
import ToDoAdd from './to-do-add'
import ToDoList from './to-do-list'
export default {
  name: 'to-do',
  components: {
    ToDoAdd,
    ToDoList
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
