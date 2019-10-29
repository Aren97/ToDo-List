<template>
  <form class="to-do-add mb-20" @submit.prevent="addTask">
    <textarea
      placeholder="Enter a title for this card..."
      name="to-do-add"
      class="to-do-add__textarea"
      v-model="todoTitle"
      @keypress.enter.prevent="addTask"
    ></textarea>
    <div class="to-do-add-actions">
      <button
        type="submit"
        :class="['to-do-add__submit', { 'to-do-add__submit--disabled': !this.todoTitle }]"
        :disabled="!this.todoTitle"
      >
        <span v-if="buttonLoader" class="to-do-add__submit--loader"><font-awesome-icon :icon="['fas', 'spinner']" /></span>
        <span v-else>Add Task</span>
      </button>
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
      return (this.$store.getters.tasksObj && this.$store.getters.tasksObj[this.tasksKeys[0]] && this.$store.getters.tasksObj[this.tasksKeys[0]].intId) || 0
    },
    buttonLoader () {
      return this.$store.getters.buttonLoader
    },
    tasksKeys () {
      return this.$store.getters.tasksKeys
    }
  },
  methods: {
    async addTask () {
      if (!this.todoTitle.replace(/\s/g, '')) {
        this.clearTextArea()
        return false
      }
      const addResult = await this.$store.dispatch('addTask', { title: this.todoTitle, intId: parseInt(this.maxTaskId) + 1 })
      if (addResult.key) {
        this.clearTextArea()
        if (this.$route.params.page > 1) {
          this.$router.push('/')
        }
      }
    },
    clearTextArea () {
      this.todoTitle = ''
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
