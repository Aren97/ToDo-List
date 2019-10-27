<template>
  <form class="to-do-add mb-20" @submit.prevent="addTask" @keyup.enter="addTask">
    <textarea
      placeholder="Enter a title for this card..."
      name="to-do-add"
      class="to-do-add__textarea"
      v-model="todoTitle"
    ></textarea>
    <div class="to-do-add-actions">
      <button class="to-do-add__submit" type="submit">Add Task</button>
      <div class="to-do-add__cancel" @click="clearTextArea">X</div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'to-do-add',
  data () {
    return {
      todoTitle: ''
    }
  },
  computed: {
    tasksLength () {
      return this.$store.getters.tasks.length
    }
  },
  methods: {
    async addTask () {
      const addResult = await this.$store.dispatch('addTask', { title: this.todoTitle, intId: parseInt(this.tasksLength) + 1 })
      if (addResult.key) {
        this.clearTextArea()
      }
    },
    clearTextArea () {
      this.todoTitle = ''
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
