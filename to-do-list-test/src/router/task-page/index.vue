<template>
  <div class="task-page">
    <div class="task-page-to-previous" @click="$router.go(-1)">
      Вернуться назад
    </div>
    <div class="task-page-info">
      <div class="task-page-text">
        Заголовок -
        <input
          class="task-page__input"
          v-show="taskEditing"
          v-model="editingTitle"
          ref="chengingInput"
          type="text"
          name="editing-text"
          @keyup.enter="changeItemTitle"
        >
        <div v-if="!taskEditing" class="task-page__title">{{title}}</div>
      </div>
      <div class="task-page-actions">
        <div
          v-if="!taskEditing"
          class="task-page__icon task-page__edit"
          @click="editItem"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
        </div>
        <div
          v-if="this.taskEditing"
          class="task-page__icon task-page__check"
          @click="checkItem"
        >
          <font-awesome-icon :icon="['fas', 'check']" />
        </div>
        <div
          v-if="this.taskEditing"
          class="task-page__icon task-page__remove"
          @click="cancelItem"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-page',
  props: ['id'],
  data () {
    return {
      taskEditing: false,
      editingTitle: this.title || ''
    }
  },
  computed: {
    tasksObj () {
      return this.$store.getters.tasksObj
    },
    title () {
      return this.tasksObj[this.id] && this.tasksObj[this.id].title
    }
  },
  methods: {
    // Меняет заголовок задачи
    async changeItemTitle () {
      if (this.editingTitle !== this.title || !this.editingTitle) {
        await this.$store.dispatch('changeTask', { id: this.id, title: this.editingTitle })
      }
      this.taskEditing = false
    },
    editItem () {
      this.editingTitle = this.title

      // Меняет режим редактирования задачи и наоборот
      this.taskEditing = !this.taskEditing
      if (this.taskEditing) {
        // Ставит фокус на инпут, если задача в режиме редактирования
        setTimeout(() => {
          this.$refs.chengingInput.focus()
        }, 0)
      }
    },
    // Применяет изменения заголовка задачи
    checkItem () {
      this.changeItemTitle()
    },
    // Отменяет редактирование задачи
    cancelItem () {
      this.editItem()
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
