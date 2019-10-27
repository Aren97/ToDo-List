<template>
    <li :class="['to-do-item mb-20', { 'to-do-item--checked': checked }]">
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

      <div class="to-do-item__actions" v-if="!checked">
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
    id: String,
    checked: Boolean
  },
  data () {
    return {
      taskEditing: false,
      editingTitle: this.title
    }
  },
  methods: {
    removeItem () {
      this.$store.dispatch('removeTask', { index: this.index, id: this.id })
    },
    async checkItem () {
      if (this.taskEditing) {
        this.changeItemTitle()
      } else {
        await this.$store.dispatch('checkTask', { id: this.id, index: this.index })
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
        await this.$store.dispatch('changeTask', { id: this.id, title: this.editingTitle })
      }
      this.editItem()
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
