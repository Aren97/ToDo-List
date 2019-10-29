<template>
  <div v-if="pageCount > 1" class="to-do-list-pagination">
    <button
      v-if="pageNumber !== 1"
      class="to-do-list__pag-link to-do-list__pag-link--first"
      @click="prevPage"
    >Prev</button>
    <button
      v-for="pageInt in pageCount"
      :class="['to-do-list__pag-link', { 'active': pageNumber === pageInt }]"
      :key="pageInt"
      @click="toPage(pageInt)"
    >{{pageInt}}</button>
    <button
      v-if="pageNumber < pageCount"
      class="to-do-list__pag-link to-do-list__pag-link--last"
      @click="nextPage"
    >Next</button>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pageNumber: Number,
    pageCount: Number
  },
  methods: {
    prevPage () {
      this.$emit('prev-page')
    },
    nextPage () {
      this.$emit('next-page')
    },
    toPage (page) {
      this.$emit('to-page', page)
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
