<template>
    <li class="to-do-item mb-20">
      <div class="to-do-item__title">{{index+1}}) {{title}}</div>
      <div class="to-do-item__actions">
        <div class="to-do-item__edit"></div>
        <div class="to-do-item__remove" @click="removeItem">X</div>
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
  methods: {
    removeItem () {
      this.$emit('remove')
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
