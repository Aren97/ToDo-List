<template>
    <li class="to-do-item mb-20">
      <div class="to-do-item__text">
        <input
          v-if="taskEditing"
          v-model="editingTitle"
          type="text"
          name="editing-text"
        >
        <div
          v-else
          class="to-do-item__title"
        >{{index+1}}) {{title}}</div>
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
    index: Number
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

    },
    editItem () {

    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
