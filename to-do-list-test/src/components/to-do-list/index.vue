<template>
  <div class="to-do-list-wrap">
    <div class="to-do-list-page-error" v-if="!isPage">
      <div v-if="dataIsLoading" class="to-do-list--loading">
        <div class="to-do-list--spinner">
          <font-awesome-icon :icon="['fas', 'spinner']" size="lg" />
        </div>
      </div>
      <div v-else>
        Такой страницы не существует
      </div>
    </div>
    <div v-else class="to-do-list-page-succes">
      <div v-if="dataIsLoading" class="to-do-list--loading">
        <div class="to-do-list--spinner">
          <font-awesome-icon :icon="['fas', 'spinner']" size="lg" />
        </div>
      </div>
      <div v-else class="to-do-list-inner">
        <ul class="to-do-list">
          <to-do-item
            v-for="(id, index) in paginatedData"
            :key="id"
            :title="tasksObj[id].title"
            :index="index"
            :id="id"
            :page-number="pageNumber"
            :checked="tasksObj[id].checked"
          />
        </ul>
        <pagination
          :page-count="pageCount"
          :page-number="pageNumber"
          @next-page="nextPage"
          @prev-page="prevPage"
          @to-page="toPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ToDoItem from './to-do-item'
import Pagination from '@/components/pagination'

export default {
  name: 'to-do-list',
  components: {
    ToDoItem,
    Pagination
  },
  props: ['page'],
  data () {
    return {
      pageNumber: parseInt(this.page) || 1,
      size: 10
    }
  },
  watch: {
    page (val) {
      this.pageNumber = parseInt(val)
    }
  },
  computed: {
    tasksObj () {
      return this.$store.getters.tasksObj
    },
    tasksKeys () {
      return this.$store.getters.tasksKeys
    },
    dataIsLoading () {
      return this.$store.getters.dataIsLoading
    },
    paginatedData () {
      const start = (this.pageNumber - 1) * this.size
      const end = start + this.size

      return this.tasksKeys.slice(start, end)
    },
    pageCount () {
      let l = this.tasksKeys.length
      let s = this.size

      return Math.ceil(l / s)
    },
    isPage () {
      if (this.page && this.pageCount > 0) {
        return this.page <= this.pageCount
      }
      return true
    }
  },
  methods: {
    nextPage () {
      this.toPage(this.pageNumber + 1)
    },
    prevPage () {
      this.toPage(this.pageNumber - 1)
    },
    toPage (page) {
      this.$router.push('/' + page)
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
