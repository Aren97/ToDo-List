<template>
  <div class="to-do">
    <div class="to-do__title mb-20">
      Задачи
    </div>
    <to-do-add />
    <router-view />
  </div>
</template>

<script>
import ToDoAdd from '@/components/to-do-add'
export default {
  name: 'to-do',
  components: {
    ToDoAdd
  },
  props: ['page']
}
</script>

<style src="./style.scss" lang="scss"></style>
