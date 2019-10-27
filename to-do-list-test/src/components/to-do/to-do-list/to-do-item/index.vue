<template>
    <li class="to-do-item mb-20">
      <div class="to-do-item__text">
        {{index+1}})
        <input
          v-show="taskEditing"
          v-model="editingTitle"
          ref="chengingInput"
          type="text"
          name="editing-text"
          @keyup.enter="changeItemTitle"
        >
        <div
          v-if="!taskEditing"
          class="to-do-item__title"
        >{{editingTitle}}</div>
      </div>

      <div class="to-do-item__actions">
        <div
          v-if="!taskEditing"
          class="to-do-item__icon to-do-item__edit"
          @click="editItem"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
        </div>
        <div class="to-do-item__icon to-do-item__remove" @click="removeItem">
          <font-awesome-icon :icon="['fas', 'times']" />
        </div>
        <div class="to-do-item__icon to-do-item__check" @click="checkItem">
          <font-awesome-icon :icon="['fas', 'check']" />
        </div>
      </div>
    </li>
</template>

<script>
export default {
  name: 'to-do-item',
  props: {
    title: String,
    index: Number,
    id: String
  },
  data () {
    return {
      taskEditing: false,
      editingTitle: this.title
    }
  },
  methods: {
    removeItem () {
      this.$emit('remove')
    },
    checkItem () {
      if (this.taskEditing) {
        this.changeItemTitle()
      } else {

      }
    },
    editItem () {
      this.taskEditing = !this.taskEditing
      if (this.taskEditing) {
        setTimeout(() => {
          this.$refs.chengingInput.focus()
        }, 0)
      }
    },
    async changeItemTitle () {
      if (this.editingTitle !== this.title) {
        await this.$store.dispatch('changeTaskItem', { id: this.id, title: this.editingTitle })
      }
      this.editItem()
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
