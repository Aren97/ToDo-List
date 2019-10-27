<template>
  <form class="to-do-add mb-20" @submit.prevent="addTask" @keyup.stop.enter="addTask">
    <textarea
      placeholder="Enter a title for this card..."
      name="to-do-add"
      class="to-do-add__textarea"
      v-model="todoTitle"
    ></textarea>
    <div class="to-do-add-actions">
      <button class="to-do-add__submit" type="submit">Add Task</button>
      <div class="to-do-add__cancel" @click="clearTextArea">
        <font-awesome-icon :icon="['fas', 'times']" size="lg" />
      </div>
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
    maxTaskId () {
      return this.$store.getters.tasks[0].intId
    }
  },
  methods: {
    async addTask () {
      const addResult = await this.$store.dispatch('addTask', { title: this.todoTitle, intId: parseInt(this.maxTaskId) + 1 })
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
